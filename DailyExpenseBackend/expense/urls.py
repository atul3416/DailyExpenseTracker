
from django.urls import path
from .views import *
urlpatterns = [
    path('signup/',SignUp, name="signup"),
    path('login/',Login,name="login"),
    path('add_expense/',AddExpense,name="add_expense"),
    path('manage_expense/<int:user_id>/',ManageExpense,name="manage_expense")
]
