from django.db import models

# Create your models here.


class TodoUser(models.Model):
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)  

    def __str__(self):
        return self.name

class Todo(models.Model):
    STATUS_CHOICES = (
        ('in-progress', 'In Progress'),
        ('done', 'Done'),
    )

    id = models.IntegerField(primary_key=True, auto_created=True)
    user_id = models.ForeignKey(TodoUser, on_delete=models.CASCADE)
    todo = models.CharField(max_length=200)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    def __str__(self):
        return self.todo

