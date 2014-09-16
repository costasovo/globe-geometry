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

      arc = new ParallelArc -107.578125, -146.953125
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
      inputs = [
        [-10, 20]
        [170, 100]
        [-107.578125, -146.953125]
        [149.0625, 98.4375]
      ]
      for input in inputs
        arc = new ParallelArc input[0], input[1]
        assert.isTrue arc.crossesZeroMeridian()

  suite 'getCenter', ->
    test 'should work for non crossing date meridian', ->
      arc = new ParallelArc -22.8515625, 22.5
      assert.equal arc.getCenter(), -0.17578125

      arc = new ParallelArc 46.7578125, 105.46875
      assert.equal arc.getCenter(), 76.11328125

      arc = new ParallelArc -43.59375, 170.5078125
      assert.equal arc.getCenter(), 63.45703125

      arc = new ParallelArc 108.28125, 176.484375
      assert.equal arc.getCenter(), 142.3828125

    test 'should work for crossing date meridian', ->
      arc = new ParallelArc 137.4609375, -147.65625
      assert.equal arc.getCenter(), 174.90234375

      arc = new ParallelArc -148.359375, 158.90625
      assert.equal arc.getCenter(), 5.2734375

      arc = new ParallelArc -118.828125, -149.0625
      assert.equal arc.getCenter(), 46.0546875

      arc = new ParallelArc 172.265625, 26.71875
      assert.equal arc.getCenter(), -80.5078125

      arc = new ParallelArc 171.5625, 144.84375
      assert.equal arc.getCenter(), -21.796875

      arc = new ParallelArc 156.09375, 92.109375
      assert.equal arc.getCenter(), -55.8984375

      arc = new ParallelArc 151.875, -47.109375
      assert.equal arc.getCenter(), -127.6171875
