FROM ubuntu:latest

WORKDIR /ownmusicweb

RUN ["apt-get", "update"]
#RUN ["apt-get", "install", "-y", "python-pip"]

#RUN ["pip", "install", "--upgrade", "pip"]
#RUN ["pip", "install", "Django", "eyeD3", "djangorestframework", "markdown", "django-filter"]

#RUN ["python", "/ownmusicweb/manage.py", "migrate"]

#RUN ["python", "/ownmusicweb/manage.py", "runserver", "0.0.0.0:8000"]
