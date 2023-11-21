from rest_framework import status
from rest_framework.generics import ListCreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.db.models import Max


from ..models import Chat, Message
from ..serializers import MessageSerializer


class UserChatView(ListCreateAPIView):
    """
    Endpoint for interacting with chat (client-side)
    """

    permission_classes = [IsAuthenticated]
    serializer_class = MessageSerializer

    def get_queryset(self):
        chat, created = Chat.objects.get_or_create(user=self.request.user)
        return chat.messages.all()

    def create(self, request, *args, **kwargs):
        chat, created = Chat.objects.get_or_create(user=request.user)
        serializer = MessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        msg = Message.objects.create(**serializer.data, chat=chat)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class AdminMessagesView(ListAPIView):
    """
    Endpoint to get latest messages for every user
    """

    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated & IsAdminUser]

    def get_queryset(self):
        latest_messages = (
            Message.objects.values("chat")
            .annotate(last_message_id=Max("id"))
            .values("last_message_id")
        )
        last_messages_in_chats = Message.objects.filter(id__in=latest_messages)
        return last_messages_in_chats


class AdminChatView(ListCreateAPIView):
    """
    Endpoint to interact with chat (admin-side)
    """

    permission_classes = [IsAuthenticated & IsAdminUser]
    serializer_class = MessageSerializer

    def get_queryset(self):
        chat = Chat.objects.get(id=self.kwargs["id"])
        return chat.messages.all()

    def create(self, request, *args, **kwargs):
        chat = Chat.objects.get(id=self.kwargs["id"])
        serializer = MessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        msg = Message.objects.create(
            content=serializer.data["content"], is_admin=True, chat=chat
        )
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )
