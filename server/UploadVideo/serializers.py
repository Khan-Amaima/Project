from rest_framework import serializers
from .models import UserMedia

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMedia
        fields = ['id', 'user', 'video', 'title', 'description']