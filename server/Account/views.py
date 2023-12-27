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
from .serializers import UserProfileSerializer, UserSerializer

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
        return Response({'token': token.key, 'user' : request.data}, status=status.HTTP_201_CREATED, headers=headers)
  
class UserLoginView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer

    def post(self, request, format=None):
        serializer = self.get_serializer(data=self.request.data,
            context={ 'request': self.request })
        serializer.is_valid(raise_exception=True)
        # user = serializer.validated_data['user']
        # login(request, user)
        return Response(request.data, status=status.HTTP_202_ACCEPTED)