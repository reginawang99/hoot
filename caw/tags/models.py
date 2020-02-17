from django.db import models
from django.conf import settings

class Tag(models.Model):
	text = models.CharField(max_length=50)