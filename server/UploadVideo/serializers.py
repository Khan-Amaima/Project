from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Video, UserMediaFetch, UserMedia

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
    class Meta:
        model = UserMedia
        fields = '__all__'

class UserMediaVideoFetchSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    videos = VideoSerializer(many=True, read_only=True, source='video_set')
    primaryAudio = VideoSerializer(read_only=True)
    class Meta:
        model = UserMediaFetch
        fields = '__all__'