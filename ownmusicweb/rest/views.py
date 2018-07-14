from django.contrib.auth.models import User
from player.models import Album, Song, Playlist
from rest_framework import viewsets
from rest.serializers import UserSerializer, AlbumSerializer, SongSerializer, PlaylistSerializer
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

class AlbumViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows album to be viewed or edited.
    """
    queryset = Album.objects.all().order_by('name')
    serializer_class = AlbumSerializer

class SongViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows song to be viewed or edited.
    """
    queryset = Song.objects.all().order_by('name')
    serializer_class = SongSerializer

class PlaylistViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows playlist to be viewed or edited.
    """
    queryset = Playlist.objects.all().order_by('name')
    serializer_class = PlaylistSerializer
@csrf_exempt
def addToPlaylist(request):
    if(request.method == 'PUT'):
        data = JSONParser().parse(request)
        playlist = Playlist.objects.get(id=data.get('playlist_id'))
        song= Song.objects.get(id=data.get('song_id'))
        playlist.songlist.add(song)
        playlist.save()
        data['add'] = 'success'
        return (JsonResponse(data))
    else:
        data = JSONParser().parse(request)
        data['add'] = 'fail'
        return (JsonResponse(data))
