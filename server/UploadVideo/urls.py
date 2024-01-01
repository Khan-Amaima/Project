from django.urls import path
from . import views
from .views import UploadVideoView
from .views import GetVideoView

urlpatterns = [
    path("", views.index, name="index"),
    path("upload-video", UploadVideoView.as_view()),
    path("fetch-video", GetVideoView.as_view()),
]