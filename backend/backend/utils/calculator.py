from ..models import Car


def calculate_price(user, car_id, start_date, end_date, discount_code=None):
    days = start_date - end_date + 1
    car = Car.objects.get(id=car_id)
    total_price = car.day_price * days

    # applying discounts
    total_price = total_price * (1 - (user.level.discount / 100))
    return total_price
