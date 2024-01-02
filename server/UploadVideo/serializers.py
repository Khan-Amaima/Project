from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Video, UserMediaFetch

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'

class UserMediaFetchSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    videos = VideoSerializer(many=True, read_only=True, source='video_set')
    class Meta:
        model = UserMediaFetch
        fields = '__all__'