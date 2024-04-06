from django.contrib import admin

# Register your models here.
from .models import Todo, TodoUser

class TotalUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'password')

class TotalTodos(admin.ModelAdmin):
    list_display= ('id', 'user_id', 'todo', 'description', 'status')



admin.site.register(TodoUser, TotalUserAdmin)
admin.site.register(Todo, TotalTodos)