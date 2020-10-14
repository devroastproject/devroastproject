from django.db import models
from django.contrib.auth.models import User


# Model for user profile info
class Profile(models.Model):

    # Define pronoun options for users
    PRONOUNS = (
        ("He/Him", "Male"),
        ("She/Her", "Female"),
        ("They/Them", "NB"),
    )

    user = models.OneToOneField(User)
    username = models.CharField(length=255, help_text="Your username", unique=True)
    role = models.CharField(length=255, help_text="Web Developer, Data Engineer, etc")
    location = models.CharField(length=255, help_text="What city your located in")
    pronoun = models.CharField(length=6, choices=PRONOUNS)

    def __str__(self):

        return self.username
