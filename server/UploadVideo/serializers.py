from rest_framework import serializers

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User