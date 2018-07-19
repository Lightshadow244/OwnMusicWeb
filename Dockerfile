FROM ubuntu:latest

WORKDIR /ownmusicweb

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "python-pip", "nodejs", "npm"]

RUN ["pip", "install", "--upgrade", "pip"]
#RUN ["pip", "install", "-r", "/ownmusicweb/requirements.txt"]

#RUN ["python", "/ownmusicweb/manage.py", "migrate"]

#RUN ["python", "/ownmusicweb/manage.py", "runserver", "0.0.0.0:8000"]

WORKDIR /ownmusicweb/ownmusicweb/react_player
RUN ["npm", "install"]
RUN ["npm", "start"]

ADD .init.sh /

#ENTRYPOINT pip install -r /ownmusicweb/requirements.txt && python manage.py makemigrations player && python /ownmusicweb/manage.py migrate && python /ownmusicweb/manage.py runserver 0.0.0.0:8000
ENTRYPOINT bash /.init.sh
