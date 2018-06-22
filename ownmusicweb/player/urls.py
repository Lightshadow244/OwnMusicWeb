from django.conf.urls import *
from player.views import all_songs, song, index

from . import views

urlpatterns = [
	url(r'^$', index, name='index'),
	#url(r'^$', all_songs, name='all_songs'),
	#url(r'(?P<song_id>\d+)/$', song, name='song'),
]
