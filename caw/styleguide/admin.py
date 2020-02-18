from django.contrib import admin
from .models import StyleGuideEntry
from markdownx.admin import MarkdownxModelAdmin

admin.site.register(StyleGuideEntry, MarkdownxModelAdmin) #MardownxModelAdmin so it renders properly
