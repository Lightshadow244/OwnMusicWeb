from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

from .models import Song

# Create your views here.
#def index(request):
    ##s = Song.objects.all()
    #template = loader.get_template('player/index.html')
    #context={}
    #return HttpResponse(template.render(context, request))

def all_songs(request):
    #template = loader.get_template('player/index.html')
    #context={}
    #return HttpResponse(template.render(context, request))
    return render(request, 'player/all_songs.html')

def song(request, song_id):
	return render(request, 'player/song.html')
