suite 'globeGeometry.latLng.factory', ->

  LatLng = globeGeometry.LatLng
  LatLngFactory = globeGeometry.latLng.factory

  suite 'createInstance', ->
    test 'should work with DMS input', ->
      latLng = LatLngFactory.createInstance "49°12'32.3\" 16°35'53.9\""

      assert.instanceOf latLng, globeGeometry.LatLng
      assert.isTrue latLng.equals new LatLng 49.208972, 16.598305

    test 'should throw error on invalid input', ->
      shouldThrow = () -> LatLngFactory.createInstance("xyz")
      assert.throw shouldThrow, Error, /Invalid input/

    test 'should work with DDM input', ->
      latLng = LatLngFactory.createInstance "32° 18.385',122° 36.875'"

      assert.instanceOf latLng, globeGeometry.LatLng
      assert.isTrue latLng.equals new LatLng 32.306416, 122.614583