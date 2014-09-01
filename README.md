# globe-geometry [![devDependency Status](https://david-dm.org/michalsanger/globe-geometry/dev-status.png)](https://david-dm.org/michalsanger/globe-geometry#info=devDependencies) [![Build Status](https://travis-ci.org/michalsanger/globe-geometry.svg?branch=master)](https://travis-ci.org/michalsanger/globe-geometry)

Google Closure spatial geometry library. Calculate distance and heading between points on globe.

Written in CoffeeScript and powered by http://github.com/steida/este-library

## Usage

  Get compiled JS in `dist` dir.

  ```javascript
  var brno = new globeGeometry.LatLng('49.2020701', '16.5779606');
  var nyc = new globeGeometry.LatLng(40.7056308, -73.9780035);
  var barcelona = new globeGeometry.LatLng('41.39479', '2.1487679');

  var distance = globeGeometry.spherical.computeDistanceBetween(brno, nyc);
  var heading = globeGeometry.spherical.computeHeading(barcelona, nyc);
  var length = globeGeometry.spherical.computeLength([brno, barcelona, nyc]);

  var london = globeGeometry.spherical.computeOffset(brno, 1209636, -71.4224);
  ```

Different input formats support:

  ```javascript
  var latLng = globeGeometry.latLng.factory.createInstance("41°23'41.2\"N 2°08'55.6\"E");
  var latLng = globeGeometry.latLng.factory.createInstance("41°23'41.2\", 2°08'55.6\"");
  var latLng = globeGeometry.latLng.factory.createInstance("41° 23.68666', 2° 8.9266667'");
  var latLng = globeGeometry.latLng.factory.createInstance("41.39477777°N, 2.1487777778°E");
  ```

## Dev

### Prerequisites

  [Java 1.7](http://www.oracle.com/technetwork/java/javase/downloads/index.html) and [Node.js](http://nodejs.org) are required.

  ```shell
  npm install -g gulp
  npm install -g bower
  ```

### Install

  ```shell
  bower install
  npm install
  ```

### Run

  ```shell
  gulp
  ```

### Run unit tests

  ```shell
  gulp unittest
  ```

### Compile

  ```shell
  gulp compile
  ```

## License
Copyright (c) 2014 Michal Sänger

Licensed under the MIT license.
