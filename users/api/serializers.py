from rest_framework.serializers import ModelSerializer, Serializer, CharField
from django.contrib.auth.models import User


class UserSerializer(ModelSerializer):

    class Meta:

        model = User
        fields = ("username", "email", "password", "date_joined")
        write_only_fields = ("password")


class PasswordSerializer(Serializer):

    old_password = CharField(required=True)
    new_password = CharField(required=True)
    