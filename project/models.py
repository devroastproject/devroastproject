from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields import related


# Model for an individual post
class Project(models.Model):

	# The author, related to auth_user via many-to-one
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
	# The name of the website to be reviewed
    title = models.CharField(max_length=250, help_text="The name of your project.")
	# The git repository for the website
    repo_url = models.CharField(max_length=250, blank=True, help_text="URL to your project's source code.")
	# The URL where a live version can be viewed
    hosted_url = models.CharField(max_length=250, blank=True, help_text="Your website's URL.")
	# A summary of the project
    description = models.TextField(help_text="A brief description of your website.")

    def __str__(self):

        return self.title + " by " + str(self.user) 


# Model for comments on projects
class Comment(models.Model):

    # The project the comment belongs to
    post = models.ForeignKey(Project, related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    prompt = models.ForeignKey('self', on_delete=models.DO_NOTHING, related_name='replies', blank=True, null=True)
    body = models.TextField(help_text="Enter your comment here.")
    # Has a comment been closed or not?
    closed = models.BooleanField(default=False)

    def __str__(self):

        return  f'{self.user} wrote {self.body}' 


# Model for comment tags
class Tag(models.Model):

    # One comment can have many tags, one tag can have many comments
    project = models.ManyToManyField(Project, blank=True)
    comment = models.ManyToManyField(Comment, blank=True)
    tagname = models.CharField(max_length=200, help_text="Name of your tag")
    description = models.CharField(max_length=500, help_text="A brief description of the tag.")

    def __str__(self):

        return self.tagname


class Vote(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    positive = models.BooleanField()

    class Meta:
        unique_together = ('user', 'comment',)

    def __str__(self):

        return '+1' if self.positive else '-1'