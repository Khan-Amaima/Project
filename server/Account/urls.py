from django.urls import path
from . import views
from .views import UserSignupView
from .views import UserLoginView
from .views import UserLogoutView
from .views import UserDetailView
from .views import UserUpdateProfileView
from .views import UserGetProfileView

urlpatterns = [
    path("", views.index, name="index"),
    path('user-signup', UserSignupView.as_view()),
    path("user-login", UserLoginView.as_view()),
    path("user-logout", UserLogoutView.as_view()),
    path("user-detail", UserDetailView.as_view()),
    path("update-profile", UserUpdateProfileView.as_view()),
    path("get-profile", UserGetProfileView.as_view()),
]