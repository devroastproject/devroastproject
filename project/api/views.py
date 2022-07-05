from rest_framework.response import Response
from project.models import Project, Comment, Vote, Tag
from rest_framework.mixins import RetrieveModelMixin, UpdateModelMixin, ListModelMixin, DestroyModelMixin, CreateModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .permissions import IsOwnProjectOrReadOnly
from .serializers import CommentSerializer, ProjectSerializer, VoteSerializer, TagSerializer


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


class TagsViewset(
    RetrieveModelMixin,
    UpdateModelMixin,
    ListModelMixin,
    DestroyModelMixin,
    CreateModelMixin,
    GenericViewSet
):

    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def update(self, request, *args, **kwargs):
        tag = self.get_object()
        data = request.data
        if 'comment' in data:
            if data['assigned']:
                tag.comment.remove(data['comment'])
            else:
                tag.comment.add(data['comment'])

        elif 'project' in data:
            if data['assigned']:
                tag.project.remove(data['project'])
            else:
                tag.project.add(data['project'])

        return Response(data='update method triggered')

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
            comment.closed = True
            comment.save()
            return Response(data='comment removed')