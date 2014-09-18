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

  suite 'contains', ->
    testBounds = (latLngs, expected) ->
      for latLng in latLngs
        sw = new LatLng latLng[0], latLng[1]
        ne = new LatLng latLng[2], latLng[3]
        point = new LatLng latLng[4], latLng[5]
        bounds = new LatLngBounds sw, ne
        assert.deepEqual bounds.contains(point), expected

    test 'should work for point inside', ->
      inputs = [
        [-15.961329081596634, -31.2890625, 31.353636941500987, 22.5, 11.178401873711785, -0.3515625]
        [-49.837982453084834, 137.8125, 36.03133177633189, 94.21875, -10.487811882056695, 70.3125]
        [-28.30438068296277, 119.53125, 49.837982453084834, -111.796875, 19.31114335506464, -160.3125]
        [-55.97379820507658, -35.859375, -19.31114335506463, 56.25, -43.58039085560784, 41.1328125]
      ]
      testBounds inputs, true

    test 'should work for point inside', ->
      inputs = [
        [22.26876403907398, 43.59375, 48.22467264956519, 98.4375, -16.63619187839765, 78.3984375]
        [-48.92249926375824, 156.796875, 36.5978891330702, -57.65625, -56.55948248376223, -11.953125]
        [-34.88593094075315, -89.296875, 30.751277776257812, -127.265625, 9.102096738726456, -108.984375]
      ]
      testBounds inputs, false

  suite 'intersects', ->
    testBounds = (latLngs, expected) ->
      for latLng in latLngs
        sw1 = new LatLng latLng[0], latLng[1]
        ne1 = new LatLng latLng[2], latLng[3]
        sw2 = new LatLng latLng[4], latLng[5]
        ne2 = new LatLng latLng[6], latLng[7]
        bounds = new LatLngBounds sw1, ne1
        bounds2 = new LatLngBounds sw2, ne2
        assert.deepEqual bounds.intersects(bounds2), expected, latLng

    test 'should work for non intersecting bounds', ->
      inputs = [
        [-38.27268853598096, 4.921875, -17.30868788677001, 53.0859375, 29.53522956294847, 11.953125, 52.908902047770255, 53.7890625]
        [-44.08758502824516, 113.203125, 32.54681317351516, -119.53125, -23.88583769986199, -47.8125, 18.646245142670608, 3.515625]
        [-51.179342979289274, 127.265625, 13.239945499286312, -132.1875, 45.08903556483101, 137.8125, 69.41124235697256, -136.40625]
        [-42.0329743324414, 60.46875, 22.59372606392931, 139.921875, -39.36827914916012, -152.578125, 34.88593094075317, -81.5625]
      ]
      testBounds inputs, false

    test 'should work for intersecting bounds', ->
      inputs = [
        [8.407168163601074, 17.2265625, 54.57206165565852, 75.9375, -1.4061088354351468, 53.4375, 28.92163128242129, 85.078125]
        [-24.52713482259779, -128.671875, 36.5978891330702, 69.609375, -54.162433968067795, -85.078125, 71.07405646336098, 20.390625]
        [-67.33986082559095, 74.53125, 52.482780222078226, -101.953125, -31.95216223802496, 135, 23.241346102386135, -163.828125]
        [-36.03133177633187, 155.390625, 27.683528083787756, 151.875, -69.9001176266854, -108.984375, 63.23362741232568, -59.0625]
        [-68.65655498475735, 106.171875, -13.923403897723334, -133.59375, -49.837982453084834, -163.828125, -40.979898069620134, -149.0625]
      ]
      testBounds inputs, true

  suite 'toString', ->
    testBounds = (inputs) ->
      for input in inputs
        sw = new LatLng input[1], input[2] if input.length > 2
        ne = new LatLng input[3], input[4] if input.length == 5
        bounds = new LatLngBounds sw, ne
        assert.deepEqual bounds.toString(), input[0]

    test 'should work', ->
      inputs = [
        ["((-34.30714385628803, -14.765625), (15.623036831528264, 56.953125))", -34.30714385628803, -14.765625, 15.623036831528264, 56.953125]
        ["((-44.08758502824516, 144.84375), (7.013667927566642, -73.828125))", -44.08758502824516, 144.84375, 7.013667927566642, -73.828125]
        ["((-52.908902047770255, 45), (-32.8426736319543, 75.9375))", -52.908902047770255, 45, -32.8426736319543, 75.9375]
      ]
      testBounds inputs

    test 'should with empty', ->
      testBounds [['((1, 180), (-1, -180))']]

    test 'should work with semi defined', ->
      inputs = [
        ["((-34.30714385628803, -14.765625), (-34.30714385628803, -14.765625))", -34.30714385628803, -14.765625]
        ["((-44.08758502824516, 144.84375), (-44.08758502824516, 144.84375))", -44.08758502824516, 144.84375]
        ["((-52.908902047770255, 45), (-52.908902047770255, 45))", -52.908902047770255, 45]
      ]
      testBounds inputs
