from django.db import models

# Create your models here.

class Booking_test(models.Model):
    ID = models.BigIntegerField(primary_key=True)
    Name = models.CharField(max_length=255)
    BookingDate = models.DateTimeField()
