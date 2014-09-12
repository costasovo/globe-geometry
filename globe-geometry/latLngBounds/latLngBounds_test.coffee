suite 'globeGeometry.LatLngBounds', ->

  LatLng = globeGeometry.LatLng
  LatLngBounds = globeGeometry.LatLngBounds

  suite 'constructor', ->
    test 'should work with sw and ne defined', ->
      sw = new LatLng '42.3', '17.46897'
      ne = new LatLng '44', '20'
      bounds = new LatLngBounds sw, ne

      assert.instanceOf bounds.getSouthWest(), globeGeometry.LatLng
      assert.instanceOf bounds.getNorthEast(), globeGeometry.LatLng
      assert.isTrue bounds.getSouthWest().equals sw
      assert.isTrue bounds.getNorthEast().equals ne
