from django.urls import path
from .views import RoomView, CreateRoomView

urlpatterns = [
    #this is now an API endpoint
    path('room', RoomView.as_view()),
    path('create-a-room', CreateRoomView.as_view())

]
