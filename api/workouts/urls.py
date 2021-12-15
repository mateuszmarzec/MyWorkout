from django.urls import include, path
from workouts.views import ListWorkoutPlanView, GetWorkoutPlanView, CreateWorkoutPlanView, ExerciseView, WorkoutActivityView

urlpatterns = [
    path("workout-plans", view=ListWorkoutPlanView.as_view(), name="list-workout-plan-view"),
    path("workout-plans/<slug:slug>", view=GetWorkoutPlanView.as_view(), name="get-workout-plan-view"),
    path("add-workout-plans", view=CreateWorkoutPlanView.as_view(), name="create-workout-plan-view"),
    path("workout-activities", view=WorkoutActivityView.as_view(), name="workout-activity-view"),
    path("exercises", view=ExerciseView.as_view(), name="exercise-view"),
]
