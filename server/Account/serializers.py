from rest_framework import serializers
from django.contrib.auth.models import User
from Account.models import UserProfile
from django.db import models

class UserGETSerializer(serializers.ModelSerializer):
  # first_name = UserForm.CharField(max_length=300, null=True, blank=True)
  class Meta:
    model = User
    fields = ['id', 'email', 'first_name']

class UserProfileSerializer(serializers.ModelSerializer):
  user = UserGETSerializer()
  profile_picture = serializers.ImageField(allow_null=True, use_url=True)
  class Meta:
    model = UserProfile
    fields = '__all__'

