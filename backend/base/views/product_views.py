from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from base.models import Product
from base.serializers import ProductSerializer


@api_view(['GET'])
def getProducts(request):
    """
    API view to retrieve all products.

    Args:
        request (HttpRequest): The HTTP request object.

    Returns:
        Response: Serialized data of all products.
    """
    products = Product.objects.all()  # Query all products from the database
    serializer = ProductSerializer(products,
                                   many=True)  # Serialize the product data
    return Response(serializer.data)  # Return the serialized data as a response


@api_view(['GET'])
def getProduct(request, pk):
    """
    API view to retrieve a specific product by its primary key.

    Args:
        request (HttpRequest): The HTTP request object.
        pk (str): The primary key of the product to retrieve.

    Returns:
        Response: Serialized data of the product if found.
        JsonResponse: Error message with status 404 if the product is not found.
    """
    product = Product.objects.get(pk=pk)  # Query the product by primary key
    serializer = ProductSerializer(product)  # Serialize the product data
    data = serializer.data  # Extract serialized data
    return Response(data) if data else JsonResponse(
        {'error': 'Product not found'},
        status=404)  # Return data or error response
