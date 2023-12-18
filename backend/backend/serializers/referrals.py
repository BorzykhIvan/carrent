from rest_framework import serializers

from django.contrib.auth import get_user_model


class RefferalTokenSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=16)

    def validate_token(self, validated_data):
        user_model = get_user_model()
        try:
            referrer = user_model.objects.get(referral_token=validated_data)
        except user_model.DoesNotExist as exc:
            raise serializers.ValidationError("Your token is not valid") from exc
        self.context["referrer"] = referrer

    def activate_token(self, user):
        if user.referrer:
            raise ValueError("You have already activated referral code")
        if user.id != self.context["referrer"].id:
            user.referrer = self.context["referrer"]
            user.save()
        else:
            raise ValueError("You can't activate your token")
