#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.views import generic
from django.core.urlresolvers import reverse
import json


# to test this stuff withou using an actuall omero instance / install
try:
    from omeroweb.webclient.decorators import login_required
    from omero.gateway import BlitzGateway
    import omero
    from image_picker.classes.HistoryFromOmero import HistoryFromOmero

    history_getter = HistoryFromOmero()

except:
    from image_picker.classes.FakeHierarchy import  FakeHierarchy
    history_getter = FakeHierarchy()


    # mock the login_required attribute
    # not perfect, since each no parameter name has to be added by hand
    def login_required():
        def wrapp1(func):
            def wrap_for_local_login_required(params, fileId=None, portId=None, imageId=None , datasetId=None):
                return func(params, fileId=fileId, portId=portId, datasetId=datasetId , imageId = imageId)

            return wrap_for_local_login_required

        return wrapp1

import logging


logger = logging.getLogger(__name__)


@login_required()
def index(request,  conn=None, **kwargs ):
    hist = history_getter.getHierarchyFromAllGroups(conn)
    return render(request, 'image_picker/test_page.html',
                  {
                      'full_hierarchy':json.dumps(hist),
                  })

@login_required()
def getThumbAddress(request,imageId , conn=None, **kwargs ):
    url = history_getter.getThumbNail(conn,imageId)
    return HttpResponse(url)