# felix-api

1. Start server first time:

a. Go to the derectory where pipfile is located

b. install depndancies:

$ pip install pipenv
$ pipenv shell
$ pipenv install

c. star server:

$ cd felix
$ python3 manage.py makemigrations
$ python3 manage.py migrate
$ python3 manage.py runserver

2. Frontend part:

==> at this url : http://127.0.0.1:8000/

==> You can see a page of test it is located in the file "templates" for the img, CSS, Js the file will need to be located in "static"

==> insside the folder "felix_hal_fe" you can see the file view.py where it is code the test page

==> the endpoint is code inside urls.py from the same folder.

3. API part:

==> at this url: http://127.0.0.1:8000/api/booking_test/

==> you can see a explempe of api with django

==> the model of this is located inside the folder felix_hall_api file : models.py

==> the data filds is code in the same folder insside the file : serializers.py

==> the view is in the same folder file : views.py

==> the endpoint is in the same folder file : urls.py do not forget to add api/ before

4. admin API:

for the moment I have just installed djoser it is the safest way to do that.

5. admin system interface:

==> go to this url : http://127.0.0.1:8000/admin/

==> I created a admin account = name : admin0 , password : admin123

==> you can see we can have acces to the booking database ^\_\_^
