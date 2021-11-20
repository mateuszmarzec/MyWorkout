from django.contrib import admin

from workouts.models import (
    Exercise,
    Muscle,
    WorkoutActivity,
    WorkoutExercise,
    WorkoutExerciseSet,
    WorkoutPlan,
)


class WorkoutExerciseInline(admin.TabularInline):
    model = WorkoutExercise
    extra = 1


class WorkoutExerciseSetInline(admin.TabularInline):
    model = WorkoutExerciseSet
    extra = 1


@admin.register(WorkoutPlan)
class WorkoutPlanAdmin(admin.ModelAdmin):
    inlines = (WorkoutExerciseInline,)
    exclude = ("workout_plan",)


@admin.register(WorkoutActivity)
class WorkoutActivityAdmin(admin.ModelAdmin):
    inlines = (WorkoutExerciseInline,)


@admin.register(WorkoutExercise)
class WorkoutExerciseAdmin(admin.ModelAdmin):
    inlines = (WorkoutExerciseSetInline,)


@admin.register(WorkoutExerciseSet)
class WorkoutExerciseSetAdmin(admin.ModelAdmin):
    pass


@admin.register(Exercise)
class ExerciseAdmin(admin.ModelAdmin):
    pass


@admin.register(Muscle)
class MuscleAdmin(admin.ModelAdmin):
    pass
