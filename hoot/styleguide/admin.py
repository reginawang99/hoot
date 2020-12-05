from django.contrib import admin
from .models import StyleGuideEntry, Section, QuickLink, Guide
from markdownx.admin import MarkdownxModelAdmin



@admin.register(StyleGuideEntry)
class StyleGuideAdmin(MarkdownxModelAdmin):
	list_display = ('title', 'created_at', 'updated_at')
	filter_horizontal=("tags",)
	ordering = ('title',)


@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
	ordering = ('name',)


@admin.register(QuickLink, Guide)
class QuickLinkGuideAdmin(admin.ModelAdmin):
	ordering = ('text',)


