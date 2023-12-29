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
from .serializers import UserProfileSerializer, UserSerializer
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import logout
from rest_framework.permissions import IsAuthenticated

def index(request):
    return HttpResponse("Hello, You're at the Account index.")

class UserSignupView(generics.CreateAPIView):
  permission_classes = (AllowAny,)
  serializer_class = UserProfileSerializer

  def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        token, created = Token.objects.get_or_create(user=serializer.instance)
        return Response({'token': token.key, 'user-info' : {'username' : request.data['username'], 'email' : request.data['email']}}, status=status.HTTP_201_CREATED, headers=headers)
  
class UserLoginView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer

    def post(self, request, format=None):
        serializer = self.get_serializer(data=self.request.data,
            context={ 'request': self.request })
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user-info' : {'username' : request.data['username']}}, status=status.HTTP_202_ACCEPTED)
    
class UserLogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated] 

    def post(self, request):
        user_token = Token.objects.get(user=request.user)
        user_token.delete()        

        return Response({"success": ("Successfully logged out.")}, status=status.HTTP_200_OK)

class UserDetailView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated] 

    def get(self, request):

        try:
            user_token = Token.objects.get(user=request.user)
            serializer = UserProfileSerializer(request.user, many=False)
            return Response({'user-info' : {'username' : serializer.data['username'], 'email' : serializer.data['email']}}, status=status.HTTP_202_ACCEPTED)

        except Token.DoesNotExist:
            return Response({'error': 'Token does not exist'}, status=status.HTTP_404_NOT_FOUND)