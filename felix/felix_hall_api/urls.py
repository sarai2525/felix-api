from django.urls import path
from .views import BookingView

urlpatterns = [
    path('booking_test/', BookingView.as_view(), name='booking_test'),
    
]