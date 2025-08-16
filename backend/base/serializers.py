from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Review, Order, OrderItem, ShippingAddress

# Serializer for the Product model
class ProductSerializer(serializers.ModelSerializer):
    """
    Serializer for the Product model.
    Serializes all fields of the Product model.
    """
    class Meta:
        model = Product
        fields = '__all__'

# Serializer for the Review model
class ReviewSerializer(serializers.ModelSerializer):
    """
    Serializer for the Review model.
    Serializes all fields of the Review model.
    """
    class Meta:
        model = Review
        fields = '__all__'

# Serializer for the OrderItem model
class OrderItemSerializer(serializers.ModelSerializer):
    """
    Serializer for the OrderItem model.
    Serializes all fields of the OrderItem model.
    """
    class Meta:
        model = OrderItem
        fields = '__all__'

# Serializer for the ShippingAddress model
class ShippingAddressSerializer(serializers.ModelSerializer):
    """
    Serializer for the ShippingAddress model.
    Serializes all fields of the ShippingAddress model.
    """
    class Meta:
        model = ShippingAddress
        fields = '__all__'

# Serializer for the Order model
class OrderSerializer(serializers.ModelSerializer):
    """
    Serializer for the Order model.
    Includes custom fields for related data: items, shippingAddress, and user.
    """
    items = serializers.SerializerMethodField(read_only=True)  # Custom field for order items
    shippingAddress = serializers.SerializerMethodField(read_only=True)  # Custom field for shipping address
    user = serializers.SerializerMethodField(read_only=True)  # Custom field for user information

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
            dict or bool: Serialized data for the shipping address, or False if not available.
        """
        try:
            address = obj.shippingAddress
            serializer = ShippingAddressSerializer(address, many=False)
            return serializer.data
        except:
            return False

    def get_user(self, obj):
        """
        Placeholder method for retrieving and serializing the user associated with the order.
        Currently not implemented.

        Args:
            obj (Order): The order instance.

        Returns:
            None
        """
        pass
        # user = obj.user
        # serializer = UserSerializer(user, many=False)
        # return serializer.data