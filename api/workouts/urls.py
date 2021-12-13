from django.urls import include, path
from workouts.views import WorkoutPlanView

urlpatterns = [
    path("workout-plans", view=WorkoutPlanView.as_view(), name="workout-plan-view"),
]
