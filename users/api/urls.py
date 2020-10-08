from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet


# Define URLs, and corresponding viewsets using DRF routers
router = DefaultRouter()

router.register(r"users", UserViewSet)

urlpatterns = [
    path("", include(router.urls))
]
