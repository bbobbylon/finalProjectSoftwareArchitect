from django.db import models
from django.db.models.expressions import F
import string
import random

def generate_unique_join_code():
    length = 9
    while True:
        #find a unique number
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if (Room.objects.filter(code = code).count()==0):
            break
    return code

# Create your models here.

#room model
class Room(models.Model):
    #unique code that stores characters
    code = models.CharField(max_length=8, default="", unique=True)
    #stores information that links back to host
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause_music = models.BooleanField(null=False, default=False)
    vote_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateField(auto_now_add=True)


