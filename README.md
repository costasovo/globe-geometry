# globe-geometry [![devDependency Status](https://david-dm.org/michalsanger/globe-geometry/dev-status.png)](https://david-dm.org/michalsanger/globe-geometry#info=devDependencies) [![Build Status](https://travis-ci.org/michalsanger/globe-geometry.svg?branch=master)](https://travis-ci.org/michalsanger/globe-geometry)

Google Closure spatial geometry library. Calculate distance and heading between points on globe.

Written in CoffeeScript and powered by http://github.com/steida/este-library

## Usage

  Get compiled JS in `dist` dir.

  ```javascript
  brno = new globeGeometry.LatLng('49.2020701', '16.5779606');
  nyc = new globeGeometry.LatLng('40.7056308', '-73.9780035');
  barcelona = new globeGeometry.LatLng('41.39479', '2.1487679');

  distance = globeGeometry.spherical.computeDistanceBetween(brno, nyc);
  heading = globeGeometry.computeHeading(barcelona, nyc);
  length = globeGeometry.computeLength([brno, barcelona, nyc]);
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
