from django.urls import include, path
from workouts.views import ListWorkoutPlanView, GetWorkoutPlanView, CreateWorkoutPlanView, ExerciseView, WorkoutActivityViewSet, CreateWorkoutActivityView, CreateWorkoutExerciseSetView, UpdateWorkoutExerciseSetView

urlpatterns = [
    path("workout-plans", view=ListWorkoutPlanView.as_view(), name="list-workout-plan-view"),
    path("workout-plans/<slug:slug>", view=GetWorkoutPlanView.as_view(), name="get-workout-plan-view"),
    path("add-workout-plans", view=CreateWorkoutPlanView.as_view(), name="create-workout-plan-view"),
    path("workout-activities", view=WorkoutActivityViewSet.as_view({'get': 'list'}), name="workout-activity-view"),
    path("workout-activities/<slug:slug>", view=WorkoutActivityViewSet.as_view({'get': 'retrieve'}), name="workout-activity-view"),
    path("add-workout-activities", view=CreateWorkoutActivityView.as_view(), name="create-workout-activity-view"),
    path("exercises", view=ExerciseView.as_view(), name="exercise-view"),
    path("add-workout-exercise-set", view=CreateWorkoutExerciseSetView.as_view(), name="add-workout-exercise-view"),
    path("workout-exercise-set/<int:pk>", view=UpdateWorkoutExerciseSetView.as_view(), name="update-workout-exercise-view")
]
