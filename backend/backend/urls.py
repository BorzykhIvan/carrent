from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers

from .views import (
    CarViewSet,
    RefferalView,
    OrderView,
    UserChatView,
    AdminChatView,
    AdminMessagesView,
    ReservationView,
)

router = DefaultRouter()
router.register(r"cars", CarViewSet, basename="car")

router.register(r"order", OrderView, basename="order")

urlpatterns = [
    path("", include(router.urls)),
    path("referral/", RefferalView.as_view()),
    path("chat/", UserChatView.as_view()),
    path("chat/<int:id>/", AdminChatView.as_view()),
    path("messages/", AdminMessagesView.as_view()),
    path("reservations/<int:car_id>/", ReservationView.as_view()),
]
