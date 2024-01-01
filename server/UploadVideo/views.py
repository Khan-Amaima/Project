from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework import status
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from .models import UserMedia
from .models import Video

# Create your views here.
def index(request):
    return HttpResponse("Hello, You're at the upload video.")

class UploadVideoView(APIView):
    permission_classes = (AllowAny,)
    def post(self, request):
        username = request.data.get('username')
        title = request.data.get('title')
        description = request.data.get('description')
        videos = [x for x in request.FILES.values()]
        if not username: 
            return Response({'message' : 'User name is required.'}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.filter(username=username).first()
        if not user:
            return Response({'message' : 'User no exists.'}, status=status.HTTP_400_BAD_REQUEST)
        if not videos:
            return Response({'message' : 'Please upload video.'}, status=status.HTTP_400_BAD_REQUEST)
        mediaObject = UserMedia.objects.create(
            title = title,
            description = description,
            user = user
        )

        for singleVideo in videos:
            Video.objects.create(
                mediaObject = mediaObject,
                video = singleVideo
            )

        return Response({"success": "Video upload successfully."}, status=status.HTTP_200_OK)
    
class GetVideoView(APIView):
    permission_classes = (AllowAny,)
    def get(self, request):
        return Response({"success": "Video data fetched successfully."}, status=status.HTTP_200_OK)