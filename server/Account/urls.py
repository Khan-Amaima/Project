from django.urls import path
from . import views
from .views import UserSignupView
from .views import UserLoginView
from .views import UserLogoutView
from .views import UserDetailView

urlpatterns = [
    path("", views.index, name="index"),
    path('user-signup', UserSignupView.as_view()),
    path("user-login", UserLoginView.as_view()),
    path("user-logout", UserLogoutView.as_view()),
    path("user-detail", UserDetailView.as_view()),
]