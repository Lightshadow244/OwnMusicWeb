from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
import os
from .models import Song

from wsgiref.util import application_uri

# Create your views here.
def index(request):
    s = Song.objects.filter(id=2)
    #template = loader.get_template('index.html')
    context={}
    print(request.path.split("/")[2])
    print("Dein Song:" + str(Song.objects.filter(id=request.path.split("/")[2])))
    print("Dein Song:" + str(Song.objects.filter(id=request.path.split("/")[2])[0].audio_file))

    fname="./media/" + str(Song.objects.filter(id=request.path.split("/")[2])[0].audio_file)
    f = open(fname,"rb")
    response = HttpResponse()
    response.write(f.read())
    response['Content-Type'] ='audio/mp3'
    response['Content-Length'] =os.path.getsize(fname )

    return response

def all_songs(request):
    template = loader.get_template('player/all_songs.html')
    context={}
    return HttpResponse(template.render(context, request))
    #return render(request, 'player/all_songs.html')

def song(request, song_id):
	return render(request, 'player/song.html')
