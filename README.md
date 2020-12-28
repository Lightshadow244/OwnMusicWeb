# OwnMusicWeb
A website where you can manage and listen your own music. This repository was a project to learn Django and ReactJS



# Getting started
## clone repo  
`git clone https://github.com/Lightshadow244/OwnMusicWeb.git`

## Installation
Django is the backend, database and rest-api. The rest api is accessable with the browser. A react App provide the frontend.
### Install Requirments
#### Archlinux:  
install virtualenv  
`pacman -S python`  
`python -m venv venv`  
`source venv/bin/activate` 

install nodejs  
`pacman -S nodejs`  
`pacman -S npm`

#### Ubuntu
install virtualenv  
`apt-get install python-virtualenv`  
`virtualenv ENV`  
`source /home/user/ENV/bin/activate`  

install nodejs  
`apt-get install nodejs`

### Setting up Django  
update pip  
`pip install --upgrade pip`

install rquirements(Dajngo, eyeD3,...)  
`pip install -r ownmusicweb/requirements.txt`

do some pyhton Magic  
`python manage.py makemigration`  
`python manage.py migrate`

start server  
`python ownmusicweb/manage.py runserver 0.0.0.0:8000`  

navigate to player in browser`0.0.0.0:8000`  

### Setting up Nodejs
`cd OwnMusicWeb/ownmusicweb/react-player/`  
`npm install`  
`npm start`

### Use Docker(work in progress)
This container supports only the rest_api for the moment. The React frondend ist not included  

#### Requirements
install docker-compose  

build and start container  
`sudo docker-compose up`

navigate to rest-api in browser`localhost:80`




### Settings for own musicfolder 
set music folder  
`nano ownmusicweb/settings.py`  
STATICFILES_DIRS -> Folder with music  
first song should be named "hund.mp3"

# REST
for more information see files:

`rest/serializer.py`

`rest/views.py`

`ownmusicweb/urls.py`

### Problems during installation
#### using pip with python3
create alias 
`python3 -m pip BEFEHL`
#### pip upgrade
`sudo -H pip3 install --upgrade pip`
#### windows
pip install python_magic_bin-0.4.14-py2.py3-none-win32.whl  
https://github.com/ahupp/python-magic#dependencies    

# PI
## music data on external HDD  
formate HDD  
`fdsik /dev/sdx`  
  
delete partition  
`:d`  
  
create new partition  
`:n`  
  
formate  
`mkfs.ntfs /dev/sdx`

# Useful links
https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html  
https://docs.docker.com/compose/django/  
https://docs.djangoproject.com/en/1.11/intro/tutorial01/  
