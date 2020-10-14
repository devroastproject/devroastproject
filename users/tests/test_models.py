from django.test import TestCase
from django.contrib.auth.models import User

from users.models import Profile


class UserModelTests(TestCase):

    def test_user_creation(self):

        # Create a test user 
        test_user = User.objects.create_user(
            id=1,
            first_name="Ron",
            last_name="Swanson",
            username="rswanson", 
            email="rswanson@pawnee.gov", 
            password="lagavulin16",
        )

        self.assertEqual(test_user.username, "rswanson")
        self.assertEqual(test_user.email, "rswanson@pawnee.gov")
        self.assertEqual(test_user.first_name, "Ron")
        self.assertEqual(test_user.last_name, "Swanson")

    # Test that a default profile is automatically created after user registration
    def test_profile_creation(self):

        profile = Profile.objects.create(
            id=1,
            role="Lead Engineer",
            location="Seattle",
        )

        self.assertEqual(profile.role, "Lead Engineer")
        self.assertEqual(profile.location, "Seattle")