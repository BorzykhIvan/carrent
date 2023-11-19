from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.conf import settings
from drf_yasg.utils import swagger_auto_schema

from ..serializers import RefferalTokenSerializer


class RefferalView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        responses={200: "Token"},
    )
    def get(self, request):
        token = request.user.referral_token
        return Response({"token": token})

    @swagger_auto_schema(
        request_body=RefferalTokenSerializer,
        responses={200: "Activated", 400: "Bad Request"},
    )
    def post(self, request):
        serializer = RefferalTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            serializer.activate_token(user=request.user)
        except ValueError as exc:
            return Response({"error": exc.args[0]}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"message": "Referral token successfully activated!"})
