#FROM ubuntu:latest

#WORKDIR /root/ownmusicweb

#RUN ["apt-get", "update"]
#RUN ["apt-get", "install", "-y", "python-pip"]

#RUN ["pip", "install", "--upgrade", "pip"]
#RUN ["pip", "install", "Django", "eyeD3", "djangorestframework", "markdown", "django-filter"]

#RUN bash -c /bin/echo "hello world" > /root/ownmusicweb/hello.txt

#RUN ["python", "~/ownmusicweb/manage.py", "migrate"]

#RUN ["python", "~/ownmusicweb/manage.py", "runserver", "0.0.0.0:8000"]



FROM python:3

WORKDIR /ownmusicweb

RUN pip install --no-cache-dir Django eyeD3 djangorestframework markdown django-filter

RUN bash -c /bin/echo "hello world" > /ownmusicweb/hello.txt

CMD [ "python", "/root/ownmusicweb/manage.py" "migrate"]

CMD [ "python", "/root/ownmusicweb/manage.py" "runserver", "0.0.0.0:8000"]

