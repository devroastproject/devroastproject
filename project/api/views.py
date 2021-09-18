from project.models import Project, Comment
from rest_framework.mixins import RetrieveModelMixin, UpdateModelMixin, ListModelMixin, DestroyModelMixin, CreateModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .permissions import IsOwnProjectOrReadOnly
from .serializers import CommentSerializer, ProjectSerializer, ReplySerializer


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
    permission_classes = [IsOwnProjectOrReadOnly, IsAuthenticatedOrReadOnly]


class CommentsViewset(
    RetrieveModelMixin,
    UpdateModelMixin,
    ListModelMixin,
    DestroyModelMixin,
    CreateModelMixin,
    GenericViewSet
):
    queryset = Comment.objects.all()

    # queryset = Comment.objects.filter(prompt__isnull=True)
    # def get_queryset(self):
    #     return Comment.objects.filter(prompt__isnull=True)
    
    serializer_class = CommentSerializer
    permission_classes = [IsOwnProjectOrReadOnly, IsAuthenticatedOrReadOnly]


# class RepliesViewset(
#     RetrieveModelMixin,
#     UpdateModelMixin,
#     ListModelMixin,
#     DestroyModelMixin,
#     CreateModelMixin,
#     GenericViewSet
# ):

#     queryset = Comment.objects.exclude(post__isnull=False)
#     serializer_class = ReplySerializer
#     permission_classes = [IsOwnProjectOrReadOnly, IsAuthenticatedOrReadOnly]

