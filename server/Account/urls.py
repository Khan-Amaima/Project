from django.urls import path
from . import views
from .views import UserSignupView
from .views import UserLoginView

urlpatterns = [
    path("", views.index, name="index"),
    path('user-signup', UserSignupView.as_view()),
    path("user-login", UserLoginView.as_view()),
]