from datetime import date
from django.db.models import Q


from ..models import Order, Car


def get_occupied_slots(car_id: int) -> list[dict[str, date]]:
    today = date.today()
    orders = Order.objects.filter(
        Q(start_date__lte=today, end_date__gte=today) | Q(start_date__gte=today),
        car_id=car_id,
    )
    occupied_days = [
        {"start_date": order.start_date, "end_date": order.end_date} for order in orders
    ]
    return occupied_days


def is_car_available(car_id: int, start_date, end_date):
    occupied_dates = get_occupied_slots(car_id)
    for occupied_dict in occupied_dates:
        occupied_start = occupied_dict["occupied_start"]
        occupied_end = occupied_dict["occupied_end"]
        if (
            (occupied_start <= start_date <= occupied_end)
            or (occupied_start <= end_date <= occupied_end)
            or (start_date <= occupied_end and end_date >= occupied_end)
        ):
            return False
    return True
