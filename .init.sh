#!/bin/bash

if ! [ -d /true ];
then
	echo "erste initalisierung"
	pip install -r /ownmusicweb/requirements.txt
	python manage.py makemigrations player
	python /ownmusicweb/manage.py migrate
	echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin', '', 'password')" | python manage.py shell
	mkdir ../true
else
	echo "wurde bereits durchgeführt"
fi
python /ownmusicweb/manage.py runserver 0.0.0.0:8000
