"""
URL configuration for the backend project.

This file defines the URL patterns for the Django project. It includes routes for the admin interface,
API endpoints, and static media files.

For more information, see:
https://docs.djangoproject.com/en/5.1/topics/http/urls/
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# Define the URL patterns for the project
urlpatterns = [
    path('admin/', admin.site.urls),  # Route for the Django admin interface
    path('api/', include('base.urls')),  # Includes URL patterns from the 'base' app
]

# Serve media files during development
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)