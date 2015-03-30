goog.require 'globeGeometry.LatLng'
goog.require 'globeGeometry.mercator.Tile'

suite 'globeGeometry.mercator', ->

  Mercator = globeGeometry.mercator
  LatLng = globeGeometry.LatLng
  Point = globeGeometry.Point

  suite 'fromLatLngToTile', ->
    test 'should work for 0,0', ->
      latLng = new LatLng 0, 0

      tile = Mercator.fromLatLngToTile latLng, 3

      assert.instanceOf tile, globeGeometry.mercator.Tile
      assert.equal tile.getX(), 4
      assert.equal tile.getY(), 4
      assert.equal tile.getZ(), 3

  suite 'fromLatLngToPoint', ->
    test 'should work for 0,0', ->
      point = new LatLng 0, 0

      point = Mercator.fromLatLngToPoint point, 3

      assert.instanceOf point, globeGeometry.Point
      assert.equal point.getX(), 1024
      assert.equal point.getY(), 1024

  suite 'fromPointToLatLng', ->
    test 'should work for 1024,1024 in zoom 3', ->
      point = new Point 1024, 1024

      latLng = Mercator.fromPointToLatLng point, 3

      assert.instanceOf latLng, globeGeometry.LatLng
      assert.equal latLng.getLat(), 0
      assert.equal latLng.getLng(), 0

  suite 'fromTileToLatLngBounds', ->
    test 'should work for 50,0 in zoom 13', ->
      latLng = new LatLng 50, 0
      tile = Mercator.fromLatLngToTile latLng, 13
      bounds = Mercator.fromTileToLatLngBounds tile
      console.log bounds
