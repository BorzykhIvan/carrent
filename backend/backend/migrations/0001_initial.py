# Generated by Django 4.2.6 on 2023-10-26 01:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Car',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('model', models.CharField(max_length=50)),
                ('day_price', models.DecimalField(decimal_places=2, max_digits=7)),
            ],
        ),
        migrations.CreateModel(
            name='CarBrand',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=24, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='FuelType',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='TransmissionType',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='CarImage',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('image_url', models.URLField()),
                ('car', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='backend.car')),
            ],
        ),
        migrations.AddField(
            model_name='car',
            name='brand',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.carbrand'),
        ),
        migrations.AddField(
            model_name='car',
            name='fuel_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.fueltype'),
        ),
        migrations.AddField(
            model_name='car',
            name='transmission_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.transmissiontype'),
        ),
    ]
