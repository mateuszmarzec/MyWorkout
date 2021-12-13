
from workouts.models import Exercise, WorkoutPlan
from rest_framework.serializers import ModelSerializer



class ExerciseSerializer(ModelSerializer):
    class Meta:
        model = Exercise
        fields = ("name",)


class WorkoutPlanSerializer(ModelSerializer):
    exercises = ExerciseSerializer(many=True)
    
    class Meta:
        model = WorkoutPlan
        fields = ("name", "exercises")
