suite 'globeGeometry.LatLngBounds', ->

  LatLng = globeGeometry.LatLng
  LatLngBounds = globeGeometry.LatLngBounds

  suite 'constructor', ->
    test 'should work with sw and ne defined', ->
      sw = new LatLng 42.3, 17.46897
      ne = new LatLng 44, 20
      bounds = new LatLngBounds sw, ne

      assert.instanceOf bounds.getSouthWest(), globeGeometry.LatLng
      assert.instanceOf bounds.getNorthEast(), globeGeometry.LatLng
      assert.isTrue bounds.getSouthWest().equals sw
      assert.isTrue bounds.getNorthEast().equals ne

  suite 'isEmpty', ->
    test 'should work with empty', ->
      bounds = new LatLngBounds()

      assert.isTrue bounds.isEmpty(), "Empty bounds are empty"

    test 'should work with semi defined', ->
      sw = new LatLng 10, 20
      bounds = new LatLngBounds sw

      assert.isFalse bounds.isEmpty(), "Semi defined bounds are not empty"

    test 'should work with fully defined', ->
      sw = new LatLng 3, -4
      ne = new LatLng 10, 20
      bounds = new LatLngBounds sw, ne

      assert.isFalse bounds.isEmpty(), "Semi defined bounds are not empty"

  suite 'equals', ->
    test 'should work with itself', ->
      sw = new LatLng 3, -4
      ne = new LatLng 10, 20
      bounds = new LatLngBounds sw, ne

      assert.isTrue bounds.equals(bounds), "Bounds is equal with itself"

    test 'should work with both empty', ->
      bounds = new LatLngBounds()
      bounds2 = new LatLngBounds()

      assert.isTrue bounds.equals(bounds2), "Empty bounds is equal with another empty bounds"

    test 'should work with different', ->
      sw = new LatLng 3, -4
      ne = new LatLng 10, 20
      bounds = new LatLngBounds sw, ne
      sw2 = new LatLng 1, 2
      ne2 = new LatLng 1.5, 45.7
      bounds2 = new LatLngBounds sw2, ne2

      assert.isFalse bounds.equals(bounds2), "Bounds is not equal with different bounds"

  suite 'crossesMeridian', ->
    test 'should work with empty', ->
      bounds = new LatLngBounds()

      assert.isFalse bounds.crossesMeridian(), "Empty bounds does not cross meridian"

    test 'should work with semi defined', ->
      bounds = new LatLngBounds new LatLng 3, 4

      assert.isFalse bounds.crossesMeridian(), "Semi defined bounds does not cross meridian"

    test 'should work with semi defined on meridian', ->
      bounds = new LatLngBounds new LatLng 4, 180
      bounds2 = new LatLngBounds new LatLng 4, -180

      assert.isTrue bounds.crossesMeridian(), "(4, 180) does cross meridian"
      assert.isTrue bounds2.crossesMeridian(), "(4, -180) does cross meridian"
