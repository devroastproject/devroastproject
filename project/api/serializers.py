from rest_framework.fields import SerializerMethodField
from rest_framework.serializers import ModelSerializer
from project.models import Project, Comment, Tag, User, Vote


class TagSerializer(ModelSerializer):

    class Meta:

        model = Tag
        fields = ['id', 'tagname', 'description', 'project', 'comment']


class VoteSerializer(ModelSerializer):

    class Meta:

        model = Vote
        fields = ['id', 'user', 'comment', 'positive']


class CommentSerializer(ModelSerializer):
    
    replies = SerializerMethodField()
    username = SerializerMethodField()
    votes = SerializerMethodField()
    tags = SerializerMethodField()

    class Meta:

        model = Comment 
        fields = '__all__'

    def get_replies(self, obj):
         return CommentSerializer(obj.replies.filter(prompt__isnull=False), many=True).data
    
    def get_username(self, obj):
        return User.objects.get(username=obj.user).username

    def get_votes(self, obj):
        # query votes related to the comment
        votes = VoteSerializer(Vote.objects.filter(comment=obj.id).select_related().order_by('user'), many=True).data
        # query users related to the votes
        related_users = User.objects.filter(pk__in=[vote['user'] for vote in votes]).order_by('id')
        #  extract user names
        user_names = [user.username for user in related_users]
        # add user names to votes (both queries are sorted by the same value)
        for i in range(len(votes)):
            votes[i]['username'] = user_names[i]
        return votes
    
    def get_tags(self, obj):
        return TagSerializer(Tag.objects.filter(comment=obj), many=True).data

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