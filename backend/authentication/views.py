from django.forms import model_to_dict
from django.contrib.auth import login, authenticate
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserLoginSerializer, UserRegisterSerializer


class UserLoginView(APIView):
    def post(self, request, *args, **kwargs):
        user_ser = UserLoginSerializer(data=request.data)
        if user_ser.is_valid(raise_exception=True):
            user = user_ser.check_user(request.data)
            login(request, user)
            return Response(user_ser.data, status=status.HTTP_200_OK)


class UserRegisterView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(request.data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
