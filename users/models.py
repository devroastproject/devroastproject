from django.db import models
from django.contrib.auth.models import User


# Model for user profile info
class Profile(models.Model):

    # Define pronoun options for users
    PRONOUN_OPTIONS = (
        ("He/Him", "He/Him"),
        ("She/Her", "She/Her"),
        ("They/Them", "They/Them"),
    )

    user = models.OneToOneField(User, on_delete=models.DO_NOTHING)
    role = models.CharField(max_length=255, help_text="Web Developer, Data Engineer, etc")
    location = models.CharField(max_length=255, help_text="What city your located in")
    pronouns = models.CharField(max_length=10, choices=PRONOUN_OPTIONS)
    about = models.TextField(default="Personal summary.", help_text="A little bit about yourself.")

    def __str__(self):

        return self.username
