from django.shortcuts import render
from django.http import HttpResponse

# Create your views and endpoints here

def main(request):
    return HttpResponse("<h1> Hello, World! </h1>")

