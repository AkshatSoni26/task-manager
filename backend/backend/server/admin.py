from django.contrib import admin

# Register your models here.
from .models import Todo, TodoUser

admin.site.register(TodoUser)
admin.site.register(Todo)