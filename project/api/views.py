from rest_framework.response import Response
from project.models import Project, Comment, Vote
from rest_framework.mixins import RetrieveModelMixin, UpdateModelMixin, ListModelMixin, DestroyModelMixin, CreateModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .permissions import IsOwnProjectOrReadOnly
from .serializers import CommentSerializer, ProjectSerializer, VoteSerializer


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


class VotesViewset(
    RetrieveModelMixin,
    UpdateModelMixin,
    ListModelMixin,
    DestroyModelMixin,
    CreateModelMixin,
    GenericViewSet
):

    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class CommentsViewset(
    RetrieveModelMixin,
    UpdateModelMixin,
    ListModelMixin,
    DestroyModelMixin,
    CreateModelMixin,
    GenericViewSet
):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsOwnProjectOrReadOnly, IsAuthenticatedOrReadOnly]

    def destroy(self, request, *args, **kwargs):
        comment = self.get_object()
        # if the comment is a reply or a prompt with no replies, delete it as normal
        if comment.prompt or not Comment.objects.filter(prompt=comment.id):
            comment.delete()
            return Response(data='delete successful')

        # if the comment has replies, overwrite it, but leave it to show the replies
        else:
            comment.body = 'This Comment Has Been Deleted'
            comment.neg_votes = 0
            comment.pos_votes = 0
            comment.closed = True
            comment.save()
            return Response(data='comment removed')