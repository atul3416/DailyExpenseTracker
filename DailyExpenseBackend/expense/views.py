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


#Add_Expense
@csrf_exempt
def AddExpense(request):
     if request.method == 'POST':
        data = json.loads(request.body)
        e_date = data.get('ExpenseDate')
        e_item = data.get('ExpenseItem')
        e_cost = data.get('ExpenseCost')
        user_id = data.get('UserId')

        user = UserDetails.objects.get(id = user_id)

        try:
            Expense.objects.create(UserId = user, ExpenseDate = e_date, ExpenseItem = e_item, ExpenseCost = e_cost)
            return JsonResponse({'message':'Expense Added Successfully'},status = 201)
        except Exception as e:
            return JsonResponse({'message':"Something went wrong",'error': str(e)},status=400)
        

def ManageExpense(request,user_id):
    if request.method == 'GET':
    

        user = UserDetails.objects.get(id = user_id)

    
        expenses = Expense.objects.filter(UserId  = user_id)
        expense_list = list(expenses.values())
        return JsonResponse(expense_list,safe=False)
       
