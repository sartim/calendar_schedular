from django.conf.urls import include, url
from . import views

app_name = "app"

urlpatterns = [
    url(r'^$', views.calendar_schedule, name='calendar-schedule'),
    url(r'^$', views.calendar_data, name='calendar-data'),
]
