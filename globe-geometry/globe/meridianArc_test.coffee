goog.require 'globeGeometry.LatLng'

suite 'globeGeometry.globe.MeridianArc', ->

  MeridianArc = globeGeometry.globe.MeridianArc
  LatLng = globeGeometry.LatLng

  suite 'getStart', ->
    test 'should work', ->
      arc = new MeridianArc -10, 20
      assert.equal arc.getStart(), -10

      arc = new MeridianArc 20, -10
      assert.equal arc.getStart(), 20

  suite 'getEnd', ->
    test 'should work', ->
      arc = new MeridianArc -10, 20
      assert.equal arc.getEnd(), 20

      arc = new MeridianArc 20, -10
      assert.equal arc.getEnd(), -10

  suite 'contains', ->
    test 'should work', ->
      arc = new MeridianArc -10, 20

      assert.isTrue arc.contains -10
      assert.isTrue arc.contains -2
      assert.isTrue arc.contains 0
      assert.isTrue arc.contains 3.4
      assert.isTrue arc.contains 10
      assert.isTrue arc.contains 20

  suite 'extend', ->
    test 'should extend', ->
      arc = new MeridianArc 0, 2

      assert.isFalse arc.contains 3
      arc2 = arc.extend 3
      assert.isTrue arc2.contains 3
      assert.equal arc2.getStart(), 0
      assert.equal arc2.getEnd(), 3

      assert.isFalse arc.contains -2
      arc2 = arc.extend -2
      assert.isTrue arc2.contains -2
      assert.equal arc2.getStart(), -2
      assert.equal arc2.getEnd(), 2

      assert.isTrue arc.contains 1
      arc2 = arc.extend 1
      assert.isTrue arc2.contains 1
      assert.equal arc2.getStart(), 0
      assert.equal arc2.getEnd(), 2

  suite 'getCenter', ->
    test 'should work', ->
      arc = new MeridianArc 0, 2
      assert.equal arc.getCenter(), 1

      arc = new MeridianArc -30, -10
      assert.equal arc.getCenter(), -20

      arc = new MeridianArc -30, 20
      assert.equal arc.getCenter(), -5

  suite 'intersects', ->
    test 'should work', ->
      arc = new MeridianArc 0, 45
      arcIn = new MeridianArc 10, 20
      arcHalfIn = new MeridianArc -10, 20
      arcHalfIn2 = new MeridianArc 30, 50
      arcOut = new MeridianArc 50, 60

      assert.isFalse arc.intersects arcOut
      assert.isTrue arc.intersects arcIn
      assert.isTrue arc.intersects arcHalfIn
      assert.isTrue arc.intersects arcHalfIn2

  suite 'isEmpty', ->
    test 'should work', ->
      arc = new MeridianArc 20, 10
      assert.isTrue arc.isEmpty()
      arc = new MeridianArc 10, 20
      assert.isFalse arc.isEmpty()
