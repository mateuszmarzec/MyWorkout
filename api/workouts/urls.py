from django.urls import include, path
from workouts.views import WorkoutPlanView, CreateWorkoutPlanView, ExerciseView

urlpatterns = [
    path("workout-plans", view=WorkoutPlanView.as_view(), name="workout-plan-view"),
    path("add-workout-plans", view=CreateWorkoutPlanView.as_view(), name="create-workout-plan-view"),
    path("exercises", view=ExerciseView.as_view(), name="exercise-view"),
]
