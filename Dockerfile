# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.8-slim-buster

EXPOSE 8000

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE 1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED 1

# Install pip requirements
RUN python -m pip install -r requirements.txt

# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

WORKDIR /
ADD . /

# Switching to a non-root user, please refer to https://aka.ms/vscode-docker-python-user-rights
RUN useradd appuser && chown -R appuser /app
USER appuser

# During debugging, this entry point will be overridden. For more information, please refer to https://aka.ms/vscode-docker-python-debug
# File wsgi.py was not found in subfolder:devroastproject. Please enter the Python path to wsgi file.
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "devroast.wsgi"]
