from django.contrib import admin
from .models import Song, Album, Playlist
# Register your models here.

class PlayerAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ['name']

admin.site.register(Song, PlayerAdmin)
admin.site.register(Album, PlayerAdmin)
#admin.site.register(Playlist, PlayerAdmin)

class PlaylistInLine(admin.TabularInline):
    model = Playlist.songlist.through
@admin.register(Playlist)
class PlaylistAdmin(admin.ModelAdmin):
    inlines=(PlaylistInLine,)
    exclude = ('songlist',)
