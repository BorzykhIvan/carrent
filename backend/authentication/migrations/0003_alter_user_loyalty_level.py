# Generated by Django 4.2.6 on 2023-11-20 03:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_userlevel'),
        ('authentication', '0002_user_loyalty_level_user_loyalty_score_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='loyalty_level',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='users', to='backend.userlevel'),
        ),
    ]
