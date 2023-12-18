from rest_framework import serializers
from .users import UserSerializer
from ..models import Message, Chat


class ChatSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Chat
        fields = ["id", "user"]


class MessageSerializer(serializers.ModelSerializer):
    chat = ChatSerializer(read_only=True)
    date = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Message
        fields = ["id", "chat", "content", "date", "is_admin"]
        read_only_fields = ["is_admin"]
