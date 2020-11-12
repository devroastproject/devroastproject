from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectsViewset


router = DefaultRouter()

router.register(r"projects", ProjectsViewset)

urlpatterns = [
    path("", include(router.urls))
]
