from django.urls import path
from .views import RoomView

urlpatterns = [
    #this is now an API endpoint
    path('room', RoomView.as_view()),

]
