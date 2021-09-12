from rest_framework.serializers import ModelSerializer
from project.models import Project, Comment, Tag


class TagSerializer(ModelSerializer):

    class Meta:

        model = Tag
        fields = "__all__"

class CommentSerializer(ModelSerializer):

    class Meta:

        model = Comment 
        fields = "__all__"

class ProjectSerializer(ModelSerializer):
    comments = CommentSerializer(source='comment_set', many=True)

    class Meta:
    
        model = Project
        fields = "__all__"
