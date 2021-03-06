from django.conf.urls import url, include
from rest_framework import routers
from rest import views
from django.conf import settings
from django.conf.urls.static import static

#Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'album', views.AlbumViewSet)
router.register(r'song', views.SongViewSet)
router.register(r'playlist', views.PlaylistViewSet)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^player/', include('player.urls')),
    url(r'^', include(router.urls)),
    url(r'^api/', include('rest.urls')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^admin/', include(admin.site.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
