from django.urls import path
from . import views
from .views import UploadVideoView
from .views import GetVideoView
from .views import DeleteVideoView
from .views import GetAllUserVideosView

urlpatterns = [
    path("", views.index, name="index"),
    path("upload-video", UploadVideoView.as_view()),
    path("fetch-video/", GetVideoView.as_view(), name='fetch-video'),
    path("delete-video", DeleteVideoView.as_view()),
    path("fetch-all-video/", GetAllUserVideosView.as_view(), name='fetch-all-video'),
]