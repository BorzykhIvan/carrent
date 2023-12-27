from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ChangeRequestViewSet

router = DefaultRouter()
router.register("users", UserViewSet)
router.register("verify", ChangeRequestViewSet)

urlpatterns = router.urls
