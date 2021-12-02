from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectsViewset, CommentsViewset, VotesViewset


router = DefaultRouter()

router.register(r"projects", ProjectsViewset)
router.register(r"comments", CommentsViewset)
router.register(r"votes", VotesViewset)

urlpatterns = [
    path("", include(router.urls))
]
