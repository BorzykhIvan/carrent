from rest_framework.serializers import (
    Serializer,
    CharField,
    DecimalField,
    IntegerField,
    ImageField,
    BooleanField,
)


from ..utils.files import upload_to_bucket

from ..models import Car, CarBrand, FuelType, TransmissionType


class CarSerializer(Serializer):
    id = IntegerField(read_only=True)
    brand = CharField(max_length=24)
    model = CharField(max_length=50)
    transmission_type = CharField(max_length=50)
    day_price = DecimalField(max_digits=7, decimal_places=2)
    fuel_type = CharField(max_length=50)
    image = ImageField(source="image_url")
    taxi = BooleanField(required=False)
    events = BooleanField(required=False)
    racetrack = BooleanField(required=False)

    def create(self, validated_data):
        brand_data = validated_data.pop("brand")
        brand, created = CarBrand.objects.get_or_create(name=brand_data)

        transmission_data = validated_data.pop("transmission_type")
        transmission, created = TransmissionType.objects.get_or_create(
            name=transmission_data
        )

        fuel_data = validated_data.pop("fuel_type")
        fuel, created = FuelType.objects.get_or_create(name=fuel_data)

        image_data = validated_data.pop("image_url")
        image_urls = upload_to_bucket(
            files=image_data, path="images/", bucket="carrentbucket"
        )

        car = Car.objects.create(
            brand=brand,
            transmission_type=transmission,
            fuel_type=fuel,
            image_url=image_urls[0],
            **validated_data,
        )
        return car

    def update(self, instance, validated_data):
        brand_data = validated_data.get("brand")
        if brand_data:
            brand, created = CarBrand.objects.get_or_create(name=brand_data)
            validated_data["brand"] = brand

        transmission_data = validated_data.get("transmission_type")
        if transmission_data:
            transmission, created = TransmissionType.objects.get_or_create(
                name=transmission_data
            )
            validated_data["transmission_type"] = transmission

        fuel_data = validated_data.get("fuel_type")
        if fuel_data:
            fuel, created = FuelType.objects.get_or_create(name=fuel_data)
            validated_data["fuel_type"] = fuel

        image_data = validated_data.get("image_url")
        if image_data:
            image_urls = upload_to_bucket(
                files=image_data, path="images/", bucket="carrentbucket"
            )
            validated_data.image_url = image_urls[0]

        for key, val in validated_data.items():
            setattr(instance, key, val)

        instance.save()
        return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation.pop("image")
        representation["image_url"] = instance.image_url
        return representation
