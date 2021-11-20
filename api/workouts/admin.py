from django.contrib import admin

from workouts.models import WorkoutPlan, WorkoutActivity, Exercise, Muscle, WorkoutExercise


class WorkoutExerciseInline(admin.TabularInline):
    model = WorkoutExercise


@admin.register(WorkoutPlan)
class WorkoutPlanAdmin(admin.ModelAdmin):
    inlines = (WorkoutExerciseInline,)


@admin.register(WorkoutActivity)
class WorkoutActivityAdmin(admin.ModelAdmin):
    pass


@admin.register(Exercise)
class ExerciseAdmin(admin.ModelAdmin):
    pass


@admin.register(Muscle)
class MuscleAdmin(admin.ModelAdmin):
    pass
