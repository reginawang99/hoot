from rest_framework import serializers
from user_profile.models import User, Theme
from django.contrib.auth import get_user_model


# This is a serializer for a basic, read only user.
class SafeUserSerializer(serializers.ModelSerializer):
    section = serializers.StringRelatedField()

    class Meta:
        model = User
        # feel free to add fields to serialize. 
        # For now
        fields = ('username',  'last_name', 'first_name')
        exclude = ('password', 'user_permissions')
