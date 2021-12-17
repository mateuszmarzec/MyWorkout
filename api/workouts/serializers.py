
from django.db import transaction
from workouts.models import Exercise, WorkoutPlan, WorkoutActivity, WorkoutExercise, WorkoutExerciseSet
from rest_framework.serializers import PrimaryKeyRelatedField, SlugRelatedField, ModelSerializer, Serializer, CharField, ValidationError
from datetime import datetime
from django.db.models.query import QuerySet


class ExerciseSerializer(ModelSerializer):
    class Meta:
        model = Exercise
        fields = ("name", "slug", "id")


class WorkoutExerciseSetSerializer(ModelSerializer):
    class Meta:
        model = WorkoutExerciseSet
        fields = ("reps", "weight", "id")


class WorkoutExerciseSerializer(ModelSerializer):
    sets =  WorkoutExerciseSetSerializer(many=True)
    exercise = ExerciseSerializer()

    class Meta:
        model = WorkoutExercise
        fields = ("id", "sets", "exercise")


class ListWorkoutActivitySerializer(ModelSerializer):
    workoutexercise_set = WorkoutExerciseSerializer(many=True, read_only=True)
    workout_plan = SlugRelatedField(
        slug_field='name',
        read_only=True
    )
    
    class Meta:
        model = WorkoutActivity
        fields = ("id", "name", "slug", "workoutexercise_set", "workout_plan", "created")


class WorkoutPlanSlugRelatedField(SlugRelatedField):
    def get_queryset(self) -> QuerySet:
        user = self.context['request'].user
        return WorkoutPlan.objects.filter(user=user)


class CreateWorkoutActivitySerializer(ModelSerializer):
    name = CharField(read_only=True)
    workout_plan = WorkoutPlanSlugRelatedField(
        slug_field="slug",
        queryset=WorkoutPlan.objects.all()
    )
    
    class Meta:
        model = WorkoutActivity
        fields = ("workout_plan", "id", "slug", "name")


class ListWorkoutPlanSerializer(ModelSerializer):
    exercises = ExerciseSerializer(many=True)
    
    class Meta:
        model = WorkoutPlan
        fields = ("id", "name", "slug", "exercises")


class GetWorkoutPlanSerializer(ModelSerializer):
    workouts = ListWorkoutActivitySerializer(many=True)
    
    class Meta:
        model = WorkoutPlan
        fields = ("id", "name", "slug", "workouts")


class CreateWorkoutPlanSerializer(ModelSerializer):
    exercises = PrimaryKeyRelatedField(many=True, queryset=Exercise.objects.all())
    
    class Meta:
        model = WorkoutPlan
        fields = ("id", "name", "slug", "exercises")


class WorkoutExerciseSlugRelatedField(PrimaryKeyRelatedField):
    def get_queryset(self) -> QuerySet:
        user = self.context['request'].user
        return WorkoutExercise.objects.filter(workout__user=user)


class CreateWorkoutExerciseSetSerializer(ModelSerializer):
    workout_exercise = WorkoutExerciseSlugRelatedField()

    class Meta:
        model = WorkoutExerciseSet
        fields = ("reps", "weight", "id", "workout_exercise")


class UpdateWorkoutExerciseSetSerializer(ModelSerializer):
    class Meta:
        model = WorkoutExerciseSet
        fields = ("reps", "weight", "id")
