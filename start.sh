#!/bin/sh
set -e

python hoot/manage.py migrate

exec "$@"
