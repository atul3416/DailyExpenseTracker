from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import *
#SignUp API
@csrf_exempt
def SignUp(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        fullname = data.get('FullName')
        email = data.get('Email')
        password = data.get('Password')

        if UserDetails.objects.filter(Email = email).exists():
            return JsonResponse({'message': 'Email already exists'},status=400)
        UserDetails.objects.create(FullName = fullname, Email = email, password = password)
        return JsonResponse({'message': 'User Registered Successfully'},status=201) 

#Login API
@csrf_exempt
def Login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('Email')
        password = data.get('Password')

        try:
            user = UserDetails.objects.get(Email = email , password = password)
            return JsonResponse({'message':'Login Successful', 'userId': user.id, 'userName': user.FullName},status = 200)
        except:
            return JsonResponse({'message':"Invalid Credentials"},status=400)