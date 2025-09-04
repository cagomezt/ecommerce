# URL configuration for the base app.
# This file maps URL paths to their corresponding view functions in the base
# app.

from django.urls import path, include
from base.views import user_views as views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

# Define URL patterns for the base app
urlpatterns = [
    path('login/', TokenObtainPairView.as_view(),
         name='token_obtain_pair'),

    # Route for user registration
    path('register/', views.registerUser, name='register'),

    # Route for retrieving a user profile
    path('profile/', views.getUserProfile, name='user-profile'),

    # Route for retrieving all user profile for admin
    path('', views.getUsers, name='users'),
]
