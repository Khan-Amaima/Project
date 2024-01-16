from django.db import models
from django.contrib.auth.models import User
# Create your models here.
 
class UserMedia(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.TextField()
    description = models.TextField()
    thumbnail = models.FileField(upload_to='video_thumbnail/', null=True)
    primaryAudio = models.OneToOneField('Video', null=True, on_delete=models.CASCADE)

class Video(models.Model):
    mediaObject = models.ForeignKey(UserMedia, on_delete=models.CASCADE)
    video = models.FileField(upload_to='user_video/')
    audio = models.FileField(upload_to='user_audio/', null=True)

class UserMediaFetch(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.TextField()
    videos = models.ForeignKey(UserMedia, on_delete=models.CASCADE)
    description = models.TextField()
    thumbnail = models.FileField(null=True)
    primaryAudio = models.OneToOneField('Video', null=True, on_delete=models.CASCADE)