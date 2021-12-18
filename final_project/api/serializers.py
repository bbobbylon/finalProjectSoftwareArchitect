#this class is an endpoint that returns info to Room; converting the Room model object to JSON
from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Room
        fields = ('id', 'code', 'host', 'guest_can_pause_music', 'vote_to_skip', 'created_at')

#create room serializer to send post request to an endpoint that will allow us to create a new room
#we want to make sure the data is valid and fits what is needed to make a new room
class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('guest_can_pause_music', 'vote_to_skip')


class UpdateRoomSerializer(serializers.ModelSerializer):
    code = serializers.CharField(validators=[])
    class Meta:
        model = Room
        fields = ('guest_can_pause_music', 'vote_to_skip', 'code')


