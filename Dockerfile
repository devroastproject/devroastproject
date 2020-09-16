# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.8-alpine

EXPOSE 8000

COPY ./init.sh /usr/local/bin

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE 1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED 1

# Setup the virtualenvironment
ENV VIRTUAL_ENV=/app/ve

# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev py3-virtualenv

# Switching to a non-root user, please refer to https://aka.ms/vscode-docker-python-user-rights
RUN adduser --disabled-password --home /app appuser && chown -R appuser /app
USER appuser
WORKDIR /app
# Make an /app virtualenv with all pre-requisites installed
RUN cd /app && virtualenv -p python ${VIRTUAL_ENV} && ${VIRTUAL_ENV}/bin/python -m pip install --upgrade pip
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# Copy our current app source over it for fast dev iteration.
COPY --chown=appuser . /app

# During debugging, this entry point will be overridden. For more information, please refer to https://aka.ms/vscode-docker-python-debug
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "devroast.wsgi"]
# ENTRYPOINT ["./init.sh"]
