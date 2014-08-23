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

  suite 'toString', ->
    test 'should work with floats', ->
      assert.equal new LatLng(42.3, 17.46897).toString(), '(42.3, 17.46897)'

    test 'should work with integers', ->
      assert.equal new LatLng(42, -17).toString(), '(42, -17)'

  suite 'toUrlValue', ->
    test 'should work with default precision 6', ->
      latLng = new LatLng(1.123456789, -2.123456789)
      assert.deepEqual latLng.toUrlValue(), '1.123457,-2.123457'

    test 'should not add trailing zeros', ->
      latLng = new LatLng(1.12, -2.12)
      assert.deepEqual latLng.toUrlValue(10), '1.12,-2.12'
      latLng = new LatLng(10, -20)
      assert.deepEqual latLng.toUrlValue(10), '10,-20'
