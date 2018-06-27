from django.contrib.auth.models import User
from player.models import Album, Song
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'email', 'groups')


class AlbumSerializer(serializers.ModelSerializer):
    songs = serializers.ReadOnlyField(source='name', many=True, read_only=True)
    class Meta:
        model = Album
        fields = ('id', 'name', 'author', 'release_date', 'songs')

class SongSerializer(serializers.ModelSerializer):
    album = serializers.CharField(read_only=True)
    class Meta:
        model = Song
        fields = ('id', 'name','album', 'change_date', 'audio_file')
