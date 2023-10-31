from django.contrib import admin
from .models import Car, CarBrand, FuelType, TransmissionType

# Register your models here.
admin.site.register(Car)
admin.site.register(CarBrand)
admin.site.register(FuelType)
admin.site.register(TransmissionType)
