# devroastproject

# Local Setup

- Fork and clone the repository
- Create a virutalenv by running `python -m venv env`
- Activate virtualenv with `source env/bin/activate` on Unix-like systems, and `env/scripts/activate` on Windows.
- Create a `.env` file in the `devroast` directory, and add the following environment variables:
    * `DEBUG`: Set to `True`
    * `SECRET_KEY`: A random, 60-character, alphanumeric string.
    * `TIMEZONE`: A valid `pytz` time zone.
    * `POSTGRES_HOST`: The Postgres host you are using.
    * `POSTGRES_PASSWORD`: The name of the Postgres database that the API is using.
    * `POSTGRES_USER`: The database user.
    * `POSTGRES_PASSWORD`: The password for the database user.
    * `POSTGRES_PORT`: The port that your Postgres server is listening on. Default is 5432.


# About

devroast.com is a message board where one can ask for feedback on their own website, i.e. for their website to be “roasted” ... We hope that this will be a fun experience, and participants will be “roasted gently.”

This website will be built by a group of programmers under the direction and coaching of Denise Mauldin and other mentors from the PuPPy community (Puget Sound Programming Python.)

The landing page should look like a message board where anyone can see the most recent posts of those asking for feedback on their websites as well as the responses from other users.

To submit a request for feedback or comment on a post, a user will first create an account via a form that will ask for a user name, password, and email. The username and email will be verified as original. The email will be verified as belonging to the user.

To ask for feedback a verified user can click on an icon, which initializes a form, then fill out the form with the website address and any specific questions. Each question can include a tag that the respondents can click on to respond to.

There will be two basic ways to comment. First, from within the original post, a verified user can click on the tag associated with a specific question. This will initialize a comment form with a reference to the tag and an open field for whatever the commentator wants to say. A second way to comment is to click an icon that will initialize a a blank field to write a comment. In either case the commentator can manually add an @ tag to reference a question. Multiple questions can be referenced within one comment.

Any comment can be commented on using the same logic.

Any verified user will be able to vote a comment up or down.

Any user will be the able to sort comments by 1. most popular, 2. all in sequential order or 3. by @ tag in sequential order.

# Docker - Django

To start the Django server via docker, run:

docker build .

This will output an image ID at the end of the 'Successfully built' result
ex: Successfully built e42196958884

Run a container from the image using:

docker run -p 8000:8000 --env-file env.example <IMAGE_ID>

ex: docker run -p 8000:8000 --env-file env.example e42196958884

The -p flag maps the port from your local machine to the port inside the container
Since the gunicorn runs on --bind 0.0.0.0:8000 then the interior port is 8000
You can map any port on your machine to that port, but this uses 8000 for convenience

Navigate to http://localhost:8000 should show the Django start page

# Docker - React

To start the React server via docker, run:

docker build -f Dockerfile.react .

This will output an image ID at the end of the 'Successfully built' result

Run a container from the image using

docker run -p 8001:8000 --env-file env.example <IMAGE_ID>


# Docker compose

The docker compose file is configured to run the Django container,
the React container, a Postgres container, and a Redis container.

To run via docker compose:

cp example.env devroast/.env
docker-compose build
docker-compose up

To see what is running:

docker-compose ps

To run in a detached mode:

docker-compose up -d

When detached, to see the logs for the containers

docker-compose logs

to see just the specific container, use the name from teh
docker-compose.yml file

docker-compose logs react

To stop the containers:

docker-compose stop