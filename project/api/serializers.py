from rest_framework.fields import ReadOnlyField
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import ModelSerializer
from project.models import Project, Comment, Tag


class TagSerializer(ModelSerializer):

    class Meta:

        model = Tag
        fields = "__all__"


class ReplySerializer(ModelSerializer):

    class Meta:

        model = Comment 
        fields = "__all__"


class CommentSerializer(ModelSerializer):

    replies = ReplySerializer(source='comment_set', many=True)

    class Meta:

        model = Comment 
        fields = '__all__'


class ProjectSerializer(ModelSerializer):

    comments = CommentSerializer(source='comment_set', many=True)
    username = ReadOnlyField(source='user.username')
    class Meta:
    
        model = Project
        fields = "__all__"
