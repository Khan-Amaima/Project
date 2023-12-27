from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    # date_of_birth = models.DateField(null=True, blank=True)
    # profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)

    # Add any other fields you need

    def __str__(self):
        return self.user.username