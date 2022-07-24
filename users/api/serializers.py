from rest_framework.serializers import ModelSerializer, Serializer, CharField, SerializerMethodField
from django.contrib.auth.models import User
from users.models import Profile


# Serializer for the User model
class UserSerializer(ModelSerializer):

    class Meta:

        model = User
        fields = ("id", "username", "email", "password", "date_joined")
        extra_kwargs = {
            'password': {'write_only': True},
            'is': {'write_only': True},
            'email': {'write_only': True},
            }

# Serializer for updating passwords
class PasswordSerializer(Serializer):

    old_password = CharField(required=True)
    new_password = CharField(required=True)


# Serializer for the Profile model
class ProfileSerializer(ModelSerializer):

    username = SerializerMethodField()

    class Meta:

        model = Profile
        fields = "__all__"
    
    def get_username(self, obj):
        return User.objects.get(username=obj.user).username