from django.contrib.auth import get_user_model
from django.db import models

from workouts.managers import WorkoutActivityManager, WorkoutPlanManager

User = get_user_model()


class Workout(models.Model):
    name = models.CharField(max_length=200)
    exercises = models.ManyToManyField(
        to="Exercise",
        through="WorkoutExercise",
        through_fields=("workout", "exercise"),
    )
    workout_plan = models.ForeignKey(
        to="self",
        on_delete=models.SET_NULL,
        related_name="workouts",
        null=True,
        blank=True,
    )
    note = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    user = models.ForeignKey(
        to=User, on_delete=models.CASCADE, related_name="workouts"
    )

    def __str__(self) -> str:
        return f"{self.name} - User: {self.user}"


class WorkoutPlan(Workout):
    """This proxy model defines WORKOUT PLAN, not actual user activity"""

    objects = WorkoutPlanManager()

    class Meta:
        verbose_name = "workout plan"
        verbose_name_plural = "workout plans"
        proxy = True


class WorkoutActivity(Workout):
    """This proxy models defines WORKOUT ACTIVITY, so every user training"""

    objects = WorkoutActivityManager()

    class Meta:
        verbose_name = "workout activity"
        verbose_name_plural = "workout activities"
        proxy = True


class WorkoutExercise(models.Model):
    workout = models.ForeignKey(to=Workout, on_delete=models.CASCADE)
    exercise = models.ForeignKey(to="Exercise", on_delete=models.CASCADE)

    class Meta:
        verbose_name = "workout exercise"
        verbose_name_plural = "workout exercises"

    def __str__(self) -> str:
        return f"{self.workout.name} - Exercise: {self.exercise}"


class WorkoutExerciseSet(models.Model):
    workout_exercise = models.ForeignKey(
        to=WorkoutExercise, on_delete=models.CASCADE, related_name="sets"
    )
    reps = models.SmallIntegerField()
    weight = models.DecimalField(decimal_places=1, max_digits=4)

    class Meta:
        verbose_name = "workout exercise set"
        verbose_name_plural = "workout exercise sets"

    def __str__(self) -> str:
        return f"{self.workout_exercise} - Reps: {self.reps} - Weight: {self.weight}kg"


class Muscle(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name = "muscle"
        verbose_name_plural = "muscles"

    def __str__(self) -> str:
        return self.name


class Exercise(models.Model):
    name = models.CharField(max_length=100)
    target = models.ForeignKey(
        to=Muscle, on_delete=models.CASCADE, related_name="exercises"
    )

    class Meta:
        verbose_name = "exercise"
        verbose_name_plural = "exercises"

    def __str__(self) -> str:
        return self.name
