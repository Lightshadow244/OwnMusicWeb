# OwnMusicWeb
A website where you can manage and listen your own music.



# Getting started
### clone repo
`git clone https://github.com/Lightshadow244/OwnMusicWeb.git`

### Install Django local 
install virtualenv

create virtualenv `virtualenv /home/user/ENV`

activate virtualenv `source /home/user/ENV/bin/activate`


update pip  
`pip install --upgrade pip`

install django, eyeD3 and everythin for REST  
`pip install Django eyeD3 djangorestframework markdown django-filter`

do some pyhton Magic  
`python manage.py migrate`

add localhost to allowed hosts in ./ownmusicweb/settings.py

start server  
`python /home/user/ownmusicweb/ownmusicweb/manage.py runserver 0.0.0.0:8000`


navigate to player in browser`0.0.0.0:8000/player`

### Use Docker
install docker-compose

build and start container  
`sudo docker-compose up`

navigate to player in browser`localhost:83/player`




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

# Useful links
https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html
https://docs.docker.com/compose/django/
https://docs.djangoproject.com/en/1.11/intro/tutorial01/
