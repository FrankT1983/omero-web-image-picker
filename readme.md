# omero-web-image-picker

I had the need to build a way to comfortably select images in an Omero web app I created (or at least more comfortably than knowing the id). This project aims to provide just that functionality.

![alt text](https://raw.githubusercontent.com/FrankT1983/omero-web-image-picker/master/exampleImage.JPG)

## Overview

* Uses JsTree to display groups – projects – datasets - images
* Displays thumbnails when hovering over an image
* I used the icons from [Omero](https://github.com/openmicroscopy/openmicroscopy) in the tree

## Usage

* Under **classes/HistoryFromOmero.py**, in the **getThumbNail()** function: add your server path
