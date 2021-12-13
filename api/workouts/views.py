from django.db.models.query import QuerySet
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from workouts.models import WorkoutPlan
from workouts.serializers import WorkoutPlanSerializer


class WorkoutPlanView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = WorkoutPlanSerializer
    
    def get_queryset(self) -> QuerySet:
        return WorkoutPlan.objects.filter(user=self.request.user)
