from django.contrib import admin
from .models import StyleGuideEntry, Section
from markdownx.admin import MarkdownxModelAdmin

admin.site.register(StyleGuideEntry, MarkdownxModelAdmin) #MardownxModelAdmin so it renders properly
admin.site.register(Section)