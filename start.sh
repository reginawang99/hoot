#!/bin/sh
set -e

python caw/manage.py migrate

exec "$@"
