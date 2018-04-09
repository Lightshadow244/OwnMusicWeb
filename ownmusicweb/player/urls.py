from django.conf.urls import *
from player.views import all_songs, song

from . import views

urlpatterns = [
	url(r'^$', all_songs, name='all_songs'),
	url(r'(?P<song_id>\d+)/$', song, name='song'),
]
