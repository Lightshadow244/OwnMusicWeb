from django.contrib.auth.models import User
from player.models import Album, Song
from rest_framework import viewsets
from rest.serializers import UserSerializer, AlbumSerializer, SongSerializer


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

