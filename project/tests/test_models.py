from django.test import TestCase
from django.contrib.auth.models import User
from project.models import Comment, Project, Tag


class ProjectsModelTests(TestCase):

    def setUp(self):

        # Create a test user 
        self.test_user = User.objects.create_user(
            id=1,
            first_name="Homer",
            last_name="Simpson",
            username="hsimpson", 
            email="hsimpson@springfieldnuclear.com", 
            password="d'oh!",
        )

        

        # Create a test project
        self.test_project = Project.objects.create(
            id=1,
            user=User.objects.get(id=1),
            title="Homer's Man Cave",
            repo_url="https://github.com/hsimpson/mancave",
            hosted_url="https://homersmancave.net",
            description="Mmmmmm.....beer."
        )

        # Create a test comment
        self.test_comment = Comment.objects.create(
            id=1,
            post = self.test_project,
            user = User.objects.get(id=1),
            body = "D'oh!",
            closed=False
        )

        # Create a test tag
        self.test_tag = Tag.objects.create(
            id=1,
            tagname="React",
            description="React Tag"
        )
        self.test_tag.project.add(self.test_project)
        self.test_tag.comment.add(self.test_comment)

    def test_project_creation(self):

        project = self.test_project

        self.assertEqual(project.title, "Homer's Man Cave")
        self.assertEqual(project.repo_url, "https://github.com/hsimpson/mancave")
        self.assertEqual(project.hosted_url, "https://homersmancave.net")
        self.assertEqual(project.description, "Mmmmmm.....beer.")

    def test_comment_creation(self):

        test_comment = self.test_comment

        self.assertEqual(test_comment.body, "D'oh!")
        self.assertEqual(test_comment.closed, False)

    def test_tag_creation(self):

        test_tag = self.test_tag

        self.assertEqual(test_tag.tagname, "React")
        self.assertEqual(test_tag.description, "React Tag")
