FROM python:3.10-slim-buster AS poetry

COPY ./poetry.lock .
COPY ./pyproject.toml .
RUN pip3 install poetry
RUN poetry export -f requirements.txt --output production.txt \
    && poetry export --dev -f requirements.txt --output development.txt


FROM python:3.10-slim-buster AS builder

WORKDIR /app/api/
RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc g++ 

COPY --from=poetry production.txt ./requirements.txt
RUN pip install -r requirements.txt
RUN apt-get purge -y --auto-remove gcc g++

COPY . .
RUN python3 manage.py migrate


FROM builder AS local

CMD python3 manage.py runserver


FROM builder AS production

ENV DJANGO_SETTINGS_MODULE=api.settings.production
RUN python3 manage.py collectstatic
CMD gunicorn api.asgi:application -k uvicorn.workers.UvicornWorker
