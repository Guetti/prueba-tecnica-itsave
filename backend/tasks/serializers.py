from rest_framework import serializers
from .models import Task


# The TaskSerializer class is used to serialize the
# Task model instances into JSON format and vice versa.
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'completed']
