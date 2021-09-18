from rest_framework.fields import SerializerMethodField
from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
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
    
    replies = SerializerMethodField()

    class Meta:

        model = Comment 
        fields = '__all__'

    def get_replies(self, obj):
         return ReplySerializer(obj.replies.filter(prompt__isnull=False), many=True).data


class ProjectSerializer(ModelSerializer):

    comments = SerializerMethodField()

    class Meta:
    
        model = Project
        fields = '__all__'
   
    def get_comments(self, obj):
         return CommentSerializer(obj.comments.filter(prompt__isnull=True), many=True).data