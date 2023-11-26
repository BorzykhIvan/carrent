from rest_framework import serializers


class ReservationSerializer(serializers.Serializer):
    start_date = serializers.DateField()
    end_date = serializers.DateField()
