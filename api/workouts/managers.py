from django.db import models
from django.db.models import QuerySet


class WorkoutPlanManager(models.Manager):
    def get_queryset(self) -> QuerySet:
        return super().get_queryset().filter(workout_plan__isnull=True)


class WorkoutActivityManager(models.Manager):
    def get_queryset(self) -> QuerySet:
        return super().get_queryset().filter(workout_plan__isnull=False)
