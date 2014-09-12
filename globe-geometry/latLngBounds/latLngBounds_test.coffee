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