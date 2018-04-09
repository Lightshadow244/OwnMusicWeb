from django.contrib import admin
from .models import Song,Album
# Register your models here.

class PlayerAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ['name']

admin.site.register(Song, PlayerAdmin)
admin.site.register(Album, PlayerAdmin)
