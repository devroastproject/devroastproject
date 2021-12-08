from rest_framework.fields import SerializerMethodField
from rest_framework.serializers import ModelSerializer
from project.models import Project, Comment, Tag, User, Vote


class TagSerializer(ModelSerializer):

    class Meta:

        model = Tag
        fields = ['id', 'tagname', 'description']


class VoteSerializer(ModelSerializer):

    class Meta:

        model = Vote
        fields = ['id', 'user', 'positive']


class CommentSerializer(ModelSerializer):
    
    replies = SerializerMethodField()
    # tags = TagSerializer(source='tag_set', many=True)
    username = SerializerMethodField()
    votes = SerializerMethodField()

    class Meta:

        model = Comment 
        fields = '__all__'

    def get_replies(self, obj):
         return CommentSerializer(obj.replies.filter(prompt__isnull=False), many=True).data
    
    def get_username(self, obj):
        return User.objects.get(username=obj.user).username

    def get_votes(self, obj):
        return VoteSerializer(Vote.objects.filter(comment=obj.id).select_related(), many=True).data


class ProjectSerializer(ModelSerializer):

    comments = SerializerMethodField()
    comment_count = SerializerMethodField()
    username = SerializerMethodField()
    tags = SerializerMethodField()

    class Meta:
    
        model = Project
        fields = '__all__'
   
    def get_comments(self, obj):
        return CommentSerializer(obj.comments.filter(prompt__isnull=True), many=True).data

    def get_comment_count(self, obj):
        return obj.comments.count()
    
    def get_username(self, obj):
        return User.objects.get(username=obj.user).username

    def get_tags(self, obj):
        return TagSerializer(Tag.objects.filter(project=obj), many=True).data