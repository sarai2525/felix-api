from .models import Booking_test
from rest_framework import serializers


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking_test
        fields= "__all__"