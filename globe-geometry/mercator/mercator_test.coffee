goog.require 'globeGeometry.LatLng'

suite 'globeGeometry.Mercator', ->

  Mercator = globeGeometry.mercator
  LatLng = globeGeometry.LatLng

  suite 'fromLatLngToTile', ->
    test 'should work for 0,0', ->
      latLng = new LatLng 0, 0

      tile = Mercator.fromLatLngToTile latLng, 3

      assert.equal tile.x, 4
      assert.equal tile.y, 4
