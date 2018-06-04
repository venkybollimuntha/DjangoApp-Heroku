from django.conf.urls import url
from . import views

urlpatterns = [
url(r'^one/',views.loginForm, name='loginForm'),
url(r'^ret/',views.get_c, name='get_c'),
url(r'^signup/',views.signup, name = "signup"),
url(r'^login/',views.logincheck, name = "logincheck")
]


