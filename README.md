# OwnMusicWeb
A website where you can manage and listen your own music.

# Requirements
docker-compose

# Getting started
### clone repo
<code># git clone https://github.com/Lightshadow244/OwnMusicWeb.git</code>
### start elasticsearch<br>
<code># sudo docker-compose up<br></code>
### get access to container
<code># sudo docker exec -it [container-id] bash</code>
### default login
https://www.elastic.co/guide/en/x-pack/current/setting-up-authentication.html#built-in-users
### problems
exit code 78: https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html
# Useful links
https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html<br>
https://docs.docker.com/compose/django/


# Elasticsearch
### helpful commands
Health of Elasticsearch<br>
<code># curl -XGET -u elastic 'localhost:9200/_cat/health?v&pretty'</code><br>
All nodes<br>
<code># curl -XGET -u elastic 'localhost:9200/_cat/nodes?v'</code><br>
All indices<br>
<code># curl -XGET -u elastic 'localhost:9200/_cat/indices?v'</code><br>
Create index<br>
<code>curl -XPUT -u elastic 'localhost:9200/customer?pretty&pretty'</code><br>
Create document in index: "customer" with type: "external"<br> eith id: "1"
<code>curl -XPUT -u elastic 'localhost:9200/customer/external/1?pretty&pretty' -H 'Content-Type: application/json' -d' {"name": "John Doe"}'</code>
