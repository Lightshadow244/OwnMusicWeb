from django.db import models

# Create your models here.
class Song(models.Model):
    name = models.CharField(max_length=125)
    album_id = models.ForeignKey(album, on_delete=models.CASCADE)
    change_date = models.DateField()
    audio_file = models.FileField()
    def __str__(self):
        return self.name
    def give_album(self):
        return self.album_id
    def give_change_date(self):
        return self.change_date
    def give_path(self):
        return self.audio_file

class album(models.Model)
    album_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=125)
    author = models.CharField(max_length=125)
    release_date = models.DateField()
    def __str__(self):
        return self.name
    def give_author(self):
        return self.author
    def give_release_date(self):
        return self.release_date
