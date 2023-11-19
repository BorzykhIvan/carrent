from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from ..utils.calculator import calculate_price
from ..serializers import SummarySerializer


class SummaryView(APIView):
    @swagger_auto_schema(
        query_serializer=SummarySerializer,
        responses={
            200: openapi.Response(
                "OK",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={"total": openapi.Schema(type=openapi.TYPE_NUMBER)},
                ),
            )
        },
    )
    def get(self, request):
        serializer = SummarySerializer(data=request.GET)
        serializer.is_valid(raise_exception=True)
        price = serializer.calculate_price(user=request.user)
        return Response({"total": price})
