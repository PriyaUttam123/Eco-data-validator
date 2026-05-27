from rest_framework import viewsets, views, status, response
from rest_framework.decorators import action
from .models import Tenant, DataIngestionJob, StagingActivityData
from .serializers import StagingActivityDataSerializer, DataIngestionJobSerializer
from .parsers import parse_sap_csv, parse_utility_csv, parse_travel_json

class IngestView(views.APIView):
    """
    POST /api/ingest/
    Query Params: 
        type: 'sap', 'utility', 'travel'
        tenant_id: ID of the tenant
    
    Accepts: CSV File upload (key: 'file') OR raw JSON payload.
    """
    def post(self, request, *args, **kwargs):
        ingestion_type = request.query_params.get('type')
        tenant_id = request.query_params.get('tenant_id')
        
        if not ingestion_type or not tenant_id:
            return response.Response(
                {'error': 'Missing type (sap/utility/travel) or tenant_id query parameters'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        try:
            tenant = Tenant.objects.get(id=tenant_id)
        except Tenant.DoesNotExist:
            return response.Response({'error': f'Tenant with ID {tenant_id} not found'}, status=status.HTTP_404_NOT_FOUND)

        # Create Ingestion Job to track the process
        job = DataIngestionJob.objects.create(
            tenant=tenant,
            status='PROCESSING',
            source_type=ingestion_type
        )

        try:
            # Handle both File uploads and raw JSON body
            if 'file' in request.FILES:
                file_content = request.FILES['file'].read()
            else:
                file_content = request.body

            if not file_content:
                raise ValueError("No data provided in request body or file upload")

            records_data = []
            if ingestion_type == 'sap':
                records_data = parse_sap_csv(file_content, tenant, job)
            elif ingestion_type == 'utility':
                records_data = parse_utility_csv(file_content, tenant, job)
            elif ingestion_type == 'travel':
                records_data = parse_travel_json(file_content, tenant, job)
            else:
                raise ValueError(f"Unsupported ingestion type: {ingestion_type}")

            if not records_data:
                raise ValueError("No records were parsed from the provided input")

            # Bulk create for performance
            StagingActivityData.objects.bulk_create([
                StagingActivityData(**data) for data in records_data
            ])

            job.status = 'COMPLETED'
            job.save()

            return response.Response({
                'status': 'success',
                'message': f'Successfully ingested {len(records_data)} records',
                'job_id': job.id,
                'source': ingestion_type
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            job.status = 'FAILED'
            job.save()
            return response.Response({
                'status': 'error',
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

class StagingRecordViewSet(viewsets.ModelViewSet):
    """
    GET /api/records/ - Returns staging records, filterable by status.
    PATCH /api/records/<id>/review/ - Approval/Rejection endpoint.
    """
    queryset = StagingActivityData.objects.all().order_by('-created_at')
    serializer_class = StagingActivityDataSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        # Allow filtering by status specifically as requested: UNREVIEWED, SUSPICIOUS, APPROVED
        status_filter = self.request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter.upper())
        return queryset

    @action(detail=True, methods=['patch'], url_path='review')
    def review(self, request, pk=None):
        """
        Analyst action to APPROVE or REJECT a record.
        Approval sets is_locked=True.
        """
        record = self.get_object()
        new_status = request.data.get('status', '').upper()
        
        if new_status not in ['APPROVED', 'REJECTED']:
            return response.Response(
                {'error': 'Invalid status. Must be APPROVED or REJECTED'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        if record.is_locked:
            return response.Response(
                {'error': 'Record is locked (already approved) and cannot be modified.'}, 
                status=status.HTTP_403_FORBIDDEN
            )

        record.status = new_status
        # Strictly following: "sets is_locked=True upon approval"
        if new_status == 'APPROVED':
            record.is_locked = True
            
        record.save()
        return response.Response(self.get_serializer(record).data)
