from django.contrib.auth import authenticate

from rest_framework.serializers import (
    ModelSerializer,
    Serializer,
    EmailField,
    CharField,
    ValidationError,
)


from .models import User


class UserRegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "password"]

    def create(self, validated_data):
        user_obj = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
        )
        return user_obj


class UserLoginSerializer(Serializer):
    email = EmailField()
    password = CharField()

    ##
    def check_user(self, clean_data):
        user = authenticate(email=clean_data["email"], password=clean_data["password"])
        print(clean_data["email"], clean_data["password"])
        if not user:
            raise ValidationError("user not found")
        return user
