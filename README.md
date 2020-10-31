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

```
cd devroastproject
```

Copy the example file with the necessary environment parameters
```
cp env.example devroast/.env
```

create the devroast volume that will be used to store the postgres data:

```
docker volume create devroast
```

create the docker images with
```
docker-compose build
```

start the docker containers with:
```
docker-compose up
```

# Configuration

If the postgres configuration is changed then the devroast volume will
need to be destroyed (which will also destroy all data in the database)
and then re-created:

```
docker volume rm devroastproject_devroast
docker volume create devroast
```

This is often the case if there are messages in the postgres logs about
password authentication failed or Role "postgres" does not exist.

postgres_1  | [27] FATAL:  password authentication failed for user "postgres"

postgres_1  | [27] DETAIL:  Role "postgres" does not exist.

# Docker Notes
To run in a detached mode:

```
docker-compose up -d
```

To see what is running:

```
docker-compose ps
```

To see the logs for the containers

```
docker-compose logs
```

To see just the specific container, use the name from the docker-compose.yml file

```
docker-compose logs <CONTAINER_NAME>
```

To stop the containers:

```
docker-compose stop
```

## API Endpoints

<br>

**User Registration and Auth Endpoints**

- Register new user (POST, GET): `/api/auth/registration/`
- Login existing users (POST, GET): `/api/auth/login/`
- Logout existing user (POST, GET): `/api/auth/logout/`
- Get all existing users (GET): `/api/users/`
- Get specific user (GET), and change their password: `/api/users/<int:pk>/`

**Projects CRUD Endpoints**

- View all existing projects (GET, POST): `/api/projects/`
- View/edit details for a single project (GET, PUT, DELETE): `/api/projects/<int:pk>/`
