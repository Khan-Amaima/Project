from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth.forms import UserCreationForm
from rest_framework.validators import UniqueValidator

class UserProfileSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(
    required=True,
    validators=[UniqueValidator(queryset=User.objects.all())]
  )
  class Meta:
    model = User
    fields = ('username', 'password', 'email')
    extra_kwargs = {
      'username': {'required': True},
    }
  def create(self, validated_data):
    user = User.objects.create(
      username=validated_data['username'],
      email=validated_data['email'],
    )
    user.set_password(validated_data['password'])
    user.save()
    return user
  
class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        label="Username",
        write_only=True
    )
    password = serializers.CharField(
        label="Password",
        style={'input_type': 'password'},
        trim_whitespace=False,
        write_only=True
    )

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
    
    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            user = authenticate(request=self.context.get('request'), username=username, password=password)
            if not user:
                msg = 'Access denied: wrong username or password.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Both "username" and "password" are required.'
            raise serializers.ValidationError(msg, code='authorization')
        attrs['user'] = user
        return attrs