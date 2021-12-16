from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .serializers import RoomSerializer
from .models import Room

# Create your views and endpoints here

#view that returns all different rooms
#REST API
class RoomView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer



#test view
#def main(request):
#   return HttpResponse("<h1> Hello, World! </h1>")



