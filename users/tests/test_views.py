from django.contrib.auth.models import User
from rest_framework.status import HTTP_201_CREATED, HTTP_200_OK
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, APIRequestFactory, force_authenticate


# Test for users viewset
class UserViewSetTests(APITestCase):

    def setUp(self):

        self.user_data = {
            "username": "testuser",
            "password": "testpass",
        }
        
        self.pw_change_data = {
            'old_password': 'testpass',
            'new_password': 'userspword'
        }

        # Create an API factory instance for use in tests
        self.factory = APIRequestFactory()

    # Test user registration
    def test_registration(self):

        data = {
            "username": "testuser",
            "email": "test@example.com",
            "password1": "bad_pass",
            "password2": "bad_pass",
        }

        response = self.client.post("/api/auth/registration/", data=data)
        self.assertEqual(response.status_code, HTTP_201_CREATED)

    # Test that a user can login properly
    def test_login(self):

        # Create a test user, and token
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.token = Token.objects.create(user=self.user)

        response = self.client.post('/api/auth/login/', data=self.user_data)
        self.assertEqual(response.status_code, HTTP_200_OK)

    # Test GET requests for all users 
    def test_users(self):

        # Create a test user, and token
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.token = Token.objects.create(user=self.user)

        response = self.factory.get("/api/users/")
        force_authenticate(request=response, user=self.user)

    # GET a single, specific user
    def test_specific_user(self):

        # Create a test user, and token
        self.user = User.objects.create_user(id=1, username="testuser", password="testpass")
        self.token = Token.objects.create(user=self.user)

        response = self.factory.get("/api/users/1")
        force_authenticate(request=response, user=self.user)

    # Test updating a User's account info (email address)
    def test_updating_user(self):

        data = {
            "username": "testuser",
            "password": "testpass",
            "email": "testuser@example.com",
        }

        # Create a test user, and token
        self.user = User.objects.create_user(id=1, username="testuser", password="testpass", email="testuser@example.com")
        self.token = Token.objects.create(user=self.user)
        # Log the test user in
        self.client.post("/api/auth/login/", data=data)

        # Update the test user's email address, and verify that it has been saved to db
        user_instance = User.objects.get(id=1)
        user_instance.email = "test_user@example.com"
        user_instance.username = "test_user"
        user_instance.password = "test_password"
        user_instance.save()

        self.assertEqual(user_instance.email, "test_user@example.com")
        self.assertEqual(user_instance.username, "test_user")
        self.assertEqual(user_instance.password, "test_password")


    def test_change_own_password(self):

        user = User.objects.create_user(id=1, username="testuser", password="testpass", email="testuser@example.com")

        no_token_response = self.client.put('/api/users/me/change_password/', data= self.pw_change_data)

        token = Token.objects.create(user=user)
        self.client.credentials(HTTP_AUTHORIZATION='Token '+ token.key)
        token_response = self.client.put('/api/users/me/change_password/', data= self.pw_change_data)
        
        self.assertEqual(no_token_response.status_code, 401)
        self.assertEqual(token_response.status_code, 200)
        

    def test_change_others_password(self):
        
        user_2 = User.objects.create_user(id=2, username="testuser_2", password="testpass2", email="testuser2@example.com")

        no_token_response = self.client.put('/api/users/1/change_password/', data= self.pw_change_data)

        token = Token.objects.create(user=user_2)
        self.client.credentials(HTTP_AUTHORIZATION='Token '+ token.key)
        token_response = self.client.put('/api/users/1/change_password/', data= self.pw_change_data)
        
        self.assertEqual(no_token_response.status_code, 401)
        self.assertEqual(token_response.status_code, 404)
