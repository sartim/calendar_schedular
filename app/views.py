# -*- coding: utf-8 -*-
from __future__ import unicode_literals


import calendar
import datetime
from datetime import timezone
from django.http import HttpResponse
from django.shortcuts import render
from django.template.response import TemplateResponse

from app.models import Event


def calendar_schedule(request):
    query_list = Event.objects.all()
    context = {
        'events': query_list
    }
    return render(request, 'app/calendar.html', context)


def calendar_edit(request):
    id = request.POST.get("id")
    events = Event.objects.get(pk=id)

    context = {
        'events': events,
    }
    tr = TemplateResponse(request, 'app/calendar_event_resp.html', context)
    tr.render()
    data = tr.content
    return HttpResponse(data)


def calendar_data(request):
    context = {}
    tr = TemplateResponse(request, 'app/calendar_event_resp.html', context)
    tr.render()
    data = tr.content
    return HttpResponse(data)


def calculate_date_time(request):
    never_ends = ''
    daily = request.POST.get("daily")
    weekly = request.POST.get("weekly")
    monthly = request.POST.get("monthly")
    yearly = request.POST.get("yearly")

    title = request.POST.get('title')  # POSTed title
    description = request.POST.get('description')  # POSTed description
    sdt = request.POST.get('start_date').encode('ascii', 'ignore')  # POSTed start date time

    sd = sdt.split()  # split start date time
    st = sd[0]  # start date
    ssep = st.split('-')
    sli = map(int, ssep)
    sy = sli[0]  # start year
    sm = sli[1]  # start month
    sd = sli[2]  # start day
    edt = request.POST.get('end').encode('ascii', 'ignore')  # end date tim
    ed = edt.split()  # split end date time
    et = ed[0]  # end date
    ett = ed[1]  # end time
    esep = et.split('-')
    eli = map(int, esep)
    ey = eli[0]  # end year
    em = eli[1]  # end month
    ed = eli[2]  # end day
    occurrence = request.POST.get('occurence')
    print(occurrence)

    mon = request.POST.get('mon')
    if mon is None:
        mon = None
    else:
        mon = int(mon.encode('ascii', 'ignore'))
    print(mon)

    tue = request.POST.get('tue')
    if tue is None:
        tue = None
    else:
        tue = int(tue.encode('ascii', 'ignore'))
    print(tue)

    wed = request.POST.get('wed')
    if wed is None:
        wed = None
    else:
        wed = int(wed.encode('ascii', 'ignore'))
    print(wed)

    thu = request.POST.get('thu')
    if thu is None:
        thu = None
    else:
        thu = int(thu.encode('ascii', 'ignore'))
    print(thu)

    fri = request.POST.get('fri')
    if fri is None:
        fri = None
    else:
        fri = int(fri.encode('ascii', 'ignore'))
    print(fri)

    sat = request.POST.get('sat')
    if sat is None:
        sat = None
    else:
        sat = int(sat.encode('ascii', 'ignore'))
    print(sat)

    sun = request.POST.get('sun')
    if sun is None:
        sun = None
    else:
        sun = int(sun.encode('ascii', 'ignore'))
    print(sun)

    today = timezone.datetime.today()  # Get current day date
    curr_year = today.year  # Get current day year
    curr_month = today.month  # Get current day month
    curr_day = today.day  # Get current day day

    begin_start = datetime.datetime.strptime(sdt, '%Y-%m-%d  %H:%M:%S')
    end_b = datetime.datetime.strptime(edt, '%Y-%m-%d  %H:%M:%S')

    end_start = datetime.datetime.strptime(st + ' ' + ett, '%Y-%m-%d  %H:%M:%S')
    end_e = datetime.datetime.strptime(edt, '%Y-%m-%d  %H:%M:%S')

    # Start dates
    next_day_start = begin_start
    next_day_end = end_start

    if request.method == 'POST':
        pass

    return HttpResponse("")

