# Generated by Django 5.0 on 2024-01-16 13:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UploadVideo', '0011_alter_usermedia_primaryaudio_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='usermedia',
            name='thumbnail',
            field=models.FileField(null=True, upload_to='video_thumbnail/'),
        ),
        migrations.AddField(
            model_name='usermediafetch',
            name='thumbnail',
            field=models.FileField(null=True, upload_to=''),
        ),
    ]
