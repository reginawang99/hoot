from rest_framework.decorators import api_view
from rest_framework.response import Response

# alright searching is a way of life in this style guide
# so we are gonna summon the (T (R) (I) (G) (R) (A) (M) S)
# https://docs.djangoproject.com/en/3.0/ref/contrib/postgres/search/
from django.contrib.postgres.search import TrigramSimilarity, TrigramDistance
from django.shortcuts import get_object_or_404
from .models import StyleGuideEntry, Section, Guide, QuickLink
from .serializers import StyleGuideEntrySerializer, SectionSerializer, QuickLinkSerializer, GuideSerializer

from rest_framework.renderers import JSONRenderer
from rest_framework import viewsets

from itertools import chain



"""
combines two query sets, removes duplicates and preserves original ordering. Example
accum = []
accum_set = set(accum)
append_querysets(accum, accum_set, [8, 7, 6, 5, 4])
print(accum) => [8, 7, 6, 5, 4] (notice it preserves ordering)
append_querysets(accum, accum_set, [1,2,3,4])
print(accum) =< [8, 7, 6, 5, 4, 1, 2, 3] (removed duplicates but maintained order of original lists.)

The idea of this is that each query is sorted by how much it matches. we want to keep this information
However, when we combine queries, there can be duplicates. So we need to remove duplicates
"""
def append_querysets(accum, accum_set, additional_elems):
	for elem in additional_elems:
		if elem not in accum_set:
			accum.append(elem)
			accum_set.add(elem)

# if it matches an exact section, we can assume they were searching for that
# if they didn't type it exactly, then we can't assume that. The only exception is 
# A&E, which is also called arts. For now, we will not handle that special case, but in the future
# we could be adding alternate name field to Section
# query_in_section_format = query.lower()
# query_in_section_format = query_in_section_format[0].upper() + query_in_section_format[1:]
# section_results = StyleGuideEntry.objects.filter(section__name=query_in_section_format)

# https://docs.djangoproject.com/en/3.0/ref/models/querysets/#field-lookups
def get_title_results(query, section_obj=None):
	filter_keyword_args = {}
	if section_obj:
		filter_keyword_args["section"] = section_obj


	trigram_results = StyleGuideEntry.objects.annotate(
		similarity=TrigramSimilarity('title', query),
	).filter(
		**filter_keyword_args
	).filter(
		similarity__gt=0.4
	).order_by('-similarity') 

	starts_with_results = StyleGuideEntry.objects.filter(
		**filter_keyword_args
	).filter(
		title__istartswith=query
	)

	accum = []
	accum_set = set()
	append_querysets(accum, accum_set, trigram_results)
	append_querysets(accum, accum_set, starts_with_results)

	return accum


def get_content_results(query, section_obj=None):
	filter_keyword_args = {}
	if section_obj:
		filter_keyword_args["section"] = section_obj

	return StyleGuideEntry.objects.filter(**filter_keyword_args).filter(content__search=query)

def get_tag_results(query):
	trigram_annotated_qs = StyleGuideEntry.objects.annotate(
		similarity=TrigramSimilarity('tags__name', query),
	)

	trigram_results = trigram_annotated_qs.filter(similarity__gt=0.6)
	# since trigrams are bad at startswith queries when query is much smaller than field
	# possible add icontains
	starts_with_results = StyleGuideEntry.objects.filter(tags__name__istartswith=query)

	accum = []
	accum_set = set()
	append_querysets(accum, accum_set, trigram_results)
	append_querysets(accum, accum_set, starts_with_results)
	
	return accum

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

	# sections optionally filters by section name. 
	if section is not None:
		section_obj = Section.objects.filter(name=section).first()
		if section_obj is None:
			return Response("Invalid section '" + section + "'", status=400)

	if query is None or query == "":
		# this means that they want all results
		results = []
		if section:
			results = StyleGuideEntry.objects.filter(section=section_obj)
		else:
			results = StyleGuideEntry.objects.all()
		serializer = StyleGuideEntrySerializer(results, many=True)
		return Response(serializer.data)


	
	title_results = get_title_results(query, section_obj)
	body_results = get_content_results(query, section_obj)


	# results
	results = title_results
	append_querysets(results, set(results), body_results)
	serializer = StyleGuideEntrySerializer(results, many=True)
	return Response(serializer.data)

@api_view(http_method_names=['GET'])
def recommended_search_results(request):
	# in this endpoint, we can perform more intensive searches. for example, we will do 
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

	accum = get_tag_results(query)
	accum_set = set(accum)
	
	if section_obj: # if the passed a section
		title_results = get_title_results(query, None)
		append_querysets(accum, accum_set, title_results)
		body_results = get_content_results(query, None)
		append_querysets(accum, accum_set, body_results)
		

	serializer = StyleGuideEntrySerializer(accum, many=True)
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
	print(name)
	if len(obj) != 1:
		return Response(status=404)
	serializer = StyleGuideEntrySerializer(obj[0])
	return Response(serializer.data)