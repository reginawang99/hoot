from django.contrib import admin
from .models import StyleGuideEntry, Section, QuickLink, Guide
from markdownx.admin import MarkdownxModelAdmin

class StyleGuideAdmin(MarkdownxModelAdmin):
	filter_horizontal=("tags",)
	list_display=("title",)
	ordering = ('title',)

admin.site.register(StyleGuideEntry, StyleGuideAdmin) #extends MardownxModelAdmin so it renders properly
admin.site.register(Section)
admin.site.register(QuickLink)
admin.site.register(Guide)