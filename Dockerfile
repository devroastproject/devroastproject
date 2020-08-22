# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.8-alpine

EXPOSE 8000

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE 1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

WORKDIR /app
ADD . /

# Switching to a non-root user, please refer to https://aka.ms/vscode-docker-python-user-rights
RUN adduser appuser && chown -R appuser /app
RUN echo "user_pass" | chpasswd
USER appuser

RUN mkdir /app \
 && virtualenv -p python /app/ve
ONBUILD WORKDIR /app
COPY setup.py requirements.txt /app/
# Make an /app virtualenv with all pre-requisites installed
RUN cd /app && /app/ve/bin/pip install -r requirements.txt && rm /app/entry
# Copy our current app source over it for fast dev iteration.
COPY . /app

# During debugging, this entry point will be overridden. For more information, please refer to https://aka.ms/vscode-docker-python-debug
# File wsgi.py was not found in subfolder:devroastproject. Please enter the Python path to wsgi file.
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "devroast.wsgi"]
