#!/bin/bash
python manage.py collectstatic --noinput  # Collect static files
python manage.py runserver 0.0.0.0:8000