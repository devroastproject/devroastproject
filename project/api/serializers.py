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
    
    # replies = ReplySerializer(source='comment_set', many=True)

    class Meta:

        model = Comment 
        fields = '__all__'


class ProjectSerializer(ModelSerializer):

    queryset = Comment.objects.filter(prompt__isnull=True)
    print(queryset)
    comments = CommentSerializer(many=True)
    print(comments)
    # comments = PrimaryKeyRelatedField(queryset = Comment.objects.filter(prompt__isnull=True), many=True)
    # username = ReadOnlyField(source='user.username')
    class Meta:
    
        model = Project
        # fields = ['user', 'title', 'comments']
        fields = '__all__'
# 