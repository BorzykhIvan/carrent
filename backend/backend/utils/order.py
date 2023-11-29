from datetime import date
from django.db.models import Q


from ..models import Order, Car


def get_occupied_slots(car_id: int) -> list[Order]:
    today = date.today()
    orders = Order.objects.filter(
        Q(start_date__lte=today, end_date__gte=today) | Q(start_date__gte=today),
        car_id=car_id,
    ).all()
    return orders


def is_car_available(car_id: int, start_date, end_date):
    orders = get_occupied_slots(car_id)
    for order in orders:
        if (
            (order.start_date <= start_date <= order.end_date)
            or (order.start_date <= end_date <= order.end_date)
            or (start_date <= order.end_date <= end_date)
        ):
            return False
    return True
