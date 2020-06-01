from rest_framework import serializers
from .models import *
from tags.models import Tag

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
    tags = serializers.SlugRelatedField(
        many=True,
        slug_field='text',
        queryset=Tag.objects.all(),
        required=False
     )


    class Meta:
        model = StyleGuideEntry
        fields = ('id','title', 'content', 'created_at', 'updated_at', 'tags', 'section')



