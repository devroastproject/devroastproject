from django.contrib.auth.models import User
from rest_framework.generics import ListAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.viewsets import ReadOnlyModelViewSet, GenericViewSet, ViewSet
from rest_framework.mixins import RetrieveModelMixin, UpdateModelMixin, ListModelMixin, DestroyModelMixin, CreateModelMixin
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK
from .serializers import UserSerializer, PasswordSerializer, ProfileSerializer
from .permissions import IsOwnerOrReadOnly, IsOwnProfileOrReadOnly
from users.models import Profile


# CRUD viewset for User model
class UserViewSet(
    GenericViewSet,
    RetrieveModelMixin,
    UpdateModelMixin,
    ListModelMixin,
    DestroyModelMixin   
):

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    # Function to update a user's password
    @action(methods=["PUT"], detail=True, serializer_class=PasswordSerializer)
    def change_password(self, request, pk):

        self.object = self.get_object()
        serializer = self.get_serializer(data=self.request.data)

        if serializer.is_valid():

            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):

                return Response({"old_password": "Incorrect password."}, status=HTTP_400_BAD_REQUEST)

            # set_password also hashes the password that the user will set
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST) 


class ProfileViewSet(
    GenericViewSet,
    RetrieveModelMixin,
    UpdateModelMixin,
    ListModelMixin,
    DestroyModelMixin,
    CreateModelMixin
):

    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated, IsOwnProfileOrReadOnly]
