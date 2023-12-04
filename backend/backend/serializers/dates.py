from rest_framework import serializers


class DateSerializer(serializers.Serializer):
    start_date = serializers.DateField()
    end_date = serializers.DateField()
