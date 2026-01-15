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
        expenses = Expense.objects.filter(UserId  = user_id)
        expense_list = list(expenses.values())
        return JsonResponse(expense_list,safe=False)
       


@csrf_exempt
def UpdateExpense(request,expense_id):
    if request.method == 'PUT':
        data = json.loads(request.body)
        try:
            expense = Expense.objects.get(id = expense_id)
            expense.ExpenseDate = data.get('ExpenseDate',expense.ExpenseDate)
            expense.ExpenseCost = data.get('ExpenseCost',expense.ExpenseCost)
            expense.ExpenseItem = data.get('ExpenseItem',expense.ExpenseItem)
            expense.save()
            return JsonResponse({'message':"Expense Updated successfully"},status=200)
        except:
            return JsonResponse({'message' : "Expense not found"},status=404)
        
@csrf_exempt
def DeleteExpense(request,expense_id):
    if request.method == 'DELETE':
        try:
            expense = Expense.objects.get(id = expense_id)
            expense.delete()
            return JsonResponse({'message':"Expense Deleted successfully"},status=200)
        except:
            return JsonResponse({'message' : "Expense not found"},status=404)

from django.db.models import Sum
def SearchExpense(request,user_id):
    if request.method == 'GET': 
        from_date = request.GET.get('from')
        to_date = request.GET.get('to')
        expenses = Expense.objects.filter(UserId = user_id , ExpenseDate__range=[from_date,to_date])
        expense_list = list(expenses.values())
        agg  = expenses.aggregate(total_sum = Sum('ExpenseCost')) #{'ExpenseCost_sum': value}
        total = agg['total_sum'] or 0
        return JsonResponse({'expenses':expense_list,'total':total})
       
