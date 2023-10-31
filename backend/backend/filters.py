from django_filters import FilterSet, NumberFilter, CharFilter, BooleanFilter

from .models import Car


class CarFilter(FilterSet):
    price_min = NumberFilter(field_name="day_price", lookup_expr="gte")
    price_max = NumberFilter(field_name="day_price", lookup_expr="lte")
    brand = CharFilter(field_name="brand__name", lookup_expr="exact")
    model = CharFilter(field_name="model", lookup_expr="exact")
    transmission = CharFilter(field_name="transmission_type__name", lookup_expr="exact")
    fuel = CharFilter(field_name="fuel_type__name", lookup_expr="exact")

    class Meta:
        model = Car
        fields = ["taxi", "events", "racetrack"]
