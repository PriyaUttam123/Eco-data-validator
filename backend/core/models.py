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
    STATUS_CHOICES = [
        ('UNREVIEWED', 'Unreviewed'),
        ('SUSPICIOUS', 'Suspicious'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    ]
    CATEGORY_CHOICES = [
        ('SCOPE_1', 'Scope 1'),
        ('SCOPE_2', 'Scope 2'),
        ('SCOPE_3', 'Scope 3'),
    ]
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='staging_data')
    job = models.ForeignKey(DataIngestionJob, on_delete=models.CASCADE, related_name='staging_records')
    raw_payload = models.JSONField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='UNREVIEWED')
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES, blank=True)
    raw_quantity = models.DecimalField(max_digits=20, decimal_places=4, null=True, blank=True)
    normalized_quantity = models.DecimalField(max_digits=20, decimal_places=4, null=True, blank=True)
    unit = models.CharField(max_length=20, blank=True)
    anomaly_reason = models.TextField(null=True, blank=True)
    is_locked = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
