# Generated by Django 5.0 on 2024-01-15 15:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UploadVideo', '0007_alter_usermedia_primaryaudio_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usermedia',
            name='primaryAudio',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='usermediafetch',
            name='primaryAudio',
            field=models.TextField(blank=True, null=True),
        ),
    ]
