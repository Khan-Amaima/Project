# Create your views here.
from rest_framework import status
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

def index(request):
    return HttpResponse("Hello, You're at the Account index.")

class UserSignupView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
        
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = User.objects.filter(email=email).first()
        if user:
            return Response({'message' : 'User already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        username = email.split("@") 
        hashed_password = make_password(password)
        user = User.objects.create(
            username=username[0],
            email=email,
            password=hashed_password
        )

        token, created = Token.objects.get_or_create(user=user)
        serializer = UserGETSerializer(user)
        return Response({'token': token.key, 'user-info' : serializer.data}, status=status.HTTP_201_CREATED,)
  
class UserLoginView(generics.CreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = (AllowAny,)

    def post(self, request):

        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'message' : 'Email and password is required!'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(email=email).first()
        if user:
            username = user.username
            auth_user = authenticate(username=username, password=password)

            if auth_user:
                token, created = Token.objects.get_or_create(user=user)
                serializer = UserGETSerializer(user)
                return Response({'token': token.key, 'user-info': serializer.data}, status=status.HTTP_200_OK)
            else:
                # Authentication failed
                msg = 'Access denied: wrong email or password.'
                return Response({'message': msg}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'message' : 'User not found!'}, status=status.HTTP_400_BAD_REQUEST)
    
class UserLogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        user_token = Token.objects.filter(user=request.user).first()
        user_token.delete()
        return Response({"success": ("Successfully logged out.")}, status=status.HTTP_200_OK)


class UserDetailView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated] 

    def get(self, request):
        user = request.user
        serializer = UserGETSerializer(user)
        return Response({'user-info' : serializer.data}, status=status.HTTP_200_OK)

        