from rest_framework import serializers
from .models import User, UserAddress
from backend.serializers import LoyaltySerializer


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = ["city", "street", "building", "zip_code"]


class UserSerializer(serializers.ModelSerializer):
    address = AddressSerializer()
    loyalty_level = LoyaltySerializer(read_only=True)
    password = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = User
        fields = [
            "email",
            "first_name",
            "last_name",
            "is_staff",
            "address",
            "loyalty_level",
            "loyalty_score",
            "phone_number",
            "password",
        ]

    def create(self, validated_data):
        print(validated_data)

        address_dict = validated_data.pop("address")
        city = address_dict.pop("city")
        building = address_dict.pop("building")
        zip_code = address_dict.pop("zip_code")
        street = address_dict.pop("street")

        user = User.objects.create_user(**validated_data)

        address = UserAddress.objects.create(
            city=city, building=building, zip_code=zip_code, street=street, user=user
        )
        return user
