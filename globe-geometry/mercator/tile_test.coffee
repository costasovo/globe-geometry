goog.require 'globeGeometry.mercator.Tile'

suite 'globeGeometry.mercator.Tile', ->

  Tile = globeGeometry.mercator.Tile

  suite 'constructor', ->
    test 'should clamp input', ->
      tile = new Tile 10, 10, -3

      assert.equal tile.getX(), 7
      assert.equal tile.getY(), 7
      assert.equal tile.getZ(), 3

  suite 'equals', ->
    test 'should work with same tile', ->
      tile = new Tile 17, 22, 5

      assert.isTrue tile.equals(tile), "Tile does equal itself"

    test 'should not work with tile in different zoom level', ->
      tile = new Tile 17, 22, 5
      tile2 = new Tile 4, 3, 3

      assert.isFalse tile.equals(tile2), "Tile does not equal different tile"
      assert.isFalse tile2.equals(tile), "Tile does not equal different tile"
