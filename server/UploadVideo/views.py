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
from django.conf import settings
from audio_extract import extract_audio
# Create your views here.
def index(request):
    return HttpResponse("Hello, You're at the upload video.")

class UploadVideoView(APIView):
    permission_classes = (AllowAny,)
    def post(self, request):
        email = request.data.get('email')
        title = request.data.get('title')
        description = request.data.get('description')
        primaryAudio = request.data.get('primaryAudio')
        videos = [x for x in request.FILES.values()]
        user = User.objects.filter(email=email).first()
        if not email: 
            return Response({'message' : 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)
        if not user:
            return Response({'message' : 'User no exists.'}, status=status.HTTP_400_BAD_REQUEST)
        if not videos:
            return Response({'message' : 'Please upload video.'}, status=status.HTTP_400_BAD_REQUEST)
        
        mediaObject = UserMedia.objects.create(
            title = title,
            description = description,
            primaryAudio = primaryAudio,
            user = user
        )

        # Create Video object in the database
        for singleVideo in videos:
            video_object = Video.objects.create(
                mediaObject=mediaObject,
                video=singleVideo,
            )
            
            video_name_split_slash = video_object.video.name.split('/')
            video_name_split_dot = video_name_split_slash[1].split('.')

            audio_path = f'user_audio/{video_name_split_dot[0]}audio.mp3'
            extracted_audio = extract_audio(
                input_path=f'{settings.BASE_MEDIA}/{video_object.video.name}',
                output_path=f'{settings.BASE_MEDIA}/{audio_path}'
            )

            video_object.audio = audio_path
            video_object.save()

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