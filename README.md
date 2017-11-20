# OwnMusicWeb
A website where you can manage and listen your own music.



# Getting started
### clone repo
<code># git clone https://github.com/Lightshadow244/OwnMusicWeb.git</code>
# Elasticsearch
### Requirements
docker-compose
### start elasticsearch<br>
<code># sudo docker-compose up<br></code>
### get access to container
<code># sudo docker exec -it [container-id] bash</code>
### default login
https://www.elastic.co/guide/en/x-pack/current/setting-up-authentication.html#built-in-users
### problems
exit code 78: https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html

### helpful commands
Health of Elasticsearch<br>
<code># curl -XGET -u elastic 'localhost:9200/_cat/health?v&pretty'</code><br>
All nodes<br>
<code># curl -XGET -u elastic 'localhost:9200/_cat/nodes?v'</code><br>
All indices<br>
<code># curl -XGET -u elastic 'localhost:9200/_cat/indices?v'</code><br>
Create index<br>
<code># curl -XPUT -u elastic 'localhost:9200/customer?pretty&pretty'</code><br>
Create document in index: "customer" with type: "external" with id: "1"<br>
<code># curl -XPUT -u elastic 'localhost:9200/customer/external/1?pretty&pretty' -H 'Content-Type: application/json' -d' {"name": "John Doe"}'</code><br>
get document with index: "customer" type:"external" id: "1"<br>
<code># curl -XGET 'localhost:9200/customer/external/1?pretty&pretty'</code><br>
delete index customer
<code># curl -XDELETE -u elastic 'localhost:9200/customer?pretty&pretty'</code><br>
delete document<br>
<code># curl -XDELETE -u elastic 'localhost:9200/customer/external/2?pretty&pretty'</code><br>
update document<br>
<code># curl -XPOST -u elastic 'localhost:9200/customer/external/2/_update?pretty&pretty' -H 'Content-Type: application/json' -d' { "doc": { "name": "Ute Luedtke", "age": 49 }}'</code><br>
update document with simple script<br>
<code># curl -XPOST -u elastic 'localhost:9200/customer/external/2/_update?pretty&pretty' -H 'Content-Type: application/json' -d' { "script" : "ctx._source.age += 5"}'</code><br>
base for complex search<br>
<code># curl -XGET 'localhost:9200/bank/_search?pretty' -H 'Content-Type: application/json' -d'
{
  "query": { "match_all": {} },
  "sort": [
    { "account_number": "asc" }
  ]
}
'
</code>

# Django
### Requirements
pip, virtualenv
### First Project + Installation
https://docs.djangoproject.com/en/1.11/intro/tutorial01/<br>

### Problems during installation
#### using pip with python3
create alias 
<code>python3 -m pip BEFEHL</code>
#### pip upgrade
<code>sudo -H pip3 install --upgrade pip</code><br>

### virtualenv
#### create ENV
<code> # virtualenv ENV</code>

#### activate ENV
<code> # source ~/ENV/bin/activate</code>

#### disable ENV
<code> # deactivate</code>

# Useful links
https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html<br>
https://docs.docker.com/compose/django/
