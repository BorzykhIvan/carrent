from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from drf_spectacular.utils import (
    extend_schema,
    OpenApiResponse,
    inline_serializer,
)
from ..serializers import CreateOrderSerializer, ListOrderSerializer, DateSerializer
from ..utils.order import get_occupied_slots
from ..models import Order


class CalculatorView(APIView):
    @extend_schema(
        description="Calculate cost of rent",
        parameters=[CreateOrderSerializer],
        responses={
            200: OpenApiResponse(
                description="Total price",
                response=inline_serializer(
                    "TotalSerializer", fields={"total": serializers.FloatField()}
                ),
            )
        },
    )
    def get(self, request):
        serializer = CreateOrderSerializer(
            data=request.GET, context={"user": request.user}
        )
        serializer.is_valid(raise_exception=True)
        price = serializer.calculate_price()
        return Response({"total": price})


class OrderView(ViewSet):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        description="Get list of all your reservations",
        responses={200: OpenApiResponse(response=ListOrderSerializer)},
    )
    def list(self, request):
        orders = (
            Order.objects.filter(user=request.user)
            .select_related(
                "user",
                "car",
                "car__fuel_type",
                "car__transmission_type",
                "car__brand",
            )
            .all()
        )
        serializer = ListOrderSerializer(instance=orders, many=True)
        return Response(serializer.data)

    @extend_schema(
        description="Reservate a car",
        request=CreateOrderSerializer,
        responses={
            200: OpenApiResponse(
                description="Rent has been reserved successfully",
                response=CreateOrderSerializer,
            ),
            400: OpenApiResponse(
                description="Dates has been already reserved",
                response=inline_serializer(
                    "ErrorSerializer", fields={"error": serializers.CharField()}
                ),
            ),
        },
    )
    def create(self, request):
        serializer = CreateOrderSerializer(
            data=request.data, context={"user": request.user}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    @extend_schema(responses=ListOrderSerializer(many=True))
    @action(detail=False, methods=["get"], permission_classes=[IsAdminUser])
    def all(self, request):
        orders = Order.objects.all()
        serializer = ListOrderSerializer(instance=orders, many=True)
        return Response(serializer.data)


class ReservationView(APIView):
    @extend_schema(
        description="List of all occupied rents",
        responses={200: OpenApiResponse(response=DateSerializer(many=True))},
    )
    def get(self, request, car_id):
        occupied = get_occupied_slots(car_id=car_id)
        serializer = DateSerializer(instance=occupied, many=True)
        return Response(serializer.data)
