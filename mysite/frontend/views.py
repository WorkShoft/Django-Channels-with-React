from django.shortcuts import render


def room(request, room_name):
    return render(request, 'frontend/index.html')
