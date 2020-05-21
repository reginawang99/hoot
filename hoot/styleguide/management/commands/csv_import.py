from django.core.management.base import BaseCommand, CommandError
from ...models import *
import csv
import sys
import json
import re
from markdownify import markdownify as md
import argparse


class Command(BaseCommand):
	help = 'Imports entries from a csv file'

	def add_arguments(self, parser):
		parser.add_argument('file', type=argparse.FileType('rt'))


	def handle(self, *args, **options):
		reader = csv.reader(options["file"], delimiter=',', quotechar='\"')
		flag = False
		self.stdout.write('Starting...\n')
		count = 0
		for row in reader:
			# skip first line
			if not flag:
				flag = True
				continue
			else:
				self.process_row(row)
				count += 1
		self.stdout.write(self.style.SUCCESS('Successfully imported %s entries' % count))

	def process_row(self, row):
		term, content, tags, sections = row
		entry = StyleGuideEntry.objects.create(
			title=term,
			content=md(content),
			# we will do tags separately
			# we will do sections separately
		)
		tagStrings = self.get_tags(tags)
		for tag in tagStrings:
			entry.tags.add(tag)
		sectionObjs = self.get_sections(sections)
		for sectionObj in sectionObjs:
			entry.sections.add(sectionObj)


	def get_sections(self, sections):
		t = re.split("\s*,\s*",sections)
		if "news opinion" in t:
			t.remove("news opinion")
			t.append("news")
			t.append("opinion")
		out = []
		for section in t:
			section = section.lower()
			if section == "" or section == " ":
				continue # skip
			if section == "a&e" or section == "arts":
				section = "A&E"


			section = section[0].upper() + section[1:]

			obj, _ = Section.objects.get_or_create(name=section) 
			out.append(obj)

		return out

	def get_tags(self, tags):
		t = re.split("\s*,\s*",tags)
		out = []
		for tag in t:
			
			if tag.lower() == "admission": tag = "admissions"
			if tag == "" or tag == " ":
				continue # skip

			out.append(tag)
		return out