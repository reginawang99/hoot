## Quick start
1. git clone 
1. `docker-compose build`
1. `docker-compose up`
1. `docker-compose run web python hoot/manage.py loaddata spreadsheet_data_fixture.json` 
	Note: if this command fails, this could be the model's fields have updated since the json
	has been generated. 
1. In another terminal window, `cd frontend`
1. `npm install`
1. `npm start`
1. go to `localhost:5000` in web browser

## notes for neil
1. Fix data from spreadsheets function   ✓
2. Add recommended search ✓
3. fix url encoding/decoding bugs
3. Keyboard shortcuts

## Small things
1. Improve docker file
2. add .dockerignore
3. add deploy script
4. Search bar + search button style
3. Sometimes "Loading.." does not show up ✓
1. When you have something searched and you switch sections, it doesn't re issue a query ✓
1. Clear section filtering 
