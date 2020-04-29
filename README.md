## Quick start
1. git clone 
1. `docker-compose build`
1. `docker-compose up`
1. Open another terminal window.
1. `docker-compose run web python hoot/manage.py loaddata spreadsheet_data_fixture.json` 
	Note: if this command fails, this could be the model's fields have updated since the json
	has been generated. 
1. `cd frontend`
1. `npm install`
1. `npm start`
1. go to `localhost:5000` in web browser

## notes for neil
1. Fix data from spreadsheets function   ✓
2. Add recommended search ✓
3. fix url encoding/decoding bugs ✓?
3. Keyboard shortcuts (focus search, clear search) ✓
4. nginx deployment strategy ✓
1. Logging
1. logging stats

## Small things
1. Improve docker file
2. add .dockerignore
3. add deploy script
4. Search bar + search button style
3. Sometimes "Loading.." does not show up ✓
1. When you have something searched and you switch sections, it doesn't re issue a query ✓
1. When you paste a link into the browser with a query, it doesn't fill in the search text field with the query from the url
1. Clear section filtering 
1. Don't have 2 sources of truth for section (url and useState in App.js)
1. Massive housekeeping of App.js:
  1. Keyboard shortcuts have 2 places of duplicate code
  1. put helper functions outside
  2. 