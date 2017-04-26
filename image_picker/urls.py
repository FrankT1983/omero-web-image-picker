#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.conf.urls import url, patterns

from . import views


urlpatterns = patterns('',
    url(r'^(?i)index/$', 'image_picker.views.index'),
    url(r'^$', 'image_picker.views.index'),
    url(r'^(?i)getThumbAddress/(?P<imageId>[0-9]+)/$', 'image_picker.views.getThumbAddress' , name="getThumbAddress"),
)
