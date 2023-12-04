from datetime import date
from rest_framework import serializers
from ..models import Car, Order
from ..utils.order import is_car_available
from .cars import CarSerializer
from .users import UserSerializer


class CreateOrderSerializer(serializers.ModelSerializer):
    car_id = serializers.IntegerField(source="car.id")
    discount_code = serializers.CharField(max_length=8, required=False)
    user_id = serializers.IntegerField(source="user.id", read_only=True)

    def validate_car_id(self, car_id):
        try:
            car_inst = Car.objects.get(id=car_id)
        except Car.DoesNotExist:
            raise serializers.ValidationError(f"Does not exist")
        self.context["car_inst"] = car_inst
        return car_id

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
            start_date=data["start_date"],
            end_date=data["end_date"],
            car_id=data["car"]["id"],
        )
        if not car_status:
            raise serializers.ValidationError(
                "This car already have reservation for this period"
            )

        return data

    def calculate_price(self):
        days = (
            self.validated_data["end_date"] - self.validated_data["start_date"]
        ).days + 1
        user = self.context["user"]
        # applying discounts
        car_inst = self.context["car_inst"]
        total_price = float(car_inst.day_price * days)
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
        amount = self.calculate_price()
        order = Order.objects.create(
            start_date=validated_data["start_date"],
            end_date=validated_data["end_date"],
            car=self.context["car_inst"],
            user=self.context["user"],
            amount=amount,
        )
        return order

    class Meta:
        model = Order
        fields = ["id", "start_date", "end_date", "car_id", "discount_code", "user_id"]
        read_only_fields = ["id", "car_id", "user_id"]


class ListOrderSerializer(serializers.ModelSerializer):
    car = CarSerializer()
    user = UserSerializer()

    class Meta:
        model = Order
        fields = [
            "id",
            "start_date",
            "end_date",
            "car",
            "discount_code",
            "user",
            "amount",
        ]
