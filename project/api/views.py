from project.models import Project, Comment, Tag
from rest_framework.mixins import RetrieveModelMixin, UpdateModelMixin, ListModelMixin, DestroyModelMixin, CreateModelMixin
from rest_framework.viewsets import GenericViewSet
from .permissions import IsOwnProjectOrReadOnly
from .serializers import ProjectSerializer


# Create your views here.
class ProjectsViewset(
    RetrieveModelMixin,
    UpdateModelMixin,
    ListModelMixin,
    DestroyModelMixin,
    CreateModelMixin,
    GenericViewSet
):

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsOwnProjectOrReadOnly]
