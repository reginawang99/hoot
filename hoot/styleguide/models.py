from django.db import models
from django.conf import settings
from tags.models import Tag

# markdown field
from markdownx.models import MarkdownxField



class Section(models.Model):
	name = models.CharField(max_length=50, db_index=True)

	def __str__(self):
		return self.name

class StyleGuideEntry(models.Model):
	tags = models.ManyToManyField(Tag, db_index=True) #can we index this? I guess we can
	title = models.CharField(max_length=75, db_index=True, unique=True) # definitely index this because we will search a looot
	content = MarkdownxField(blank=True)
	sections = models.ManyToManyField(Section, blank=True, db_index=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.title


	class Meta:
		verbose_name = 'Style Guide Entry'
		verbose_name_plural = 'Style Guide Entries'

class QuickLink(models.Model):
	text = models.CharField(max_length=300)
	url = models.URLField()

	def __str__(self):
		return self.text

class Guide(models.Model):
	text = models.CharField(max_length=300)
	url = models.URLField()

	def __str__(self):
		return self.text