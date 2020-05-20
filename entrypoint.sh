#!/bin/bash
set -e #stops execution of script if failure occurs somewhere

python wait_for_postgres.py

./hoot/manage.py collectstatic --noinput
./hoot/manage.py migrate
./hoot/manage.py loaddata spreadsheet_data_fixture.json
echo "Collected, migrated and loaded."

cd hoot
gunicorn --bind 0.0.0.0:5000 --access-logfile - hoot.wsgi:application --daemon -R #change django_project to folder name
cd ..
echo "Backend initialized."

exec "$@"