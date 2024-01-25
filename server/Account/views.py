# Create your views here.
from rest_framework import status
from rest_framework import generics
from django.http import HttpResponse
from rest_framework import permissions
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from Account.serializers  import UserProfileSerializer, UserGETSerializer
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import logout
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from Account.models import UserProfile
from django.contrib.auth import update_session_auth_hash

def index(request):
    return HttpResponse("Hello, You're at the Account index.")

class UserSignupView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
        
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        first_name = request.data.get('name')
        user = User.objects.filter(email=email).first()
        if user:
            return Response({'success' : False, 'message' : 'User already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        username = email.split("@") 
        hashed_password = make_password(password)
        user = User.objects.create(
            username=username[0],
            first_name = first_name,
            email=email,
            password=hashed_password
        )

        userProfile = UserProfile.objects.create(
            user = user,
        )

        userProfile.save()

        token, created = Token.objects.get_or_create(user=user)
        serializer = UserGETSerializer(user)
        return Response({'success' : True, 'message' : 'User created successfully.', 'token': token.key, 'user-info' : serializer.data}, status=status.HTTP_201_CREATED,)
  
class UserLoginView(generics.CreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = (AllowAny,)

    def post(self, request):

        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'success' : False, 'message' : 'Email and password is required!'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(email=email).first()
        if user:
            username = user.username
            auth_user = authenticate(username=username, password=password)

            if auth_user:
                token, created = Token.objects.get_or_create(user=user)
                serializer = UserGETSerializer(user)
                return Response({'success' : True, 'message' : 'User login successfully.', 'token': token.key, 'user-info': serializer.data}, status=status.HTTP_200_OK)
            else:
                # Authentication failed
                msg = 'Wrong email or password.'
                return Response({'success' : False, 'message': msg}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'success' : False ,'message' : 'User not found!'}, status=status.HTTP_400_BAD_REQUEST)
    
class UserLogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        user_token = Token.objects.filter(user=request.user).first()
        user_token.delete()
        return Response({'success' : True, "message": "Successfully logged out."}, status=status.HTTP_200_OK)


class UserDetailView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated] 

    def get(self, request):
        user = request.user
        serializer = UserGETSerializer(user)
        return Response({'success' : True, "message": "User detail fetched Successfully.", 'user-info' : serializer.data}, status=status.HTTP_200_OK)

class UserUpdateProfileView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated] 

    def post(self, request):
        user = request.user
        print(request.data.get('name'))
        first_name = request.data.get('name')
        if first_name:
            user.first_name = first_name
            user.save()
        picture = [x for x in request.FILES.values()]
        profileObject = UserProfile.objects.get(user=user)
        if picture and picture[0]:
            if profileObject.profile_picture:
                profileObject.profile_picture.delete()
            profileObject.profile_picture = picture[0]
        profileObject.save()
        serializer = UserProfileSerializer(profileObject)
        return Response({'success' : True, "message": "Profile Updated Successfully.", 'data' : serializer.data}, status=status.HTTP_200_OK)

class UserGetProfileView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated] 

    def get(self, request):
        user = request.user
        profileObject = UserProfile.objects.get(user=user)
        serializer = UserProfileSerializer(profileObject)
        return Response({'success' : True, 'message' : 'User data fetched successfully', 'data' : serializer.data}, status=status.HTTP_200_OK)
    
class UserUpdatePasswordView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated] 

    def post(self, request):
        user = request.user
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        if not old_password:
            return Response({'success' : False, 'message' : 'Old password is required'}, status=status.HTTP_400_BAD_REQUEST)
        if not new_password:
            return Response({'success' : False, 'message' : 'New password is required'}, status=status.HTTP_400_BAD_REQUEST)

        if user.check_password(request.data.get('old_password')):
            user.set_password(request.data.get('new_password'))
            user.save()
            update_session_auth_hash(request, user)
            return Response({'success' : True, 'message': 'Password changed successfully.'}, status=status.HTTP_200_OK)
        return Response({'success' : False, 'message': 'Incorrect old password.'}, status=status.HTTP_400_BAD_REQUEST)