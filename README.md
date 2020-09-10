# devroastproject

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

# Setup

Fork and clone the repository

cd devroast

cp env.example devroast/.env

docker-compose build

docker-compose up

# Docker Notes
To run in a detached mode:

docker-compose up -d

To see what is running:

docker-compose ps

To see the logs for the containers

docker-compose logs

To see just the specific container, use the name from the docker-compose.yml file

docker-compose logs <CONTAINER_NAME>

To stop the containers:

docker-compose stop

# Seeding and Updating the Database

In order to create, and update, new models, you will need to first run `docker-compose build` before you run `makemigations` and `migrate`.