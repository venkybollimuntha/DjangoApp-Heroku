from django.shortcuts import render
from django.http import HttpResponse
from django.db import connection
import psycopg2
import json
from django.http import HttpRequest
from . models import clientAuthdeatils

def loginForm(request):
    return render(request, 'personal/loginform.html')

def signup(request):
    return render(request, 'personal/signup.html')
def get_c(request):
    print("otuside ifffffffffffffffffffff")
    if request.method == 'POST':
        print('inside if lllllllljfdkfjdkfjkdfjdklfjkldjfkdj')
        suname = request.POST['suname']
        spwd = request.POST['sPassword']
        user = clientAuthdeatils(username=suname,password = spwd,isExisted=True)
        user.save()
    return render(request,'personal/loginform.html')
def logincheck(request):
    print("otuside ifffffffffffffffffffff")
    if request.method == 'POST':
        print('inside if lllllllljfdkfjdkfjkdfjdklfjkldjfkdj')
        uname = request.POST['uname']
        pwd = request.POST['psw']
        isExist = clientAuthdeatils.objects.get(username=uname,password = pwd)
        check = isExist.isExisted
        print('llllllllllllllllllll',check)
        if(check == True):
            print("user is existed so login")
            return render(request,'personal/iptest.html')
        else:
            pass


