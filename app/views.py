# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render


def calendar_schedule(request):
    context = {}
    return render(request, 'app/calendar.html', context)
