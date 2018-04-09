from django.conf.urls import url, patterns, include

from . import views

urlpatterns = patterns('',
	url(r'^$', 'song.views.all_songs'),
	url(r'?P<song_id>\d+)/$', 'song.views.song'),
)
