from django.db import models
from django.contrib.auth.models import User


# Model for an individual post
class Project(models.Model):

	# The author, related to auth_user via many-to-one
    user = models.ForeignKey(User)
	# The name of the website to be reviewed
    title = models.CharField(max_length=250, help_text="The name of your project.")
	# The git repository for the website
    repo_url = models.CharField(max_length=250, help_text="URL to your project's source code.")
	# The URL where a live version can be viewed
    hosted_url = models.CharField(mxa_length=250, help_text="Your website's URL.")
	# A summary of the project
    description = models.TextField(help_text="A brief description of your website.")

    def __str__(self):

        return self.title + " by " + self.user 
