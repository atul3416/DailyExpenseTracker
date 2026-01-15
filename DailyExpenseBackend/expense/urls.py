
from django.urls import path
from .views import *
urlpatterns = [
    path('signup/',SignUp, name="signup"),
    path('login/',Login,name="login"),
    path('add_expense/',AddExpense,name="add_expense"),
    path('manage_expense/<int:user_id>/',ManageExpense,name="manage_expense"),
    path('update_expense/<int:expense_id>/',UpdateExpense,name="update_expense"),
    path('delete_expense/<int:expense_id>/',DeleteExpense,name="delete_expense"),
    path('search_expense/<int:user_id>/',SearchExpense,name="search_expense")
]
