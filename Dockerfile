FROM ubuntu:latest

WORKDIR /ownmusicweb

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "python-pip"]

RUN ["pip", "install", "--upgrade", "pip"]
RUN ["pip", "install", "-r" "requirements.txt"]

#RUN ["python", "/ownmusicweb/manage.py", "migrate"]

#RUN ["python", "/ownmusicweb/manage.py", "runserver", "0.0.0.0:8000"]

ENTRYPOINT python /ownmusicweb/manage.py migrate && python manage.py makemigrations player && python /ownmusicweb/manage.py migrate && python /ownmusicweb/manage.py runserver 0.0.0.0:8000
