#FROM ubuntu:latest

#RUN mkdir /ownmusicweb
#ADD . /ownmusicweb
#WORKDIR /ownmusicweb

#RUN ["apt-get", "update"]
#RUN ["apt-get", "install", "-y", "python-pip"]

#RUN ["pip", "install", "--upgrade", "pip"]
#RUN ["pip", "install", "Django", "eyeD3", "djangorestframework", "markdown", "django-filter"]

#RUN bash -c /bin/echo "hello world" > /ownmusicweb/hello.txt

#RUN ["python", "/ownmusicweb/manage.py", "migrate"]

#RUN ["python", "/ownmusicweb/manage.py", "runserver", "0.0.0.0:8000"]

############################################


FROM python:3

ADD . /ownmusicweb

#RUN mkdir /ownmusicweb
WORKDIR /ownmusicweb

RUN pip install --no-cache-dir Django eyeD3 djangorestframework markdown django-filter

RUN bash -c /bin/echo "hello world" > /ownmusicweb/hello.txt

#RUN ["python", "/ownmusicweb/manage.py", "migrate"]
RUN bash -c  python /ownmusicweb/manage.py migrate

RUN bash -c  python /ownmusicweb/manage.py runserver 0.0.0.0:8000