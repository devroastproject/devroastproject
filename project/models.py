from django.db import models
from django.contrib.auth.models import User


# Model for an individual post
class Project(models.Model):

	# The author, related to auth_user via many-to-one
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
	# The name of the website to be reviewed
    title = models.CharField(max_length=250, help_text="The name of your project.")
	# The git repository for the website
    repo_url = models.CharField(max_length=250, help_text="URL to your project's source code.")
	# The URL where a live version can be viewed
    hosted_url = models.CharField(max_length=250, help_text="Your website's URL.")
	# A summary of the project
    description = models.TextField(help_text="A brief description of your website.")

    def __str__(self):

        return self.title + " by " + self.user 


# Model for comments on projects
class Comment(models.Model):

    # The project the comment belongs to
    post = models.ForeignKey(Project, on_delete=models.DO_NOTHING)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    body = models.TextField(help_text="Enter your comment here.")
    neg_votes = models.IntegerField(help_text="Click to vote in favor of this comment.")
    pos_votes = models.IntegerField(help_text="Click to vote against this comment.")
    # Has a comment been closed or not?
    closed = models.BooleanField(default=False)

    def __str__(self):

        return self.user + self.body 


# Model for comment tags
class Tag(models.Model):

    # One comment can have many tags, one tag can have many comments
    project = models.ManyToManyField(Project)
    comment = models.ManyToManyField(Comment)
    tagname = models.CharField(max_length=200, help_text="Name of your tag")
    description = models.CharField(max_length=500, help_text="A brief description of the tag.")

    def __str__(self):

        return self.tagname



