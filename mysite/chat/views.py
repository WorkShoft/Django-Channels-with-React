from django.shortcuts import render

def index(request):
    return render(request, 'frontend/index.html')

def room(request, room_name):
    return render(request, 'frontend/room.html')
