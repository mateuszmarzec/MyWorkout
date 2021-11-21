from django.db import models


class WorkoutPlanManager(models.Manager):
    def get_queryset(self) -> models.QuerySet:
        return super().get_queryset().filter(workout_plan__isnull=True)


class WorkoutActivityManager(models.Manager):
    def get_queryset(self) -> models.QuerySet:
        return super().get_queryset().filter(workout_plan__isnull=False)
