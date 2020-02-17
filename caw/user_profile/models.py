from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager, PermissionsMixin

class User(AbstractUser):
    objects = UserManager()
    def __str__(self):
        return self.username

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

