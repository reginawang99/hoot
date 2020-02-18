
# Originally, all the style guide entries were here:
# https://docs.google.com/spreadsheets/d/1_2S7ZACXiWc6iKx9EMTbTW7WpDj60RSRLehb-ELgWn0/edit?ts=5d93af4f&pli=1#gid=0
# so I downloaded it as a csv file and wrote this script to create a fixture with it.

import csv
import sys

def process_row(row):
	print(', '.join(row))

if __name__ == "__main__": 
	if len(sys.argv) < 2:
		print("Usage: python {} file.csv".format(sys.argv[0]))
		exit(1)

	with open(sys.argv[1], 'rb') as csvfile:
	    reader = csv.reader(csvfile, delimiter=' ', quotechar='|')
	    for row in reader:
	        process_row(row)