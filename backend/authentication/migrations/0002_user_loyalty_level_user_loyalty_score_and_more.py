# Generated by Django 4.2.6 on 2023-11-19 03:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_userlevel'),
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='loyalty_level',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='users', to='backend.userlevel'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='loyalty_score',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='user',
            name='referral_token',
            field=models.CharField(max_length=16, null=True, unique=True),
        ),
        migrations.AddField(
            model_name='user',
            name='referrer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='referrals', to=settings.AUTH_USER_MODEL),
        ),
    ]
