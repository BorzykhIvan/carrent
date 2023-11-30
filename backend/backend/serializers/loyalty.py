from rest_framework import serializers

from ..models import UserLevel


class LoyaltySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLevel
        fields = ["level", "discount", "name"]
