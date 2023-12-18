from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    CarViewSet,
    RefferalView,
    OrderView,
    UserChatView,
    AdminChatView,
    AdminMessagesView,
    ReservationView,
    CalculatorView,
    BonusesViewSet,
    BonusTypesViewSet,
    CommentViewSet,
)

router = DefaultRouter()
router.register(r"cars", CarViewSet, basename="car")

router.register(r"order", OrderView, basename="order")
router.register(r"bonuses", BonusesViewSet)
router.register(r"bonustypes", BonusTypesViewSet)
router.register(r"comments", CommentViewSet)
urlpatterns = [
    path("", include(router.urls)),
    path("referral/", RefferalView.as_view()),
    path("chat/", UserChatView.as_view()),
    path("chat/<int:id>/", AdminChatView.as_view()),
    path("messages/", AdminMessagesView.as_view()),
    path("reservations/<int:car_id>/", ReservationView.as_view()),
    path("calculator/", CalculatorView.as_view()),
]
