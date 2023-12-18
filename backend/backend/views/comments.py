from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import SAFE_METHODS, IsAdminUser, IsAuthenticated
from rest_framework import mixins

from ..serializers import CommentSerializer
from ..models import Comment


class CommentViewSet(
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    GenericViewSet,
):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            return []
        if self.action == "destroy":
            return [IsAdminUser()]
        return [IsAuthenticated()]  # create action
