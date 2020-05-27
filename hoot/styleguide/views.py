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
class OrderedDuplicateFreeList:

	def __init__(self):
		self.accum = []
		self.accum_set = set(self.accum)

	"""
	additional_elems can be any iterable (list, queryset, OrderedDuplicateFreeList)
	"""
	def append(self, additional_elems):
		for elem in additional_elems:
			if elem not in self.accum_set:
				self.accum.append(elem)
				self.accum_set.add(elem)

	def data(self):
		return self.accum


	# to allow iteration on this object
	# this is so append's for loop works even if 
	# additional_elems is of type OrderedDuplicateFreeList
	def __getitem__(self, key):
		return self.accum[key]

	def __len__(self):
		return len(self.accum)


# https://docs.djangoproject.com/en/3.0/ref/models/querysets/#field-lookups
def get_title_results(query, sections=None):
	filter_keyword_args = {}
	if sections is not None:
		filter_keyword_args["sections__in"] = [section.id for section in sections]


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

	results = OrderedDuplicateFreeList()
	results.append(trigram_results)
	results.append(starts_with_results)
	return results


def get_content_results(query, sections=None):
	filter_keyword_args = {}
	if sections is not None:
		filter_keyword_args["sections__in"] = [section.id for section in sections]

	return StyleGuideEntry.objects.filter(**filter_keyword_args).filter(content__search=query)

def get_tag_results(query):
	trigram_annotated_qs = StyleGuideEntry.objects.annotate(
		similarity=TrigramSimilarity('tags__text', query),
	)

	trigram_results = trigram_annotated_qs.filter(similarity__gt=0.6)
	# since trigrams are bad at startswith queries when query is much smaller than field
	# possible add icontains
	starts_with_results = StyleGuideEntry.objects.filter(tags__text__istartswith=query)

	
	results = OrderedDuplicateFreeList()
	results.append(trigram_results)
	results.append(starts_with_results)
	return results

"""
return a json object containing all the search results, not paginated
"""
@api_view(http_method_names=['GET'])
def search(request):
	query = request.GET.get("query", None)
	section = request.GET.get("section", None)

	# for future hoot, we might support filter by multiple sections
	# thats why this is either None or an []
	sections = None

	# optional filter by section 
	if section is not None:
		section_obj = Section.objects.filter(name=section).first()
		if section_obj is None:
			return Response("Invalid section '" + section + "'", status=400)
		sections = [section_obj]

	if query is None or query == "":
		# this means that they want all results
		results = []
		if section:
			results = StyleGuideEntry.objects.filter(sections__in=[section_obj.id])
		else:
			results = StyleGuideEntry.objects.all()
		serializer = StyleGuideEntrySerializer(results, many=True)
		return Response(serializer.data)


	# search by title and body
	accum = get_title_results(query, sections)
	accum.append(get_content_results(query, sections))


	serializer = StyleGuideEntrySerializer(accum.data(), many=True)
	return Response(serializer.data)

@api_view(http_method_names=['GET'])
def recommended_search_results(request):
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

	# tags search 
	accum = get_tag_results(query)
	
	if section_obj is not None: # if the passed a section
		accum.append( get_title_results(query, None))
		accum.append( get_content_results(query, None))
		

	serializer = StyleGuideEntrySerializer(accum.data(), many=True)
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
	if len(obj) == 0:
		return Response(status=404)
	elif len(obj) > 1:
		print("BIG OH UH")
	serializer = StyleGuideEntrySerializer(obj[0])
	return Response(serializer.data)