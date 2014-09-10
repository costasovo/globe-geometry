goog.require 'globeGeometry.Point'

suite 'globeGeometry.Point', ->

  Point = globeGeometry.Point

  suite 'constructor', ->
    test 'should worj', ->
      point = new Point 8, -2.5

      assert.equal point.getX(), 8
      assert.equal point.getY(), -2.5

  suite 'equals', ->
    test 'should work with same point', ->
      point = new Point 17, 22

      assert.isTrue point.equals(point), "Point does equal itself"

    test 'should not work with point in different zoom level', ->
      point = new Point 17, 22
      point2 = new Point 4, 3

      assert.isFalse point.equals(point2), "Point does not equal different point"
      assert.isFalse point2.equals(point), "Point does not equal different point"
