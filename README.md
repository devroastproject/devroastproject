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
    * `DB_HOST`: The Postgres host you are using.
    * `DB_NAME`: The name of the Postgres database that the API is using.
    * `DB_USER`: The database user.
    * `DB_PASS`: The password for the database user.
    * `DB_PORT`: The port that your Postgres server is listening on. Default is 5432.
    