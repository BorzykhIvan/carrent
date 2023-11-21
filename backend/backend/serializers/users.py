from rest_framework import serializers
from django.contrib.auth import get_user_model

user_model = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_model
        fields = ["id", "first_name", "last_name", "email"]
        ref_name = "UserSerializer"
