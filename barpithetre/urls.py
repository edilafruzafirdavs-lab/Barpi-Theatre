from django.contrib import admin
from django.urls import path
from booking.views import *


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', Main),
    path('hall/<int:hall_id>/edit/', EditHall, name='edit')
]
