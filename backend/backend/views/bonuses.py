from rest_framework import mixins, parsers
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.permissions import IsAdminUser, IsAuthenticated, SAFE_METHODS
from rest_framework.decorators import action
from ..models import BonusType, Bonus
from ..serializers import BonusSerializer, BonusTypeSerializer


class BonusesViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    GenericViewSet,
):
    serializer_class = BonusSerializer
    queryset = Bonus.objects.select_related("user", "bonus_type").filter(
        is_accepted=False, is_declined=False
    )

    parser_classes = (
        parsers.FormParser,
        parsers.MultiPartParser,
        parsers.FileUploadParser,
    )

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [IsAdminUser()]
        return [IsAuthenticated()]

    @action(methods=["get"], detail=True, permission_classes=[IsAdminUser])
    def accept(self, request, pk=None):
        context = self.get_serializer_context()
        instance = self.get_object()
        serializer = self.serializer_class(instance=instance, context=context)
        serializer.accept()
        return Response({"message": "Bonus has been accepted"})

    @action(methods=["get"], detail=True, permission_classes=[IsAdminUser])
    def decline(self, request, pk=None):
        context = self.get_serializer_context()
        instance = self.get_object()
        serializer = self.serializer_class(instance=instance, context=context)
        serializer.decline()
        return Response({"message": "Bonus has been declined"})


class BonusTypesViewSet(ModelViewSet):
    serializer_class = BonusTypeSerializer
    queryset = BonusType.objects.all()
    parser_classes = (
        parsers.FormParser,
        parsers.MultiPartParser,
        parsers.FileUploadParser,
    )

    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            return []
        return [IsAdminUser()]
