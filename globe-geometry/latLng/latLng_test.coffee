suite 'globeGeometry.LatLng', ->

  LatLng = globeGeometry.LatLng

  suite 'constructor', ->
    test 'should work with numeric string', ->
      latLng = new LatLng '42.3', '17.46897'
      assert.deepEqual latLng.getLat(), 42.3
      assert.deepEqual latLng.getLng(), 17.46897

    test 'should work with non numeric string', ->
      latLng = new LatLng 'xyz', '17.46897'
      assert.deepEqual latLng.getLat(), NaN
      assert.deepEqual latLng.getLng(), 17.46897

    test 'should limit input into range', ->
      latLng = new LatLng 300, 500
      assert.deepEqual latLng.getLat(), 90
      assert.deepEqual latLng.getLng(), 180

      latLng = new LatLng -300, -500
      assert.deepEqual latLng.getLat(), -90
      assert.deepEqual latLng.getLng(), -180

  suite 'toString', ->
    test 'should work with floats', ->
      assert.equal new LatLng(42.3, 17.46897).toString(), '(42.3, 17.46897)'

    test 'should work with integers', ->
      assert.equal new LatLng(42, -17).toString(), '(42, -17)'

  suite 'toUrlValue', ->
    test 'should work with precision', ->
      latLng = new LatLng(1.123456789, -2.123456789)
      assert.deepEqual latLng.toUrlValue(2), '1.12,-2.12'

    test 'should work with default precision 6', ->
      latLng = new LatLng(1.123456789, -2.123456789)
      assert.deepEqual latLng.toUrlValue(), '1.123456,-2.123456'

    test 'should not add trailing zeros', ->
      latLng = new LatLng(1.12, -2.12)
      assert.deepEqual latLng.toUrlValue(10), '1.12,-2.12'
      latLng = new LatLng(10, -20)
      assert.deepEqual latLng.toUrlValue(10), '10,-20'

  suite 'equals', ->
    test 'should work with non equal latLng', ->
      dataProvider = [
        [10, -20]
        [-20, 10]
        [1.123, -2]
      ]
      latLng = new LatLng(1.123, -20)
      for data in dataProvider
        latLng2 = new LatLng data[0], data[1]
        assert.isFalse latLng.equals(latLng2), latLng2.toString()

    test 'should work with equal latLng', ->
      dataProvider = [
        [10, -20]
        [-20, 10]
        [1.123, -2]
      ]
      for data in dataProvider
        latLng = new LatLng data[0], data[1]
        latLng2 = new LatLng data[0], data[1]
        assert.isTrue latLng.equals(latLng2), latLng2.toString()

    test 'should work with decimal precision', ->
      dataProvider = [
        [10, 1.4, 10, 1.40000000000001]
        [10, 3.4, 10, 3.39999999999999]
      ]
      for data in dataProvider
        latLng = new LatLng data[0], data[1]
        latLng2 = new LatLng data[2], data[3]
        assert.isTrue latLng.equals(latLng2), latLng.toString() + ' === ' + latLng2.toString()

  suite 'createInstance', ->
    test 'should work with DMS input', ->
      latLng = LatLng.createInstance "49°12'32.3\" 16°35'53.9\""

      assert.instanceOf latLng, globeGeometry.LatLng
      assert.isTrue latLng.equals new LatLng 49.208972, 16.598305

    test 'should throw error on invalid input', ->
      shouldThrow = () -> LatLng.createInstance("xyz")
      assert.throw shouldThrow, Error, /Invalid input/

    test 'should work with DDM input', ->
      latLng = LatLng.createInstance "32° 18.385',122° 36.875'"

      assert.instanceOf latLng, globeGeometry.LatLng
      assert.isTrue latLng.equals new LatLng 32.306416, 122.614583

    test 'should work with DD input', ->
      latLng = LatLng.createInstance "32.30642°N 122.61458°W"

      assert.instanceOf latLng, globeGeometry.LatLng
      assert.isTrue latLng.equals new LatLng 32.30642, 122.61458

  suite 'toDd', ->
    test 'should work', ->
      latLng = new LatLng 32.30642, 122.61458
      dd = latLng.toDd()

      assert.equal dd, "32.30642°N 122.61458°W"

    test 'should work with separator', ->
      latLng = new LatLng 32.30642, 122.61458
      dd = latLng.toDd(',')

      assert.equal dd, "32.30642°N,122.61458°W"

    test 'should work with precision', ->
      latLng = new LatLng 32.30642, 122.61458
      dd = latLng.toDd(' ', 3)

      assert.equal dd, "32.306°N 122.614°W"

    test 'should work with negative numbers', ->
      latLng = new LatLng -32.30642, -122.61458
      dd = latLng.toDd()

      assert.equal dd, "32.30642°S 122.61458°E"

  suite 'toDdm', ->
    test 'should work', ->
      latLng = new LatLng 32.306416, 122.614583
      ddm = latLng.toDdm()

      assert.equal ddm, "32°18.385'N 122°36.875'W"

  suite 'toDms', ->
    test 'should work', ->
      latLng = new LatLng 49.208972, 16.598305
      dms = latLng.toDms()
      assert.equal dms, "49°12'32.3\"N 16°35'53.9\"W"
