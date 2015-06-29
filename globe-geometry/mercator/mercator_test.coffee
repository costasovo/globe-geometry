goog.require 'globeGeometry.LatLng'
goog.require 'globeGeometry.MercatorTile'
goog.require 'globeGeometry.LatLngBounds'

suite 'globeGeometry.mercator', ->

  Mercator = globeGeometry.mercator
  LatLng = globeGeometry.LatLng
  Point = globeGeometry.Point

  suite 'fromLatLngToTile', ->
    test 'should work for 0,0', ->
      latLng = new LatLng 0, 0

      tile = Mercator.fromLatLngToTile latLng, 3

      assert.instanceOf tile, globeGeometry.MercatorTile
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
    test 'should work for 50,1 in zoom 13', ->
      latLng = new LatLng 50, 1
      tile = Mercator.fromLatLngToTile latLng, 13
      bounds = Mercator.fromTileToLatLngBounds tile
      assert.instanceOf bounds, globeGeometry.LatLngBounds
      assert.equal bounds.getSouthWest().getLat(), 49.97959814983682
      assert.equal bounds.getSouthWest().getLng(), 0.966796875
      assert.equal bounds.getNorthEast().getLat(), 50.00773901463686
      assert.equal bounds.getNorthEast().getLng(), 1.0105705261230469

  suite 'zoomOutBounds', ->
    test 'should set new bounds properly', ->
      sw = new LatLng 0,0
      ne = new LatLng 20,20
      bounds = new globeGeometry.LatLngBounds sw, ne
      zoomedBounds = Mercator.zoomOutBounds bounds, 2

      assert.equal Math.round(zoomedBounds.getSouthWest().getLat()), -10
      assert.equal Math.round(zoomedBounds.getSouthWest().getLng()), -10
      assert.equal Math.round(zoomedBounds.getNorthEast().getLat()), 29
      assert.equal Math.round(zoomedBounds.getNorthEast().getLng()), 30
