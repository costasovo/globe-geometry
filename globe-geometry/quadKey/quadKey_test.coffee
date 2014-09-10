goog.require 'globeGeometry.LatLng'
goog.require 'globeGeometry.mercator.Tile'

suite 'globeGeometry.quadKey', ->

  QuadKey = globeGeometry.quadKey
  LatLng = globeGeometry.LatLng

  suite 'fromLatLngToQuadKey', ->
    test 'should work for 0,0', ->
      latLng = new LatLng 0, 0

      quadKey = QuadKey.fromLatLngToQuadKey latLng, 3

      assert.equal quadKey, '300'

  suite 'fromTileToQuadKey', ->
    test 'should work for 3,5', ->
      tile = new globeGeometry.mercator.Tile 3, 5, 3

      quadKey = QuadKey.fromTileToQuadKey tile

      assert.equal quadKey, '213'

  suite 'fromQuadKeyToTile', ->
    test 'should work for 213', ->
      tile = QuadKey.fromQuadKeyToTile '213'

      assert.equal tile.x, 3
      assert.equal tile.y, 5
