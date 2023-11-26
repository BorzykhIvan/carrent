from datetime import date
from rest_framework import serializers
from ..models import Car, Order
from ..utils.order import is_car_available


class OrderSerializer(serializers.Serializer):
    start_date = serializers.DateField()
    end_date = serializers.DateField()
    discount_code = serializers.CharField(max_length=8, required=False)
    car = serializers.IntegerField()

    def validate_car(self, car):
        try:
            self.car_inst = Car.objects.get(id=car)
        except Car.DoesNotExist:
            raise serializers.ValidationError(f"Does not exist")
        return car

    def validate_start_date(self, start_date):
        today = date.today()
        if start_date < today:
            raise serializers.ValidationError("You can`t reservate for past time")
        return start_date

    def validate(self, data):
        if data["start_date"] > data["end_date"]:
            raise serializers.ValidationError(
                "Start date can`t be greater than end date"
            )
        car_status = is_car_available(
            start_date=data["start_date"], end_date=data["end_date"], car_id=data["car"]
        )
        if not car_status:
            raise serializers.ValidationError(
                "This car already have reservation for this period"
            )

        return data

    def calculate_price(self, user):
        days = (
            self.validated_data["end_date"] - self.validated_data["start_date"]
        ).days + 1

        # applying discounts
        total_price = float(self.car_inst.day_price * days)
        if 7 <= days < 14:
            total_price *= 0.9
        elif 14 <= days < 21:
            total_price *= 0.88
        elif days >= 21:
            total_price *= 0.85
        if user.is_authenticated:
            total_price = total_price * (1 - (user.loyalty_level.discount / 100))

        return total_price

    def create(self, validated_data):
        order = Order.objects.create(
            start_date=validated_data["start_date"],
            end_date=validated_data["end_date"],
            car=self.car_inst,
            user=validated_data["user"],
        )
        return order

    def to_representation(self, instance):
        response = {
            "start_date": instance.start_date,
            "end_date": instance.end_date,
            "car": instance.car.id,
            "discount_code": instance.discount_code,
        }
        return response
