from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet

# Create a router and register our viewset with it.
# This will automatically create the URL patterns for the viewset.
router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')

# The API URLs are now determined automatically by the router.
# The router will generate the following URLs:
# - /api/tasks/ (GET, POST)
# - /api/tasks/{id}/ (GET, PUT, PATCH, DELETE)

urlpatterns = [
    path('', include(router.urls)),
]
