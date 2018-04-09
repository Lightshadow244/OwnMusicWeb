from django.conf.urls import url, patterns, include

from . import views

urlpatterns = patterns('',
	url(r'^$', 'player.views.all_songs'),
	url(r'?P<song_id>\d+)/$', 'player.views.song'),
)
