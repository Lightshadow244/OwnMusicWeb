from django.db import models

# Create your models here.
class Song(models.Model):
    name = models.CharField(max_length=125)
    audio_file = models.FileField()
    def __str__(self):
        return self.name
    def give_path(self):
        return self.audio_file
