from rest_framework import status, serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from drf_spectacular.utils import extend_schema, OpenApiResponse, inline_serializer

from ..serializers import RefferalTokenSerializer


class RefferalView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        description="Get referral token",
        responses={200: OpenApiResponse(response=RefferalTokenSerializer)},
    )
    def get(self, request):
        token = request.user.referral_token
        return Response({"token": token})

    @extend_schema(
        description="Activate referral token",
        request=RefferalTokenSerializer,
        responses={
            200: OpenApiResponse(
                description="Referral token successfully activated!",
                response=RefferalTokenSerializer,
            ),
            400: OpenApiResponse(
                description="Referral token is invalid",
                response=inline_serializer(
                    "ErrorSerializer", fields={"error": serializers.CharField()}
                ),
            ),
        },
    )
    def post(self, request):
        serializer = RefferalTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            serializer.activate_token(user=request.user)
        except ValueError as exc:
            return Response({"error": exc.args[0]}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"message": "Referral token successfully activated!"})
