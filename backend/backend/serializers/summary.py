from rest_framework import serializers

from ..models import Car
from dateutil import relativedelta


class SummarySerializer(serializers.Serializer):
    start_date = serializers.DateField()
    end_date = serializers.DateField()
    discount_code = serializers.CharField(max_length=8, required=False)
    car = serializers.IntegerField()

    def validate_car(self, car):
        try:
            self.car = Car.objects.get(id=car)
        except Car.DoesNotExist:
            raise serializers.ValidationError(f"Does not exist")

    def calculate_price(self, user):
        days = (
            self.validated_data["end_date"] - self.validated_data["start_date"]
        ).days + 1

        # applying discounts
        total_price = float(self.car.day_price * days)
        if 7 <= days < 14:
            total_price *= 0.9
        elif 14 <= days < 21:
            total_price *= 0.88
        elif days >= 21:
            total_price *= 0.85
        if user.is_authenticated:
            total_price = total_price * (1 - (user.loyalty_level.discount / 100))

        return total_price
