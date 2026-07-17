from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
from booking.models import *

def Main(request):
    return render(request, 'main.html')

def EditHall(request, hall_id):
    hall = get_object_or_404(Hall, id=hall_id)
    return render(
        request,
        "edithall.html",
        {
            "hall_id": hall_id,
            "hall_name": hall.name
        }
    )