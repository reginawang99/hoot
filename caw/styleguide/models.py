from django.db import models
from django.conf import settings
from tags.models import Tag

# alright searching is a way of life in this style guide
# so we are gonna summon the T R I G R A M S
# https://docs.djangoproject.com/en/2.2/ref/contrib/postgres/lookups/

class StyleGuideEntry(models.Model):
	ARTS_AND_ENTERTAINMENT, OPINION, NEWS, SPORTS= "AE", "OP", "NW", "SP"
	SECTION_CHOICES = [
		(ARTS_AND_ENTERTAINMENT, "A&E"),
		(OPINION, "Opinion"),
		(NEWS, "News"),
		(SPORTS, "SPORTS")
	]
	tags = models.ManyToManyField(Tag, db_index=True) #can we index this? TODO
	title = models.CharField(max_length=75, db_index=True) # definitely index this because we will search a looot
	section = models.CharField(max_length=2, choices=SECTION_CHOICES, default=NEWS)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)