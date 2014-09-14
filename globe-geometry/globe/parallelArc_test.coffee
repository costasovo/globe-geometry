goog.require 'globeGeometry.LatLng'

suite 'globeGeometry.globe.ParallelArc', ->

  ParallelArc = globeGeometry.globe.ParallelArc
  LatLng = globeGeometry.LatLng

  suite 'crossesDateMeridian', ->
    test 'should work for non crossing', ->
      arc = new ParallelArc 10, 20
      assert.isFalse arc.crossesDateMeridian()

      arc = new ParallelArc -10, 20
      assert.isFalse arc.crossesDateMeridian()

      arc = new ParallelArc -170, 170
      assert.isFalse arc.crossesDateMeridian()

    test 'should work for crossing', ->
      arc = new ParallelArc 170, -170
      assert.isTrue arc.crossesDateMeridian()

      arc = new ParallelArc 0, -1
      assert.isTrue arc.crossesDateMeridian()

      arc = new ParallelArc -170, -175
      assert.isTrue arc.crossesDateMeridian()

  suite 'crossesZeroMeridian', ->
    test 'should work for non crossing', ->
      arc = new ParallelArc 10, 20
      assert.isFalse arc.crossesZeroMeridian()

      arc = new ParallelArc -20, -10
      assert.isFalse arc.crossesZeroMeridian()

      arc = new ParallelArc 170, 175
      assert.isFalse arc.crossesZeroMeridian()

    test 'should work for crossing', ->
      arc = new ParallelArc -10, 20
      assert.isTrue arc.crossesZeroMeridian()

      arc = new ParallelArc 170, 100
      assert.isTrue arc.crossesZeroMeridian()
