from rest_framework.status import HTTP_200_OK
from project.models import Project
from rest_framework.test import APIRequestFactory, APITestCase, force_authenticate
from django.contrib.auth.models import User


class ProjectViewSetTests(APITestCase):

    def setUp(self):

        self.factory = APIRequestFactory()

        self.test_user = User.objects.create_user(
            id=1,
            first_name="Walter",
            last_name="White",
            username="wwhite", 
            email="wwhite@abqschools.edu", 
            password="pollos",
        )

        # Create a test project
        self.test_project = Project.objects.create(
            id=1,
            user=User.objects.get(id=1),
            title="Heisenburg's Online Lab",
            repo_url="https://github.com/wwhite/onlinelab",
            hosted_url="https://heisenburglab.net",
            description="My online lab."
        )

    # Test the endpoint to show all projects
    def test_get_projects(self):

        response = self.client.get("/api/projects/")
        self.assertEqual(response.status_code, HTTP_200_OK)

    # Test the endpoint to GET a specific project
    def test_specific_project(self):

        response = self.client.get("/api/projects/1/")
        self.assertEqual(response.status_code, HTTP_200_OK)

    # users without a certain number of comments cannot create edit or delete tags
    # users with a certain number of comments can create edit or delete tags
    def test_tag_threshold_met(self):
        self.fail()

    def test_tag_threshold_not_met(self):
        self.fail()

    # replies nest correctly when serialized
    def test_nested_replies(self):
        self.fail()

    # each user can only vote on a comment once
    def test_single_vote(self):
        self.fail()