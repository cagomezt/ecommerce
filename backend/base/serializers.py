from typing import Any

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Review, Order, OrderItem, ShippingAddress
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom serializer for obtaining JWT tokens.
    Extends the default TokenObtainPairSerializer to include additional user data.
    """

    def validate(self, attrs: dict[str, Any]) -> dict[str, str]:
        """
        Validates the token request and adds custom fields to the response.

        Args:
            attrs (dict): The input data for validation.

        Returns:
            dict: The validated data with additional fields (id, username, email).
        """
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.
    Serializes specific fields of the User model and includes custom fields.
    """
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj):
        """
        Retrieves the user's ID.

        Args:
            obj (User): The user instance.

        Returns:
            int: The user's ID.
        """
        return obj.id

    def get_isAdmin(self, obj):
        """
        Checks if the user is an admin.

        Args:
            obj (User): The user instance.

        Returns:
            bool: True if the user is an admin, False otherwise.
        """
        return obj.is_staff

    def get_name(self, obj):
        """
        Retrieves the user's full name. Falls back to the email if the name is empty.

        Args:
            obj (User): The user instance.

        Returns:
            str: The user's full name or email.
        """
        name = (obj.first_name + ' ' + obj.last_name).strip()

        if name == '':
            name = obj.email

        return name


class UserSerializerWithToken(UserSerializer):
    """
    Serializer for the User model that includes a JWT token.
    Inherits from UserSerializer and adds a token field.
    """
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        """
        Generates a JWT token for the user.

        Args:
            obj (User): The user instance.

        Returns:
            str: The JWT token as a string.
        """
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class ProductSerializer(serializers.ModelSerializer):
    """
    Serializer for the Product model.
    Serializes all fields of the Product model.
    """

    class Meta:
        model = Product
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    """
    Serializer for the Review model.
    Serializes all fields of the Review model.
    """

    class Meta:
        model = Review
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    """
    Serializer for the OrderItem model.
    Serializes all fields of the OrderItem model.
    """

    class Meta:
        model = OrderItem
        fields = '__all__'


class ShippingAddressSerializer(serializers.ModelSerializer):
    """
    Serializer for the ShippingAddress model.
    Serializes all fields of the ShippingAddress model.
    """

    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    """
    Serializer for the Order model.
    Includes custom fields for related data: items, shippingAddress, and user.
    """
    items = serializers.SerializerMethodField(
        read_only=True)  # Custom field for order items
    shippingAddress = serializers.SerializerMethodField(
        read_only=True)  # Custom field for shipping address
    user = serializers.SerializerMethodField(
        read_only=True)  # Custom field for user information

    class Meta:
        model = Order
        fields = '__all__'

    def get_items(self, obj):
        """
        Retrieves and serializes the items associated with the order.

        Args:
            obj (Order): The order instance.

        Returns:
            list: Serialized data for the order items.
        """
        items = obj.items.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        """
        Retrieves and serializes the shipping address associated with the order.

        Args:
            obj (Order): The order instance.

        Returns:
            dict or bool: Serialized data for the shipping address, or False
            if not available.
        """
        try:
            address = obj.shippingAddress
            serializer = ShippingAddressSerializer(address, many=False)
            return serializer.data
        except:
            return False

    def get_user(self, obj):
        """
        Retrieves and serializes the user associated with the order.

        Args:
            obj (Order): The order instance.

        Returns:
            dict: Serialized data for the user.
        """
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data