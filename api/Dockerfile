FROM python:3.10-slim-buster AS poetry

COPY poetry.lock pyproject.toml ./
RUN pip3 install poetry
RUN poetry export -f requirements.txt --output production.txt \
    && poetry export --dev -f requirements.txt --output development.txt


FROM python:3.10-slim-buster AS builder

ARG SECRET_KEY
ENV SECRET_KEY=${SECRET_KEY}

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

WORKDIR /app/
RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc g++ 

COPY --from=poetry production.txt ./requirements.txt
RUN pip install -r requirements.txt
RUN apt-get purge -y --auto-remove gcc g++

COPY . .


FROM builder AS local

ARG PORT
CMD python3 manage.py runserver 0.0.0.0:${PORT}


FROM builder AS testing

COPY --from=poetry development.txt ./development.txt
RUN pip install -r development.txt
CMD python3 manage.py test


FROM builder AS production

ENV DJANGO_SETTINGS_MODULE=api.settings.production
RUN python3 manage.py migrate
RUN python3 manage.py collectstatic --no-input
ENTRYPOINT gunicorn api.asgi:application -k uvicorn.workers.UvicornWorker
