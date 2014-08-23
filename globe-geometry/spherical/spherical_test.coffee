goog.require 'globeGeometry.LatLng'

suite 'globeGeometry.spherical', ->

  Spherical = globeGeometry.spherical
  LatLng = globeGeometry.LatLng

  suite 'computeDistanceBetween', ->
    test 'should work for Brno and NYC', ->
      brno = new LatLng '49.2020701', '16.5779606'
      nyc = new LatLng '40.7056308', '-73.9780035'

      distance = Spherical.computeDistanceBetween brno, nyc

      assert.equal Math.round(distance), 6760615