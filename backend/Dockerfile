FROM python:3.11.6-bullseye
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
CMD [ "/bin/bash", "-c", "python manage.py collectstatic --noinput;gunicorn car_rent.wsgi --bind 0.0.0.0:80" ]
EXPOSE 80