suite 'globeGeometry.LatLngBounds', ->
  createBounds = (swLat, swLng, neLat, neLng) ->
    sw = new LatLng swLat, swLng
    ne = new LatLng neLat, neLng
    bounds = new LatLngBounds sw, ne

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

  suite 'crossesDateMeridian', ->

    test 'should work with empty', ->
      bounds = new LatLngBounds()

      assert.isFalse bounds.crossesDateMeridian(), "Empty bounds does not cross meridian"

    test 'should work with semi defined', ->
      bounds = new LatLngBounds new LatLng 3, 4

      assert.isFalse bounds.crossesDateMeridian(), "Semi defined bounds does not cross meridian"

    test 'should work with semi defined on meridian', ->
      bounds = new LatLngBounds new LatLng 4, 180
      bounds2 = new LatLngBounds new LatLng 4, -180

      assert.isTrue bounds.crossesDateMeridian(), "(4, 180) does cross meridian"
      assert.isTrue bounds2.crossesDateMeridian(), "(4, -180) does cross meridian"

    test 'should work with non crossing', ->
      bounds = createBounds 14.944784875088372, 18.984375, 43.58039085560786, 56.953125
      assert.isFalse bounds.crossesDateMeridian()
      bounds = createBounds 15.961329081596647, -129.375, 60.413852350464936, 55.1953125
      assert.isFalse bounds.crossesDateMeridian()
      bounds = createBounds -45.82879925192133, 111.09375, 8.059229627200192, 176.484375
      assert.isFalse bounds.crossesDateMeridian()
      bounds = createBounds -38.8225909761771, -167.34375, 66.23145747862573, 168.75
      assert.isFalse bounds.crossesDateMeridian()

    test 'should work with crossing', ->
      bounds = createBounds -52.268157373768155, 139.921875, 16.29905101458183, -115.3125
      assert.isTrue bounds.crossesDateMeridian()
      bounds = createBounds 10.83330598364249, 115.6640625, 36.87962060502676, -141.328125
      assert.isTrue bounds.crossesDateMeridian()
      bounds = createBounds -48.92249926375824, 156.09375, 30.14512718337613, 130.78125
      assert.isTrue bounds.crossesDateMeridian()

  suite 'getCenter', ->
    test 'should work', ->
      bounds = createBounds -29.84064389983441, -59.765625, 21.616579336740603, 33.75
      center = new LatLng -4.112032281546904, -13.0078125
      assert.equal center.toString(), bounds.getCenter().toString()

      bounds = createBounds -56.55948248376223, 151.875, 43.068887774169625, -47.109375
      center = new LatLng -6.745297354796303, -127.6171875
      assert.equal center.toString(), bounds.getCenter().toString()

      bounds = createBounds -34.016241889667015, 67.5, 22.917922936146045, 171.9140625
      center = new LatLng -5.549159476760485, 119.70703125
      assert.equal center.toString(), bounds.getCenter().toString()

      bounds = createBounds 14.944784875088372, 156.4453125, 52.482780222078226, -161.71875
      center = new LatLng 33.713782548583296, 177.36328125
      assert.equal center.toString(), bounds.getCenter().toString()

      bounds = createBounds -43.32517767999295, 132.1875, 11.178401873711785, -131.484375
      center = new LatLng -16.07338790314058, -179.6484375
      assert.equal center.toString(), bounds.getCenter().toString()
