from django.conf.urls import url
from rest import views

urlpatterns = [
    url(r'^addToPlaylist/$', views.addToPlaylist),
]
