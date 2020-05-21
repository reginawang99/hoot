from rest_framework import serializers
from .models import *


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ('id', 'name')

class GuideSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guide
        fields = ('text', 'url')

class QuickLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuickLink
        fields = ('text', 'url') 

class StyleGuideEntrySerializer(serializers.ModelSerializer):
    section = SectionSerializer(many=True, required=False)


    class Meta:
        model = StyleGuideEntry
        fields = ('title', 'content', 'created_at', 'updated_at', 'section')



