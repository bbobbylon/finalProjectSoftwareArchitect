from string import ascii_uppercase
from django.urls import path
from .views import GetRoom, LeaveRoom, RoomView, CreateRoomView, JoinTheRoom, IsUserInRoom, UpdateTheRoom

urlpatterns = [
    #this is now an API endpoint
    path('room', RoomView.as_view()),
    path('create-a-room', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view()),
    path('join-room' , JoinTheRoom.as_view()),
    path('user-in-room', IsUserInRoom.as_view()),
    path('leave-room', LeaveRoom.as_view()),
    path('update-room', UpdateTheRoom.as_view())
]
