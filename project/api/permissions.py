from rest_framework.permissions import BasePermission, SAFE_METHODS
from django.contrib.auth.models import User 


# Permissions class for modifying Project model instances
class IsOwnProjectOrReadOnly(BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in SAFE_METHODS:

            return True

        # Write permissions are only allowed to the owner of the snippet.
        return obj.user.username == request.user.username
