from django.conf.urls import *

from . import views

urlpatterns = [
	url(r'^$', 'player.views.all_songs'),
	url(r'?P<song_id>\d+)/$', 'player.views.song'),
]
