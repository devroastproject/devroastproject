from django.test import TestCase
from django.contrib.auth.models import User

from users.models import Profile


class UserModelTests(TestCase):

    def setUp(self):

        # Create a test user 
        test_user = User.objects.create_user(
            id=1,
            first_name="Ron",
            last_name="Swanson",
            username="rswanson", 
            email="rswanson@pawnee.gov", 
            password="lagavulin16",
        )

        test_profile = Profile.objects.create(
            user= User.objects.get(id=1),
            role="Director, Pawnee Parks and Recreation.",
            location="Pawnee, IN",
            pronouns="He/Him"
        )

    def test_user_creation(self):

        test_user = User.objects.get(id=1)
        self.assertEqual(test_user.username, "rswanson")
        self.assertEqual(test_user.email, "rswanson@pawnee.gov")
        self.assertEqual(test_user.first_name, "Ron")
        self.assertEqual(test_user.last_name, "Swanson")

    # Test that a default profile is automatically created after user registration
    def test_profile_creation(self):

        test_profile = Profile.objects.get(user=User.objects.get(username="rswanson"))
        self.assertEqual(test_profile.user, User.objects.get(username="rswanson"))
        self.assertEqual(test_profile.role, "Director, Pawnee Parks and Recreation.")
        self.assertEqual(test_profile.location, "Pawnee, IN")
        self.assertEqual(test_profile.pronouns, "He/Him")
