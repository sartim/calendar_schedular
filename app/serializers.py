from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField()
    description = serializers.CharField()
    start = serializers.CharField()
    end = serializers.CharField()

    class Meta:
        model = Event
        fields = ('id', 'title', 'description', 'start', 'end',)
