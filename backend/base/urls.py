# URL configuration for the base app.
# This file maps URL paths to their corresponding view functions in the base
# app.

from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

# Define URL patterns for the base app
urlpatterns = [
    path('users/login/', TokenObtainPairView.as_view(),
         name='token_obtain_pair'),

    # Route for retrieving available API routes
    path('', views.getRoutes, name='routes'),

    # Route for retrieving a user profile
    path('users/profile/', views.getUserProfile, name='user-profile'),

    # Route for retrieving all user profile for admin
    path('users/', views.getUsers, name='users'),

    # Route for retrieving all products
    path('products/', views.getProducts, name='products'),

    # Route for retrieving a single product by its primary key
    path('products/<str:pk>', views.getProduct, name='product'),

]
