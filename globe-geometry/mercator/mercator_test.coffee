goog.require 'globeGeometry.LatLng'
goog.require 'globeGeometry.mercator.Tile'

suite 'globeGeometry.mercator', ->

  Mercator = globeGeometry.mercator
  LatLng = globeGeometry.LatLng

  suite 'fromLatLngToTile', ->
    test 'should work for 0,0', ->
      latLng = new LatLng 0, 0

      tile = Mercator.fromLatLngToTile latLng, 3

      assert.instanceOf tile, globeGeometry.mercator.Tile
      assert.equal tile.getX(), 4
      assert.equal tile.getY(), 4
      assert.equal tile.getZ(), 3
