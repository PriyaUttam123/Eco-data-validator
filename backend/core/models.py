from django.db import models
from django.contrib.auth.models import User

class Tenant(models.Model):
    name = models.CharField(max_length=255)
    domain = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class DataIngestionJob(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('PROCESSING', 'Processing'),
        ('COMPLETED', 'Completed'),
        ('FAILED', 'Failed'),
    ]
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='ingestion_jobs')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    source_type = models.CharField(max_length=50) # e.g., 'CSV', 'API'
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class StagingActivityData(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='staging_data')
    job = models.ForeignKey(DataIngestionJob, on_delete=models.CASCADE, related_name='staging_records')
    raw_payload = models.JSONField()
    is_validated = models.BooleanField(default=False)
    validation_errors = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
