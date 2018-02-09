# OwnMusicWeb
A website where you can manage and listen your own music.



# Getting started
### clone repo
`git clone https://github.com/Lightshadow244/OwnMusicWeb.git`

# Elasticsearch
### Requirements
docker-compose

### start elasticsearch
`sudo docker-compose up`

### get access to container
`sudo docker exec -it [container-id] bash`

### default login
https://www.elastic.co/guide/en/x-pack/current/setting-up-authentication.html#built-in-users

### problems
exit code 78: https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html

#### Health of Elasticsearch
`curl -XGET -u elastic 'localhost:9200/_cat/health?v&pretty'`
#### All nodes
`curl -XGET -u elastic 'localhost:9200/_cat/nodes?v'`
#### All indices
`curl -XGET -u elastic 'localhost:9200/_cat/indices?v'`
#### Create index
`curl -XPUT -u elastic 'localhost:9200/customer?pretty&pretty'`
#### Create document in index: "customer" with type: "external" with id: "1"
`curl -XPUT -u elastic 'localhost:9200/customer/external/1?pretty&pretty' -H 'Content-Type: application/json' -d' {"name": "John Doe"}'`
#### get document with index: "customer" type:"external" id: "1"
`curl -XGET 'localhost:9200/customer/external/1?pretty&pretty'`
#### delete index customer
`curl -XDELETE -u elastic 'localhost:9200/customer?pretty&pretty'`
#### delete document
`curl -XDELETE -u elastic 'localhost:9200/customer/external/2?pretty&pretty'`
#### update document
`curl -XPOST -u elastic 'localhost:9200/customer/external/2/_update?pretty&pretty' -H 'Content-Type: application/json' -d' { "doc": { "name": "Ute Luedtke", "age": 49 }}'`
#### update document with simple script
`curl -XPOST -u elastic 'localhost:9200/customer/external/2/_update?pretty&pretty' -H 'Content-Type: application/json' -d' { "script" : "ctx._source.age += 5"}'`
#### base for complex search
`curl -XGET 'localhost:9200/bank/_search?pretty' -H 'Content-Type: application/json' -d'
{
  "query": { "match_all": {} },
  "sort": [
    { "account_number": "asc" }
  ]
}
'
`

# Django
### Requirements
pip, virtualenv, eyeD3

### First Project + Installation
https://docs.djangoproject.com/en/1.11/intro/tutorial01/
### Summary
install virtualenv

create virtualenv `virtualenv /home/user/ENV`

activate virtualenv `source /home/user//ENV/bin/activate`

install pip
update pip ` pip install --upgrade pip`
install django ` pip install Django`
install eyeD3 `pip install eyeD3`
install everything for REST `pip install djangorestframework markdown django-filter`

`python manage.py migrate`

add localhost to allowed hosts in ./ownmusicweb/settings.py

set music folder ` nano ownmusicweb/settings.py`
STATICFILES_DIRS -> Folder with music
first song should be named "hund.mp3"

start server `python /home/user/ownmusicweb/ownmusicweb/manage.py runserver 0.0.0.0:8000`
navigate to player in browser`0.0.0.0:8000/player`


### Problems during installation
#### using pip with python3
create alias 
`python3 -m pip BEFEHL`
#### pip upgrade
`sudo -H pip3 install --upgrade pip`
#### windows
pip install python_magic_bin-0.4.14-py2.py3-none-win32.whl
https://github.com/ahupp/python-magic#dependencies


### virtualenv
#### create ENV
`virtualenv ENV`

#### activate ENV
`source ~/ENV/bin/activate`

#### disable ENV
`deactivate`

### install Django
`pip install Django `

# Useful links
https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html
https://docs.docker.com/compose/django/
