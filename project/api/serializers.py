from rest_framework.fields import SerializerMethodField
from rest_framework.serializers import ModelSerializer
from project.models import Project, Comment, Tag, User


class TagSerializer(ModelSerializer):

    class Meta:

        model = Tag
        fields = ['id', 'tagname', 'description']


class CommentSerializer(ModelSerializer):
    
    replies = SerializerMethodField()
    tags = TagSerializer(source='tag_set', many=True)
    username = SerializerMethodField()

    class Meta:

        model = Comment 
        fields = '__all__'

    def get_replies(self, obj):
         return CommentSerializer(obj.replies.filter(prompt__isnull=False), many=True).data
    
    def get_username(self, obj):
        return User.objects.get(username=obj.user).username


class ProjectSerializer(ModelSerializer):

    comments = SerializerMethodField()
    comment_count = SerializerMethodField()
    username = SerializerMethodField()
    tags = TagSerializer(source='tag_set', many=True)

    class Meta:
    
        model = Project
        fields = '__all__'
   
    def get_comments(self, obj):
        return CommentSerializer(obj.comments.filter(prompt__isnull=True), many=True).data

    def get_comment_count(self, obj):
        return obj.comments.count()
    
    def get_username(self, obj):
        return User.objects.get(username=obj.user).username