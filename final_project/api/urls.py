from django.urls import path
from .views import GetRoom, RoomView, CreateRoomView

urlpatterns = [
    #this is now an API endpoint
    path('room', RoomView.as_view()),
    path('create-a-room', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view())

]
