from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectsViewset, CommentsViewset


router = DefaultRouter()

router.register(r"projects", ProjectsViewset)
router.register(r"comments", CommentsViewset)

urlpatterns = [
    path("", include(router.urls))
]
