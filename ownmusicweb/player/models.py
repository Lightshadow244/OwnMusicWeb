from django.db import models
import django

# Create your models here.
class Album(models.Model):
    name = models.CharField(max_length=125)
    author = models.CharField(max_length=125)
    release_date = models.DateField()
    def __str__(self):
        return self.name
    def give_author(self):
        return self.author
    def give_release_date(self):
        return self.release_date

class Song(models.Model):
    name = models.CharField(max_length=125)
    #foreign key create a field in Album song_set. To get all Songs from a Album use
    # a = Album.objects.get(album_id=0); a.song_set.all()
<<<<<<< HEAD
    album = models.ForeignKey(Album, related_name='songs', on_delete=models.CASCADE, default=0)
    change_date = models.DateField(django.utils.timezone.now)
=======
    album = models.ForeignKey(Album, on_delete=models.CASCADE, default=0)
    change_date = models.DateField(default=django.utils.timezone.now)
>>>>>>> fd82254380bae76dfd38947df8431490a3338a27
    audio_file = models.FileField()
    def __str__(self):
        return self.name
    def give_album(self):
        return self.album_id
    def give_change_date(self):
        return self.change_date
    def give_path(self):
        return self.audio_file



