# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import datetime
from datetime import timezone
from django.shortcuts import render
from app.models import Event

def calendar_schedule(request):
    query_list = Event.objects.all();
    context = {
        'events': query_list
    }
    return render(request, 'app/calendar.html', context)
