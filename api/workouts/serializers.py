
from django.db import transaction
from workouts.models import Exercise, WorkoutPlan
from rest_framework.serializers import PrimaryKeyRelatedField, ModelSerializer



class ExerciseSerializer(ModelSerializer):
    class Meta:
        model = Exercise
        fields = ("name", "id")


class WorkoutPlanSerializer(ModelSerializer):
    exercises = ExerciseSerializer(many=True)
    
    class Meta:
        model = WorkoutPlan
        fields = ("id", "name", "exercises")


class CreateWorkoutPlanSerializer(ModelSerializer):
    exercises = PrimaryKeyRelatedField(many=True, queryset=Exercise.objects.all())
    
    class Meta:
        model = WorkoutPlan
        fields = ("id", "name", "exercises")

