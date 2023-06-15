from django.shortcuts import render

# Create your views here.

# view of test page:
def test(request):
    return render(request, 'test.html')
