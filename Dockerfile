FROM ubuntu:latest

# WORKDIR /ownmusicweb

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "python-pip", "nodejs", "npm", "git"]

RUN ["pip", "install", "--upgrade", "pip"]

RUN git clone https://github.com/Lightshadow244/OwnMusicWeb.git 

WORKDIR /OwnMusicWeb

RUN ["pip", "install", "-r", "/OwnMusicWeb/ownmusicweb/requirements.txt"]

RUN ["python", "/OwnMusicWeb/ownmusicweb/manage.py", "makemigrations"]
RUN ["python", "/OwnMusicWeb/ownmusicweb/manage.py", "migrate"]

WORKDIR /OwnMusicWeb/ownmusicweb/react_player

# RUN ["npm", "install"]

# RUN ["python", "/OwnMusicWeb/ownmusicweb/manage.py", "runserver", "0.0.0.0:8000"]

# this is not working because you cant open file during building from volume
# WORKDIR /ownmusicweb/react_player
# RUN ["npm", "install"]
# RUN ["npm", "start"]

# ADD .init.sh /

# ENTRYPOINT cd /OwnMusicWeb/ownmusicweb/react_player/ && npm install && npm start && python /OwnMusicWeb/ownmusicweb/manage.py runserver 0.0.0.0:8000
#ENTRYPOINT bash /.init.sh
