from django.conf.urls import url
from .views import calendar_schedule, calendar_data, EventViewSet

app_name = "app"

event = EventViewSet.as_view({'get': 'list', 'post': 'create'})
event_detail = EventViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})

urlpatterns = [
    url(r'^$', calendar_schedule, name='calendar-schedule'),
    url(r'^$', calendar_data, name='calendar-data'),
    url(r'^events/$', event, name='calendar-events'),
    url(r'^event/(?P<pk>[0-9]+)/$', event_detail, name="calendar-events-detail"),
]
