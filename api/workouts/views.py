from django.db.models.query import QuerySet
from rest_framework import generics, filters
from rest_framework.permissions import IsAuthenticated
from workouts.models import WorkoutPlan, Exercise
from workouts.serializers import WorkoutPlanSerializer, CreateWorkoutPlanSerializer, ExerciseSerializer


class WorkoutPlanView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = WorkoutPlanSerializer
    
    def get_queryset(self) -> QuerySet:
        return WorkoutPlan.objects.filter(user=self.request.user)


class CreateWorkoutPlanView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CreateWorkoutPlanSerializer

    def perform_create(self, serializer: CreateWorkoutPlanSerializer) -> None:
        serializer.save(user=self.request.user)


class ExerciseView(generics.ListCreateAPIView):
    queryset = Exercise.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ExerciseSerializer
    
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
