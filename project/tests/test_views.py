import re

from django.http import request
from project.api.views import CommentsViewset, VotesViewset
from rest_framework.status import HTTP_200_OK
from project.models import Project, Comment
from rest_framework.test import APITestCase, APIRequestFactory, force_authenticate
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class ProjectViewSetTests(APITestCase):

    def setUp(self):

        self.factory = APIRequestFactory()

        self.test_user = User.objects.create_user(
            id=1,
            first_name="Walter",
            last_name="White",
            username="wwhite", 
            email="wwhite@abqschools.edu", 
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

        self.test_comment = Comment.objects.create(
            id = 1,
            post = Project.objects.get(id=1),
            user = User.objects.get(id=1),
            prompt = None,
            body = 'This is a prompt',
            closed = False
        )

        self.test_reply = Comment.objects.create(
            id = 2,
            post = Project.objects.get(id=1),
            user = User.objects.get(id=1),
            prompt = Comment.objects.get(id=1),
            body = 'This is a reply',
            closed = False)

        self.test_token = Token.objects.create(user=self.test_user)
        self.test_token.save()

    # Test the endpoint to show all projects
    def test_get_projects(self):

        response = self.client.get("/api/projects/")
        self.assertEqual(response.status_code, HTTP_200_OK)

    # Test the endpoint to GET a specific project
    def test_specific_project(self):

        response = self.client.get("/api/projects/1/")
        self.assertEqual(response.status_code, HTTP_200_OK)

    # replies nest correctly when serialized
    def test_nested_replies(self):

        response = self.client.get("/api/projects/1/")
        comments = response.json()['comments']
        self.assertEqual(len(comments), 1)
        self.assertEqual(len(comments[0]['replies']), 1)

    # prompts with replies don't get fully deleted
    def test_prompt_delete(self):

        request = self.factory.delete("/api/comments/1/", HTTP_AUTHORIZATION=f'Token {self.test_token}')
        force_authenticate(request, user=self.test_user, token=self.test_token)
        view = CommentsViewset.as_view({'delete':'destroy'})
        response = view(request, pk=1)
        self.assertEqual(response.data, 'comment removed')

    # replies get fully deleted
    def test_reply_delete(self):

        request = self.factory.delete("/api/comments/2/", HTTP_AUTHORIZATION=f'Token {self.test_token}')
        force_authenticate(request, user=self.test_user, token=self.test_token)
        view = CommentsViewset.as_view({'delete':'destroy'})
        response = view(request, pk=2)
        self.assertEqual(response.data, 'delete successful')

    # after a reply is removed, a prompt can be deleted
    def test_comment_delete(self):

        request = self.factory.delete("/api/comments/2/", HTTP_AUTHORIZATION=f'Token {self.test_token}')
        force_authenticate(request, user=self.test_user, token=self.test_token)
        view = CommentsViewset.as_view({'delete':'destroy'})
        response = view(request, pk=2)
        request = self.factory.delete("/api/comments/1/", HTTP_AUTHORIZATION=f'Token {self.test_token}')
        force_authenticate(request, user=self.test_user, token=self.test_token)
        view = CommentsViewset.as_view({'delete':'destroy'})
        response = view(request, pk=1)
        self.assertEqual(response.data, 'delete successful')

    # each user can only vote on a comment once
    def test_single_vote(self):
        
        def postvote(self):
            data = {"comment": 1, "positive": True, "user": 1}
            request = self.factory.post('api/votes/', data, format='json', HTTP_AUTHORIZATION=f'Token {self.test_token}')
            force_authenticate(request, user=self.test_user, token=self.test_token)
            view = VotesViewset.as_view({'post':'create'})
            response = view(request)
            return response.status_code

        code = postvote(self)
        self.assertEqual(code, 201)
        code = postvote(self)
        self.assertEqual(code, 400)




 # # users without a certain number of comments cannot create edit or delete tags
    # # users with a certain number of comments can create edit or delete tags
    # def test_tag_threshold_met(self):
    #     self.fail()

    # def test_tag_threshold_not_met(self):
    #     self.fail()