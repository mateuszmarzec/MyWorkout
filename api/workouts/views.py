from django.db.models.query import QuerySet
from rest_framework import generics, filters, viewsets
from rest_framework.permissions import IsAuthenticated
from workouts.models import WorkoutPlan, WorkoutActivity, Exercise, WorkoutExerciseSet
from workouts.serializers import ListWorkoutPlanSerializer, GetWorkoutPlanSerializer, CreateWorkoutPlanSerializer, ExerciseSerializer, WorkoutActivitySerializer
from users.models import User


class ListWorkoutPlanView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ListWorkoutPlanSerializer
    lookup_field = "slug"
    
    def get_queryset(self) -> QuerySet:
        return self.request.user.workout_plans


class GetWorkoutPlanView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GetWorkoutPlanSerializer
    lookup_field = "slug"

    def get_queryset(self) -> QuerySet:
        return self.request.user.workout_plans


class CreateWorkoutPlanView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CreateWorkoutPlanSerializer

    def perform_create(self, serializer: CreateWorkoutPlanSerializer) -> None:
        serializer.save(user=self.request.user)


class WorkoutActivityView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = WorkoutActivitySerializer
    filterset_fields = ['workout_plan__slug']
    
    def get_queryset(self) -> QuerySet:
        return self.request.user.workout_activities


class ExerciseView(generics.ListCreateAPIView):
    queryset = Exercise.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ExerciseSerializer
    
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
