from django.db import models
from django.conf import settings


class Chat(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="chat"
    )


class Message(models.Model):
    id = models.AutoField(primary_key=True)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name="messages")
    is_admin = models.BooleanField(default=False)
    content = models.CharField(max_length=256, blank=True)
    date = models.DateTimeField(auto_now_add=True)
