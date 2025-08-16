# URL configuration for the base app.
# This file maps URL paths to their corresponding view functions in the base app.

from django.urls import path, include
from . import views

# Define URL patterns for the base app
urlpatterns = [
    path('', views.getRoutes, name='routes'),  # Route for retrieving available API routes
    path('products/', views.getProducts, name='products'),  # Route for retrieving all products
    path('products/<str:pk>', views.getProduct, name='product'),  # Route for retrieving a single product by its primary key
]