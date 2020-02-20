from rest_framework.decorators import api_view
from rest_framework.response import Response

# alright searching is a way of life in this style guide
# so we are gonna summon the T R I G R A M S
# https://docs.djangoproject.com/en/3.0/ref/contrib/postgres/search/
from django.contrib.postgres.search import TrigramSimilarity, TrigramDistance
from .models import StyleGuideEntry, Section
from .serializers import StyleGuideEntrySerializer
from rest_framework.renderers import JSONRenderer

from itertools import chain

"""
This method will take a query:string and return a json object
containing all the search results, paginated
"""
@api_view(http_method_names=['POST'])
def search(request):
	print(request.data)
	query = request.data.get("query", None)
	if query is None:
		return Response(status=400)

	# actual queries TODO: order and sort them by relavance
	title_results = StyleGuideEntry.objects.annotate(
		similarity=TrigramSimilarity('title', query),
	).filter(similarity__gt=0.4).order_by('-similarity') 
	# since trigrams are bad at startswith queries when query is much smaller than field
	title_results = list(chain(title_results, StyleGuideEntry.objects.filter(title__startswith=query)))

	body_results = StyleGuideEntry.objects.filter(content__search=query)

	tag_results = StyleGuideEntry.objects.annotate(
		similarity=TrigramSimilarity('tags__text', query),
	).filter(similarity__gt=0.6).order_by('-similarity')
	# since trigrams are bad at startswith queries when query is much smaller than field
	tag_results = list(chain(tag_results, StyleGuideEntry.objects.filter(tags__text__startswith=query)))

	# if it matches an exact section, we can assume they were searching for that
	# if they didn't type it exactly, then we can't assume that. The only exception is 
	# A&E, which is also called arts. For now, we will not handle that special case, but in the future
	# we could be adding alternate name field to Section
	query_in_section_format = query.lower()
	query_in_section_format = query_in_section_format[0].upper() + query_in_section_format[1:]
	section_results = StyleGuideEntry.objects.filter(section__name=query_in_section_format)

	# results
	results = list(chain(title_results, body_results, tag_results, section_results))
	serializer = StyleGuideEntrySerializer(results, many=True)
	return Response(serializer.data)