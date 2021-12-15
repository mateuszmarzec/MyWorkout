
from django.db import transaction
from workouts.models import Exercise, WorkoutPlan, WorkoutActivity, WorkoutExercise, WorkoutExerciseSet
from rest_framework.serializers import PrimaryKeyRelatedField, SlugRelatedField, ModelSerializer



class ExerciseSerializer(ModelSerializer):
    class Meta:
        model = Exercise
        fields = ("name", "slug", "id")


class WorkoutExerciseSetSerializer(ModelSerializer):
    class Meta:
        model = WorkoutExerciseSet
        fields = ("reps", "weight")


class WorkoutExerciseSerializer(ModelSerializer):
    sets =  WorkoutExerciseSetSerializer(many=True)
    exercise = ExerciseSerializer()

    class Meta:
        model = WorkoutExercise
        fields = ("id", "sets", "exercise")


class WorkoutActivitySerializer(ModelSerializer):
    workoutexercise_set = WorkoutExerciseSerializer(many=True)
    workout_plan = SlugRelatedField(
        read_only=True,
        slug_field='name'
     )
    
    class Meta:
        model = WorkoutActivity
        fields = ("id", "name", "slug", "workoutexercise_set", "workout_plan", "created")


class ListWorkoutPlanSerializer(ModelSerializer):
    exercises = ExerciseSerializer(many=True)
    
    class Meta:
        model = WorkoutPlan
        fields = ("id", "name", "slug", "exercises")


class GetWorkoutPlanSerializer(ModelSerializer):
    workouts = WorkoutActivitySerializer(many=True)
    
    class Meta:
        model = WorkoutPlan
        fields = ("id", "name", "slug", "workouts")


class CreateWorkoutPlanSerializer(ModelSerializer):
    exercises = PrimaryKeyRelatedField(many=True, queryset=Exercise.objects.all())
    
    class Meta:
        model = WorkoutPlan
        fields = ("id", "name", "slug", "exercises")
