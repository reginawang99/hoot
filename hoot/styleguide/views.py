from rest_framework.decorators import api_view
from rest_framework.response import Response

# alright searching is a way of life in this style guide
# so we are gonna summon the T R I G R A M S
# https://docs.djangoproject.com/en/3.0/ref/contrib/postgres/search/
from django.contrib.postgres.search import TrigramSimilarity, TrigramDistance
from django.shortcuts import get_object_or_404
from .models import StyleGuideEntry, Section, Guide, QuickLink
from .serializers import StyleGuideEntrySerializer, SectionSerializer, QuickLinkSerializer, GuideSerializer

from rest_framework.renderers import JSONRenderer
from rest_framework import viewsets

from itertools import chain


# some code which can be used for recommended results

# if it matches an exact section, we can assume they were searching for that
# if they didn't type it exactly, then we can't assume that. The only exception is 
# A&E, which is also called arts. For now, we will not handle that special case, but in the future
# we could be adding alternate name field to Section
# query_in_section_format = query.lower()
# query_in_section_format = query_in_section_format[0].upper() + query_in_section_format[1:]
# section_results = StyleGuideEntry.objects.filter(section__name=query_in_section_format)

# https://docs.djangoproject.com/en/3.0/ref/models/querysets/#field-lookups
def get_title_results(query, section_obj=None):
	if section_obj:
		title_results = StyleGuideEntry.objects.annotate(
			similarity=TrigramSimilarity('title', query),
		).filter(section=section_obj).filter(similarity__gt=0.4).order_by('-similarity') 

		# since trigrams are bad at startswith queries when query is much smaller than field
		# possibly add icontains
		return list(chain(
			title_results, 
			StyleGuideEntry.objects.filter(section=section_obj).filter(title__istartswith=query)
			)
		)
	else:
		title_results = StyleGuideEntry.objects.annotate(
			similarity=TrigramSimilarity('title', query),
		).filter(similarity__gt=0.4).order_by('-similarity') 

		# since trigrams are bad at startswith queries when query is much smaller than field
		# possibly add icontains
		return list(chain(title_results, StyleGuideEntry.objects.filter(title__istartswith=query)))

def get_content_results(query, section_obj=None):
	if section_obj:
		return StyleGuideEntry.objects.filter(section=section_obj).filter(content__search=query)
	return StyleGuideEntry.objects.filter(content__search=query)

def get_tag_results(query):
	tag_results = StyleGuideEntry.objects.annotate(
		similarity=TrigramSimilarity('tags__text', query),
	).filter(similarity__gt=0.6).order_by('-similarity')
	# since trigrams are bad at startswith queries when query is much smaller than field
	# possible add icontains
	tag_results = list(chain(tag_results, StyleGuideEntry.objects.filter(tags__text__istartswith=query)))
	return tag_results

"""
This method will take a query:string and return a json object
containing all the search results, not paginated
TODO: handle sections
"""
@api_view(http_method_names=['GET'])
def search(request):
	query = request.GET.get("query", None)
	section = request.GET.get("section", None)
	section_obj = None

	if query is None or query == "":
		return Response("Must provide query", status=400)

	# sections optionally filters by section name. 
	if section is not None:
		section_obj = Section.objects.filter(name=section).first()
		if section_obj is None:
			return Response("Invalid section '" + section + "'", status=400)

	
	title_results = get_title_results(query, section_obj)
	body_results = get_content_results(query, section_obj)


	# results
	results = list(chain(title_results, body_results))
	serializer = StyleGuideEntrySerializer(results, many=True)
	return Response(serializer.data)

@api_view(http_method_names=['GET'])
def recommended_search_results(request):
	# in this method, we can perform more intensive searches. for example, we will do 
	query = request.GET.get("query", None)
	if query is None or query == "":
		return Response("Must provide query", status=400)

	results = get_tag_results(query)

	serializer = StyleGuideEntrySerializer(results, many=True)
	return Response(serializer.data)



@api_view(http_method_names=['GET'])
def get_all_sections(request):
	serializer = SectionSerializer(Section.objects.all(), many=True)
	return Response(serializer.data)

@api_view(http_method_names=['GET'])
def get_all_quick_links(request):
	serializer = QuickLinkSerializer(QuickLink.objects.all(), many=True)
	return Response(serializer.data)

@api_view(http_method_names=['GET'])
def get_all_guides(request):
	serializer = GuideSerializer(Guide.objects.all(), many=True)
	return Response(serializer.data)
   
@api_view(http_method_names=['GET'])
def get_single_entry(request, name):
	obj = StyleGuideEntry.objects.filter(title=name)
	if len(obj) != 1:
		return Response(status=404)
	serializer = StyleGuideEntrySerializer(obj[0])
	return Response(serializer.data)