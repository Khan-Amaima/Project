from django.db import models
from django.contrib.auth.models import User
# Create your models here.
 
class UserMedia(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.TextField()
    description = models.TextField()
    primaryAudio = models.IntegerField(null=True)

class Video(models.Model):
    mediaObject = models.ForeignKey(UserMedia, on_delete=models.CASCADE)
    video = models.FileField(upload_to='user_video/')
    audio = models.FileField(upload_to='user_audio/', null=True)

class UserMediaFetch(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.TextField()
    videos = models.ForeignKey(UserMedia, on_delete=models.CASCADE)
    description = models.TextField()
    primaryAudio = models.TextField(null=True)