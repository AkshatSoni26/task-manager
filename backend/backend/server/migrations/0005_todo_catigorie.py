# Generated by Django 5.0.4 on 2024-04-11 06:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0004_rename_date_todo_due_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='catigorie',
            field=models.CharField(choices=[('work', 'work'), ('personal', 'personal'), ('errands', 'errands'), ('other', 'other')], max_length=40, null=True),
        ),
    ]
