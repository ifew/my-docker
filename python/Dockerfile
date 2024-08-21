# syntax=docker/dockerfile:1
FROM python:3.12-slim-bookworm

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

CMD [ "python3"]