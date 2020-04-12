
# Originally, all the style guide entries were here:
# https://docs.google.com/spreadsheets/d/1_2S7ZACXiWc6iKx9EMTbTW7WpDj60RSRLehb-ELgWn0/edit?ts=5d93af4f&pli=1#gid=0
# so I downloaded it as a csv file and wrote this script to create a fixture with it.

import csv
import sys
import json
import re
from markdownify import markdownify as md

styleguideentry_pk = 1

tag_table = {}
section_table = {}

def get_tags(tags, entries):
    t = re.split("\s*,\s*",tags)
    out = []
    for tag in t:
        
        if tag.lower() == "admission": tag = "admissions"
        if tag == "" or tag == " ":
            continue # skip

        if tag in tag_table:
            out.append(tag_table[tag])
        else:
            pk = len(tag_table) +1
            tag_table[tag] = pk
            entries.append( {
                "model": "tags.tag",
                "pk": pk,
                "fields": {
                  "text": tag
                }
            })
            out.append(pk)
    return out

def get_sections(sections, entries):
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

        if section in section_table:
            out.append(section_table[section])
        else:
            pk = len(section_table) + 1
            section_table[section] = pk
            entries.append( {
                "model": "styleguide.section",
                "pk": pk,
                "fields": {
                  "name": section
                }
            })
            out.append(pk)
    return out

def process_row(row, entries):
    term,content,tags,sections = row
    global styleguideentry_pk
    styleguideentry_pk += 1
    entries.append({
        "model": "styleguide.styleguideentry",
        "pk": styleguideentry_pk,
        "fields": {
          "title": term,
          "content": md(content),
          "created_at": "2020-02-17T23:29:10.695Z",
          "updated_at": "2020-02-18T23:24:32.299Z",
          "tags": get_tags(tags, entries),
          "section": get_sections(sections, entries)
        }
      })

if __name__ == "__main__": 
    if len(sys.argv) < 2:
        print("Usage: python {} file.csv".format(sys.argv[0]))
        exit(1)

    entries = []
    with open(sys.argv[1], 'rt') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', quotechar='\"')
        flag = False
        for row in reader:
            # skip first line
            if not flag:
                flag = True
                continue
            else:
                process_row(row, entries)

        print(json.dumps(entries, indent=4))

