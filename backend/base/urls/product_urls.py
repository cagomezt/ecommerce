# URL configuration for the base app.
# This file maps URL paths to their corresponding view functions in the base
# app.

from django.urls import path, include
from base.views import product_views as views


# Define URL patterns for the base app
urlpatterns = [
    # Route for retrieving all products
    path('', views.getProducts, name='products'),

    # Route for retrieving a single product by its primary key
    path('<str:pk>/', views.getProduct, name='product'),

]
