from django.db import models
from datetime import datetime


class WorkoutPlanManager(models.Manager):
    def get_queryset(self) -> models.QuerySet:
        return super().get_queryset().filter(workout_plan__isnull=True)


class WorkoutActivityManager(models.Manager):

    def create(self, *args, **kwargs) -> any:
        if not kwargs.get('name'):
            kwargs['name'] = f"{kwargs['workout_plan'].name}-{datetime.now()}"

        return super().create(*args, **kwargs)


    def get_queryset(self) -> models.QuerySet:
        return super().get_queryset().filter(workout_plan__isnull=False)
