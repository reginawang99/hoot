from django.db import models
from django.conf import settings
from tags.models import Tag

# rich text editor
from tinymce.models import HTMLField
from markdownx.models import MarkdownxField

# alright searching is a way of life in this style guide
# so we are gonna summon the T R I G R A M S
# https://docs.djangoproject.com/en/2.2/ref/contrib/postgres/lookups/

class Section(models.Model):
	name = models.CharField(max_length=50, db_index=True)

	def __str__(self):
		return self.name

class StyleGuideEntry(models.Model):
	ARTS_AND_ENTERTAINMENT, OPINION, NEWS, SPORTS = "AE", "OP", "NW", "SP"
	SECTION_CHOICES = [
		(ARTS_AND_ENTERTAINMENT, "A&E"),
		(OPINION, "Opinion"),
		(NEWS, "News"),
		(SPORTS, "SPORTS")
	]
	tags = models.ManyToManyField(Tag, db_index=True) #can we index this? I guess we can
	title = models.CharField(max_length=75, db_index=True) # definitely index this because we will search a looot
	# see https://django-tinymce.readthedocs.io/en/latest/usage.html#external-link-and-image-lists
	content = MarkdownxField(blank=True)
	content_tinymc = HTMLField(blank=True)
	section = models.ManyToManyField(Section, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.title


	class Meta:
		verbose_name = 'Style Guide Entry'
		verbose_name_plural = 'Style Guide Entries'