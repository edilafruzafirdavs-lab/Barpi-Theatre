from django.contrib import admin
from .models import *

admin.site.register(Play)
admin.site.register(Session)
admin.site.register(Seat)
admin.site.register(Ticket)

@admin.register(Hall)
class HallAdmin(admin.ModelAdmin):
    change_form_template = "halldlc.html"