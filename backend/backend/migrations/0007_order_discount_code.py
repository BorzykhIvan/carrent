# Generated by Django 4.2.6 on 2023-11-26 18:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='discount_code',
            field=models.CharField(null=True),
        ),
    ]
