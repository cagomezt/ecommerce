from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.models import Product
from base.serializers import (ProductSerializer, UserSerializer,
                           UserSerializerWithToken)

from django.contrib.auth.hashers import make_password
from rest_framework import status


@api_view(['POST'])
def registerUser(request):
    data = request.data

    try:
        user = User.objects.create_user(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    """
    API view to retrieve a user.

    Args:
        request (HttpRequest): The HTTP request object.

    Returns:
        Response: Serialized data of all products.
    """
    user = request.user  # Get the authenticated user
    serializer = UserSerializer(user, many=False)  # Serialize the user data
    return Response(serializer.data)  # Return the serialized data as a response

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()  # Query all users from the database
    serializer = UserSerializer(users, many=True)  # Serialize the users data
    return Response(serializer.data)  # Return the serialized data as a response