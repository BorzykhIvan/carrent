from rest_framework import serializers
from ..serializers.users import UserSerializer
from ..models import Comment


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "content", "user", "created_at", "updated_at", "rating"]

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)
