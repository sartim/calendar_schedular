from rest_framework import serializers


class EventSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField()
    description = serializers.CharField()
    start = serializers.CharField()
    end = serializers.CharField()
