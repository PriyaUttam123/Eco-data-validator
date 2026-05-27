from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import IngestView, StagingRecordViewSet

router = DefaultRouter()
router.register(r'records', StagingRecordViewSet, basename='staging-records')

urlpatterns = [
    path('', include(router.urls)),
    path('ingest/', IngestView.as_view(), name='ingest'),
]
