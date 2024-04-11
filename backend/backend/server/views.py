from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Todo, TodoUser
import json
from django.views.decorators.csrf import csrf_exempt
# from django.core.serializers import serialize






@csrf_exempt
def register(request):

    if request.method == 'POST':

        # Extract username and password from POST data
        data = json.loads(request.body.decode('utf-8'))
        username = data.get('username')
        password = data.get('password')

        if len(username) < 2:
            return JsonResponse({'message':'username should be grater then 2.', 'status':400},status=400)
        
        if len(password) < 2:
            return JsonResponse({'message':'password should be grater then 2.', 'status':400},status=400)

        # Check if username already exists
        if TodoUser.objects.filter(name=username).exists():
            return JsonResponse({'message':'Username already exists', 'status':400}, status=200)
        
        # Create new user
        user = TodoUser(name=username, password=password)
        user.save()

        userId = TodoUser.objects.filter(name=username).first()
        
        return JsonResponse({'message':'User registered successfully', 'id': userId.id, "status":200}, status=200)

    else:
        return HttpResponse('Only POST requests are allowed for registration', status=405)


@csrf_exempt
def login(request):
    if request.method == 'POST':
        # Extract username and password from POST data
        data = json.loads(request.body.decode('utf-8'))
        username = data.get('username')
        password = data.get('password')

        # Check if username and password are provided
        if not username or not password:
            return JsonResponse({'message': 'Username and password are required.', 'status': 400}, status=200)

        # Check if username exists
        user = TodoUser.objects.filter(name=username).first()
        if user:
            # Check if the provided password matches the user's password
            if user.password == password:
                return JsonResponse({'message': 'Login successful.', 'id': user.id, 'status':200}, status=200)
            else:
                return JsonResponse({'message': 'Invalid password.', 'status': 401}, status=401)
        else:
            return JsonResponse({'message': 'User not found.', 'status': 404}, status=200)
    else:
        return JsonResponse({'message': 'Only POST requests are allowed for login.', 'status': 405}, status=405)


@csrf_exempt
def get_todos(request):
    if request.method == 'POST':
        # Extract user ID from POST data
        data = json.loads(request.body.decode('utf-8'))
        user_id = data.get('user_id')

        # Check if user ID is provided
        if not user_id:
            return JsonResponse({'message': 'User ID is required.', 'status': 400}, status=400)

        # Check if user exists
        user = TodoUser.objects.filter(id=user_id).first()

        if user:
            # Retrieve todos associated with the user
            todos = Todo.objects.filter(user_id=user_id)
            todo_list = [{'todo': todo.todo,'todo_id':todo.id , 'description': todo.description, 'status': todo.status, 'due_date':todo.due_date, 'catigorie':todo.catigorie} for todo in todos]
            return JsonResponse({'todos': todo_list}, status=200)
        else:
            return JsonResponse({'message': 'User not found.', 'status': 404}, status=404)
    else:
        return JsonResponse({'message': 'Only POST requests are allowed to retrieve todos.', 'status': 405}, status=405)



@csrf_exempt
def create_todo(request):
    if request.method == 'POST':
        # Extract data from POST request
        data = json.loads(request.body.decode('utf-8'))
        user_id = data.get('user_id')
        todo_text = data.get('todo')
        description = data.get('description')
        status = data.get('status', 'in-progress')  # Default to 'in-progress' if status is not provided
        due_date = data.get('due_date')
        catigorie = data.get('catigorie', 'other')

        print("data ====>", data)

        # Check if all required fields are provided
        if not (user_id and todo_text and description):
            return JsonResponse({'message': 'user_id, todo, and description are required fields.', 'status': 400}, status=400)

        # Check if user exists
        user = TodoUser.objects.filter(id=user_id).first()

        if user:
            # Create new todo
            todo = Todo.objects.create(user_id=user, todo=todo_text, description=description, status=status, due_date=due_date, catigorie=catigorie)
            return JsonResponse({'message': 'Todo created successfully.', 'todo_id': todo.id}, status=201)
        else:
            return JsonResponse({'message': 'User not found.', 'status': 404}, status=404)
    else:
        return JsonResponse({'message': 'Only POST requests are allowed to create todos.', 'status': 405}, status=405)


@csrf_exempt
def update_status(request):
    if request.method == 'PATCH':
        # Extract data from POST request
        data = json.loads(request.body.decode('utf-8'))
        todo_id = data.get('todo_id')
        new_status = data.get('new_status')

        # Check if both todo_id and new_status are provided
        if not (todo_id and new_status):
            return JsonResponse({'message': 'Both todo_id and new_status are required fields.', 'status': 400}, status=400)

        # Check if todo exists
        todo = Todo.objects.filter(id=todo_id).first()
        if todo:
            # Update todo status
            todo.status = new_status
            todo.save()
            return JsonResponse({'message': 'Todo status updated successfully.', 'todo_id': todo.id}, status=200)
        else:
            return JsonResponse({'message': 'Todo not found.', 'status': 404}, status=404)
    else:
        return JsonResponse({'message': 'Only POST requests are allowed to update todo status.', 'status': 405}, status=405)


@csrf_exempt
def delete_todo(request, todo_id):
    if request.method == 'DELETE':
        # Check if todo exists
        try:
            todo = Todo.objects.get(id=todo_id)
        except Todo.DoesNotExist:
            return JsonResponse({'message': 'Todo not found.', 'status': 404}, status=404)

        # Delete the todo
        todo.delete()
        return JsonResponse({'message': 'Todo deleted successfully.', 'todo_id': todo_id}, status=200)
    else:
        return JsonResponse({'message': 'Only DELETE requests are allowed to delete todos.', 'status': 405}, status=405)
    

@csrf_exempt
def update_todo(request, todo_id):
    if request.method == 'PUT':
        # Check if todo exists
        try:
            todo = Todo.objects.get(id=todo_id)
        except Todo.DoesNotExist:
            return JsonResponse({'message': 'Todo not found.', 'status': 404}, status=404)

        # Extract data from PUT request
        data = json.loads(request.body.decode('utf-8'))
        user_id = data.get('user_id')
        todo_text = data.get('todo')
        description = data.get('description')
        status = data.get('status')

        # Update todo fields if provided
        if user_id:
            todo.user_id_id = user_id
        if todo_text:
            todo.todo = todo_text
        if description:
            todo.description = description
        if status:
            todo.status = status

        todo.save()

        return JsonResponse({'message': 'Todo updated successfully.', 'todo_id': todo.id}, status=200)
    else:
        return JsonResponse({'message': 'Only PUT requests are allowed to update todos.', 'status': 405}, status=405)
