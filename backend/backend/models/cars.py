from django.db import models


# Create your models here.
class CarBrand(models.Model):
    id = models.AutoField(primary_key=True)

    name = models.CharField(max_length=24, unique=True)

    def __str__(self):
        return str(self.name)


class TransmissionType(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return str(self.name)


class FuelType(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return str(self.name)


class Car(models.Model):
    id = models.AutoField(primary_key=True)
    brand = models.ForeignKey(CarBrand, on_delete=models.CASCADE)
    model = models.CharField(max_length=50)
    transmission_type = models.ForeignKey(TransmissionType, on_delete=models.CASCADE)
    day_price = models.DecimalField(max_digits=7, decimal_places=2)
    fuel_type = models.ForeignKey(FuelType, on_delete=models.CASCADE)
    image_url = models.URLField()
    taxi = models.BooleanField(default=False)
    events = models.BooleanField(default=False)
    racetrack = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.brand} {self.model}"
