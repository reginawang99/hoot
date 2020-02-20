from rest_framework import serializers
from .models import *
from tags.models import Tag

class StyleGuideEntrySerializer(serializers.ModelSerializer):
    section = serializers.SlugRelatedField(
        many=True,
        slug_field='name',
        queryset=Section.objects.all(),
        required=False
    )
    tags = serializers.SlugRelatedField(
        many=True,
        slug_field='text',
        queryset=Tag.objects.all(),
        required=False
     )



    class Meta:
        model = StyleGuideEntry
        fields = ('title', 'content', 'created_at', 'updated_at', 'tags', 'section')

class QuickLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuickLink
        fields = ('text',)

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ('text', 'url')

class GuideSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guide
        fields = ('text', 'url')
