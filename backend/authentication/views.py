from djoser.views import UserViewSet as DjoserUserViewSet
from rest_framework import status
from rest_framework import mixins
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAdminUser

from .models import ChangeRequest
from .serializers import UserSerializer, ChangeRequestSerializer


class UserViewSet(DjoserUserViewSet):
    def update(
        self, request, *args, **kwargs
    ):  # before data update admin should verify this
        partial = kwargs.pop("partial", False)
        user = self.get_instance()
        serializer = UserSerializer(instance=user, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        response = serializer.validated_data
        if not response:  # if no data passed
            return Response(
                {"error": "No data passed"}, status=status.HTTP_400_BAD_REQUEST
            )
        change_request = serializer.create_change_request()
        response.update(
            {"message": "Your changes were sent to admins to verifying process"}
        )  # add message to our changed data response
        return Response(response)

    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)


class ChangeRequestViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    GenericViewSet,
):
    permission_classes = [IsAdminUser]
    serializer_class = ChangeRequestSerializer
    queryset = ChangeRequest.objects.filter(is_accepted=False, is_declined=False)

    @action(detail=True, methods=["get"])
    def accept(self, request, pk=None):
        instance = self.get_object()
        context = self.get_serializer_context()
        serializer = self.serializer_class(instance=instance, context=context)
        serializer.accept_changes()
        return Response({"message": "Changes accepted"})

    @action(detail=True, methods=["get"])
    def decline(self, request, pk=None):
        instance = self.get_object()
        context = self.get_serializer_context()
        serializer = self.serializer_class(instance=instance, context=context)
        serializer.decline_changes()
        return Response({"message": "Changes declined"})
