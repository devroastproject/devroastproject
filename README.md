# About

Devroast is an online platform where developers can upload projects that they are working on, and get feedback from fellow developers.

## Local Setup

- Fork and clone the repository 
- Create a virutalenv by running `python -m venv env`
- Activate virtualenv with `source env/bin/activate` on Unix-like systems, and `env/scripts/activate` on Windows.
- Create a `.env` file in the `devroast` directory, and add the following environment variables:
    * `DEBUG`: Set to `True`
    * `SECRET_KEY`: A random, 60-character, alphanumeric string.
    * `TIMEZONE`: A valid `pytz` time zone.