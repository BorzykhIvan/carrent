from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from drf_spectacular.utils import (
    extend_schema,
    OpenApiResponse,
    inline_serializer,
)
from ..serializers import OrderSerializer
from ..utils.order import get_occupied_slots
from ..models import Order


class OrderView(ViewSet):
    @extend_schema(
        description="Calculate cost of rent",
        parameters=[OrderSerializer],
        responses={
            200: OpenApiResponse(
                description="Total price",
                response=inline_serializer(
                    "TotalSerializer", fields={"total": serializers.FloatField()}
                ),
            )
        },
    )
    def list(self, request):
        serializer = OrderSerializer(data=request.GET)
        serializer.is_valid(raise_exception=True)
        price = serializer.calculate_price(user=request.user)
        return Response({"total": price})

    @extend_schema(
        description="Reservate a car",
        request=OrderSerializer,
        responses={
            200: OpenApiResponse(
                description="Rent has been reserved successfully",
                response=OrderSerializer,
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
        serializer = OrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data)

    @extend_schema(responses=OrderSerializer(many=True))
    @action(detail=False, methods=["get"])
    def history(self, request):
        orders = Order.objects.filter(user=request.user).all()
        serializer = OrderSerializer(instance=orders, many=True)
        return Response(serializer.data)

    def get_permissions(self):
        if self.action == "list":
            return []
        return [IsAuthenticated()]


class ReservationView(APIView):
    @extend_schema(
        description="List of all occupied rents",
        responses={200: OpenApiResponse(response=OrderSerializer(many=True))},
    )
    def get(self, request, car_id):
        occupied = get_occupied_slots(car_id=car_id)
        serializer = OrderSerializer(instance=occupied, many=True)
        return Response(serializer.data)
