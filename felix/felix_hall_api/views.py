from django.shortcuts import render
from .models import Booking_test
from .serializers import BookingSerializer
from rest_framework import generics

# Create your views here.
class BookingView(generics.ListCreateAPIView):
   queryset = Booking_test.objects.all()
   serializer_class = BookingSerializer
   
