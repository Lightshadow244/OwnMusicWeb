from django.contrib.auth.models import User
from player.models import Album, Song, Playlist
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'email', 'groups')

class SongSerializer(serializers.ModelSerializer):
    album = serializers.CharField(read_only=True)
    class Meta:
        model = Song
        fields = ('id', 'name','album', 'change_date', 'audio_file')

class AlbumSerializer(serializers.ModelSerializer):
    song_set = SongSerializer(many=True, read_only=True)
    class Meta:
        model = Album
        fields = ('id', 'name', 'author', 'release_date', 'song_set')

class PlaylistSerializer(serializers.ModelSerializer):
    #songlist_set = SongSerializer(many=True, read_only=True)
    class Meta:
        model = Playlist
        fields = ('id', 'name', 'songlist')
