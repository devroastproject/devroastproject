from rest_framework.permissions import BasePermission, SAFE_METHODS


# Permissions class for modifying Profile model instances
class IsOwnProfileOrReadOnly(BasePermission):

    def has_object_permission(self, request, view, obj):

        if request.method in SAFE_METHODS:

            return True

        return obj.user == request.user


# Permissions class for modifying User model instances
class IsOwnerOrReadOnly(BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in SAFE_METHODS:

            return True

        # Write permissions are only allowed to the owner of the snippet.
        return obj.username == request.user.username

