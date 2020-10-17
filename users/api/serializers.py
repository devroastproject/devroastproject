from rest_framework.serializers import ModelSerializer, Serializer, CharField
from django.contrib.auth.models import User
from users.models import Profile


# Serializer for the User model
class UserSerializer(ModelSerializer):

    class Meta:

        model = User
        fields = ("username", "email", "password", "date_joined")
        write_only_fields = ("password")


# Serializer for updating passwords
class PasswordSerializer(Serializer):

    old_password = CharField(required=True)
    new_password = CharField(required=True)


# Serializer for the Profile model
class ProfileSerializer(ModelSerializer):

    class Meta:

        model = Profile
        fields = "__all__"
        