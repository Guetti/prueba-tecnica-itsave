from django.shortcuts import render
from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer

# Create your views here.


# The TaskViewSet class is a viewset that provides the CRUD operations for the Task model.
# It inherits from ModelViewSet, which provides default implementations for the CRUD operations.

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
