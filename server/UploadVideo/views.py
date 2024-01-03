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
from UploadVideo.serializers import UserMediaFetchSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

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
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        mediaObjects = UserMedia.objects.filter(user__username = user.username)
        serializer = UserMediaFetchSerializer(mediaObjects, many = True)
        
        return Response({"success": "Video data fetched successfully.", "data" : serializer.data}, status=status.HTTP_200_OK)

class DeleteVideoView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request):
        mediaObjectId = request.data.get('id')
        if not mediaObjectId:
            return Response({"message": "Item id is required"}, status=status.HTTP_400_BAD_REQUEST)
        retrieveMedia = UserMedia.objects.filter(id = mediaObjectId)
        if not retrieveMedia.first():
            return Response({"message": "Video is not retrieved."}, status=status.HTTP_400_BAD_REQUEST)
        retrieveMedia.delete()
        return Response({"success": "Video deleted successfully."}, status=status.HTTP_200_OK)