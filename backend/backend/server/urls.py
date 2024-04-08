from django.contrib import admin
from django.urls import path, include
from . import views


urlpatterns = [
    # path('', views.home, name='home' ),
    path('login/', views.login, name='login' ),
    path('register/', views.register, name='register' ),

    path('get-todos/', views.get_todos, name='get_todos'),

    path('create-todo/', views.create_todo, name='create_todo'),
    path('update-status/', views.update_status, name='update_todo_status'),

    path('delete-todo/<int:todo_id>/', views.delete_todo, name='delete_todo'),
    path('update-todo/<int:todo_id>/', views.update_todo, name='update_todo'),



]
