from django.db.models.query import QuerySet
from rest_framework import generics, filters, viewsets
from rest_framework.permissions import IsAuthenticated
from workouts.models import WorkoutPlan, WorkoutActivity, Exercise, WorkoutExerciseSet
from workouts.serializers import ListWorkoutPlanSerializer, GetWorkoutPlanSerializer, CreateWorkoutPlanSerializer, ExerciseSerializer, ListWorkoutActivitySerializer, CreateWorkoutActivitySerializer, CreateWorkoutExerciseSetSerializer, UpdateWorkoutExerciseSetSerializer


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


class WorkoutActivityViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ListWorkoutActivitySerializer
    filterset_fields = ['workout_plan__slug']
    lookup_field = "slug"
    
    def get_queryset(self) -> QuerySet:
        return self.request.user.workout_activities


class CreateWorkoutActivityView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CreateWorkoutActivitySerializer

    def perform_create(self, serializer: CreateWorkoutActivitySerializer) -> None:
        serializer.save(user=self.request.user)


class CreateWorkoutExerciseSetView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CreateWorkoutExerciseSetSerializer


class UpdateWorkoutExerciseSetView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UpdateWorkoutExerciseSetSerializer

    def get_queryset(self) -> QuerySet:
        return WorkoutExerciseSet.objects.filter(workout_exercise__workout__user=self.request.user)


class ExerciseView(generics.ListCreateAPIView):
    queryset = Exercise.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ExerciseSerializer
    
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
