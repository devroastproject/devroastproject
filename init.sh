#!/bin/bash
# python manage.py migrate                  # Apply database migrations
python manage.py collectstatic --noinput  # Collect static files
gunicorn --bind 0.0.0.0:8000 devroast.wsgi