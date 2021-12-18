from re import S
import re
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, serializers, status
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response


# Create your views and endpoints here
#test view
#def main(request):
#   return HttpResponse("<h1> Hello, World! </h1>")

#view that returns all different rooms
#REST API
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class GetRoom(generics.ListAPIView):
    serializer_class = RoomSerializer
    lookup_url_KWARG = 'code'
    def get(self, request, format = None):
        code = request.GET.get(self.lookup_url_KWARG)
        if code != None:
            room = Room.objects.filter(code = code)
            if (len(room) > 0):
                data = RoomSerializer(room[0]).data
                data ['is_DJ'] = self.request.session.session_key == room[0].host
                return Response(data, status = status.HTTP_200_OK)
            return Response({'This room was not found': 'This Room code is invalid'}, status= status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Code not found in request'}, status= status.HTTP_400_BAD_REQUEST)



class JoinTheRoom(APIView):
    lookup_url_kwarg = 'code'
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.data.get(self.lookup_url_kwarg)
        if code != None:
            room_result = Room.objects.filter(code = code)
            if len(room_result) > 0:
                room = room_result[0]
                self.request.session['room_code'] = code
                return Response({'message': 'You just joined the Room'}, status = status.HTTP_200_OK)
            return Response({'Wrong request': 'You entered a fake Code room'}, status = status.HTTP_200_OK)
        return Response({'You made a Bad Request' : 'You made a bad post data'}, status= status.HTTP_400_BAD_REQUEST)




class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer
    def post(self, request, format=None):
        pass
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause_music = serializer.data.get('guest_can_pause_music')
            vote_to_skip = serializer.data.get('vote_to_skip')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause_music = guest_can_pause_music
                room.vote_to_skip = vote_to_skip
                room.save(update_fields=['guest_can_pause_music', 'vote_to_skip'])
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else:
                room = Room(host=host, guest_can_pause_music=guest_can_pause_music,
                            vote_to_skip=vote_to_skip)
                room.save()
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)



