#this class is an endpoint that returns info to Room; converting the Room model object to JSON
from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Room
        fields = ('id', 'code', 'host', 'guest_can_pause_music', 'vote_to_skip', 'created_at')