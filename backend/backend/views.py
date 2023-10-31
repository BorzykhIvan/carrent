from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import parsers
from django_filters import rest_framework as filters
from .models import Car
from .serializers import CarSerializer
from .filters import CarFilter


# Create your views here.
class CarViewSet(ModelViewSet):
    parser_classes = (
        parsers.FormParser,
        parsers.MultiPartParser,
        parsers.FileUploadParser,
    )
    serializer_class = CarSerializer
    queryset = Car.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CarFilter

    # def get_queryset(self):
    #     car_filter = CarFilter(queryset=Car.objects.all(), request=self.request.GET)

    #     return car_filter.qs
