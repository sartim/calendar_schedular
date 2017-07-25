# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class Event(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
