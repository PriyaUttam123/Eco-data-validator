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
    """
    def post(self, request, *args, **kwargs):
        ingestion_type = request.query_params.get('type')
        tenant_id = request.query_params.get('tenant_id')
        
        if not ingestion_type or not tenant_id:
            return response.Response(
                {'error': 'Missing type or tenant_id query parameters'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        try:
            tenant = Tenant.objects.get(id=tenant_id)
        except Tenant.DoesNotExist:
            return response.Response({'error': 'Tenant not found'}, status=status.HTTP_404_NOT_FOUND)

        # Create Ingestion Job
        job = DataIngestionJob.objects.create(
            tenant=tenant,
            status='PROCESSING',
            source_type=ingestion_type
        )

        try:
            # Get data from file or body
            if 'file' in request.FILES:
                file_content = request.FILES['file'].read()
            else:
                file_content = request.body

            records_data = []
            if ingestion_type == 'sap':
                records_data = parse_sap_csv(file_content, tenant, job)
            elif ingestion_type == 'utility':
                records_data = parse_utility_csv(file_content, tenant, job)
            elif ingestion_type == 'travel':
                records_data = parse_travel_json(file_content, tenant, job)
            else:
                return response.Response({'error': 'Invalid ingestion type'}, status=status.HTTP_400_BAD_REQUEST)

            # Bulk create staging records
            StagingActivityData.objects.bulk_create([
                StagingActivityData(**data) for data in records_data
            ])

            job.status = 'COMPLETED'
            job.save()

            return response.Response({
                'message': f'Successfully ingested {len(records_data)} records',
                'job_id': job.id
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            job.status = 'FAILED'
            job.save()
            return response.Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class StagingRecordViewSet(viewsets.ModelViewSet):
    """
    GET /api/records/
    PATCH /api/records/<id>/review/
    """
    queryset = StagingActivityData.objects.all().order_by('-created_at')
    serializer_class = StagingActivityDataSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        status_filter = self.request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        return queryset

    @action(detail=True, methods=['patch'], url_path='review')
    def review(self, request, pk=None):
        record = self.get_object()
        new_status = request.data.get('status')
        
        if new_status not in ['APPROVED', 'REJECTED']:
            return response.Response(
                {'error': 'Invalid status. Must be APPROVED or REJECTED'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        if record.is_locked:
            return response.Response(
                {'error': 'Record is locked and cannot be reviewed again'}, 
                status=status.HTTP_403_FORBIDDEN
            )

        record.status = new_status
        if new_status == 'APPROVED':
            record.is_locked = True
        elif new_status == 'REJECTED':
            record.is_locked = True
            
        record.save()
        return response.Response(self.get_serializer(record).data)
