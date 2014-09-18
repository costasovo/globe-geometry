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

  suite 'contains', ->
    test 'should work for points inside', ->
      inputs = [
        [-49.921875, 64.3359375, 7.20703125]
        [-149.0625, 152.578125, 1.7578125]
        [24.609375, 111.796875, 68.203125]
        [-155.390625, -93.515625, -124.453125]
        [140.625, -88.59375, -153.984375]
        [-146.953125, 87.890625, -29.53125]
        [-107.578125, -146.953125, 52.734375]
        [149.0625, 98.4375, -56.25]
        [140.625, -88.59375, 153.984375]
      ]
      for input in inputs
        arc = new ParallelArc input[0], input[1]
        assert.isTrue arc.contains(input[2]), input

    test 'should work for points outside', ->
      inputs = [
        [-49.921875, 64.3359375, 70]
        [-49.921875, 64.3359375, -70]
        [-149.0625, 152.578125, 179]
        [-149.0625, 152.578125, -179]
        [24.609375, 111.796875, 0]
        [-155.390625, -93.515625, 124.453125]
        [-146.953125, 87.890625, 99.53125]
        [-146.953125, 87.890625, -179.53125]
        [-107.578125, -146.953125, -120.734375]
        [149.0625, 98.4375, 100]
      ]
      for input in inputs
        arc = new ParallelArc input[0], input[1]
        assert.isFalse arc.contains(input[2]), input

  suite 'intersects', ->
    testAcr = (inputs, expected) ->
      for input in inputs
        arc = new ParallelArc input[0], input[1]
        arc2 = new ParallelArc input[2], input[3]
        assert.deepEqual arc.intersects(arc2), expected, input

    test 'should work for arc inside', ->
      inputs = [
        [20, 50, 30, 35]
        [-30, 20, -5, 10]
        [160, -100, 170, -170]
        [120, 100, -40, 80]
      ]
      testAcr inputs, true

    test 'should work for arc partialy inside', ->
      inputs = [
        [45, 60, 50, 80]
        [160, -20, -170, 20]
        [120, -45, 10, 150]
      ]
      testAcr inputs, true

    test 'should work for arc not intersecting', ->
      inputs = [
        [38, 60, 70, 120]
        [150, 100, 120, 130]
        [-40, 160, 170, -150]
      ]
      testAcr inputs, false

  suite 'getLength', ->
    testAcr = (inputs) ->
      for input in inputs
        arc = new ParallelArc input[0], input[1]
        assert.deepEqual arc.getLength(), input[2], input

    test 'should work for non crossing date meridian', ->
      inputs = [
        [20, 35, 15]
        [-20, 34, 54]
      ]
      testAcr inputs

    test 'should work for crossing date meridian', ->
      inputs = [
        [160, -170, 30]
        [-80, -160, 280]
      ]
      testAcr inputs

  suite 'extend', ->
    testAcr = (inputs) ->
      for input in inputs
        arc = new ParallelArc input[0], input[1]
        extended = arc.extend input[2]
        assert.deepEqual extended.getStart(), input[3], input
        assert.deepEqual extended.getEnd(), input[4], input

    test 'should work', ->
      inputs = [
        [20, 35, 40, 20, 40]
        [-20, 34, 20, -20, 34]
        [-20, 34, -30, -30, 34]
        [160, -170, 140, 140, -170]
        [-80, -160, -120, -80, -120]
      ]
      testAcr inputs
