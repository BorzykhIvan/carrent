from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers

from .views import (
    CarViewSet,
    RefferalView,
    SummaryView,
    UserChatView,
    AdminChatView,
    AdminMessagesView,
)

router = DefaultRouter()
router.register(r"cars", CarViewSet, basename="car")

images_router = routers.NestedDefaultRouter(router, r"cars", lookup="car")
urlpatterns = [
    path("", include(router.urls)),
    path("", include(images_router.urls)),
    path("referral/", RefferalView.as_view()),
    path("calculator/", SummaryView.as_view()),
    path("chat/", UserChatView.as_view()),
    path("chat/<int:id>/", AdminChatView.as_view()),
    path("messages/", AdminMessagesView.as_view()),
]
