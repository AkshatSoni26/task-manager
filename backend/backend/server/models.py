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

    CATIGRI = (
        ('work', 'work'),
        ('personal', 'personal'),
        ('errands', 'errands'),
        ('other', 'other')
    )

    user_id = models.ForeignKey(TodoUser, on_delete=models.CASCADE)
    todo = models.CharField(max_length=200)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    due_date = models.CharField(max_length=30, null=True )
    catigorie = models.CharField(max_length=40, choices=CATIGRI, null=True)

    def __str__(self):
        return self.todo