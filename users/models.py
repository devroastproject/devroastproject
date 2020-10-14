from django.db import models
from django.contrib.auth.models import User


# Model for user profile info
class Profile(models.Model):

    # Define pronoun options for users
    PRONOUNS = (
        ("Male", "He/Him"),
        ("Female", "She/Her"),
        ("NB", "They/Them"),
    )

    user = models.OneToOneField(User, on_delete=models.DO_NOTHING)
    role = models.CharField(max_length=255, help_text="Web Developer, Data Engineer, etc")
    location = models.CharField(max_length=255, help_text="What city your located in")
    pronoun = models.CharField(max_length=10, choices=PRONOUNS)

    def __str__(self):

        return self.username
