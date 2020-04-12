from django.urls import path, include
from . import views

urlpatterns = [
	# searching
    path('search/', views.search),
    path('recommended-search-results', views.recommended_search_results),

    # retrieving one style guide entry
    path('entry/<str:name>', views.get_single_entry),

    # retrieving general information
    path('sections/', views.get_all_sections),
    path('quick-links/', views.get_all_quick_links),
    path('guides/', views.get_all_guides)
]
