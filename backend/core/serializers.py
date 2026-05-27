from rest_framework import serializers
from .models import Tenant, DataIngestionJob, StagingActivityData

class StagingActivityDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = StagingActivityData
        fields = '__all__'
        read_only_fields = ['tenant', 'job', 'raw_payload', 'created_at']

class DataIngestionJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataIngestionJob
        fields = '__all__'
