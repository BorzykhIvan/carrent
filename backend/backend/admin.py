from django.contrib import admin
from .models import (
    Car,
    CarBrand,
    FuelType,
    TransmissionType,
    UserLevel,
    Chat,
    Message,
    Order,
)


class CarConfig(admin.ModelAdmin):
    list_display = ["id", "brand", "model", "day_price", "taxi", "events", "racetrack"]


class CarBrandConfig(admin.ModelAdmin):
    list_display = ["id", "name"]


class FuelTypeConfig(admin.ModelAdmin):
    list_display = ["id", "name"]


class TransmissionTypeConfig(admin.ModelAdmin):
    list_display = ["id", "name"]


class UserLevelConfig(admin.ModelAdmin):
    list_display = ["id", "name", "level", "discount"]


class ChatConfig(admin.ModelAdmin):
    list_display = ["id", "user"]


class MessageConfig(admin.ModelAdmin):
    list_display = ["id", "chat", "content", "is_admin", "date"]


class OrderConfig(admin.ModelAdmin):
    list_display = [
        "id",
        "get_car",
        "get_user",
        "discount_code",
        "start_date",
        "end_date",
    ]

    @admin.display(description="car")
    def get_car(self, obj):
        return f"{obj.car.brand.name} {obj.car.model} ({obj.car.id})"

    @admin.display(description="user")
    def get_user(self, obj):
        return f"{obj.user.get_full_name()} ({obj.id})"


# Register your models here.
admin.site.register(Car, CarConfig)
admin.site.register(CarBrand, CarBrandConfig)
admin.site.register(FuelType, FuelTypeConfig)
admin.site.register(TransmissionType, TransmissionTypeConfig)
admin.site.register(UserLevel, UserLevelConfig)
admin.site.register(Chat, ChatConfig)
admin.site.register(Message, MessageConfig)
admin.site.register(Order, OrderConfig)
