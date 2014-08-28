goog.require 'globeGeometry.LatLng'

suite 'globeGeometry.spherical', ->

  Spherical = globeGeometry.spherical
  LatLng = globeGeometry.LatLng

  suite 'computeDistanceBetween', ->
    test 'should work for Brno and NYC', ->
      brno = new LatLng '49.2020701', '16.5779606'
      nyc = new LatLng '40.7056308', '-73.9780035'

      distance = Spherical.computeDistanceBetween brno, nyc

      assert.equal Math.round(distance), 6760615

  suite 'computeHeading', ->
    test 'should work for Brno and Barcelona', ->
      brno = new LatLng '49.2020701', '16.5779606'
      barcelona = new LatLng '41.39479', '2.1487679'

      angle = Spherical.computeHeading brno, barcelona

      assert.equal Math.round(angle), -122

  suite 'computeLength', ->
    test 'should work for circle', ->
      brno = new LatLng '49.2020701', '16.5779606'
      barcelona = new LatLng '41.39479', '2.1487679'
      nyc = new LatLng '40.7056308', '-73.9780035'
      brnoBarcelona = Spherical.computeDistanceBetween brno, barcelona
      barcelonaNyc = Spherical.computeDistanceBetween barcelona, nyc
      nycBrno = Spherical.computeDistanceBetween nyc, brno
      path = [brno, barcelona, nyc, brno]
      testLength = brnoBarcelona + barcelonaNyc + nycBrno

      length = Spherical.computeLength path

      assert.equal Math.round(length), Math.round(testLength)

  suite 'computeOffset', ->
    test 'should work', ->
      brno = new LatLng '49.2020701', '16.5779606'
      distance = 12345
      heading = 225
      shouldBe = new LatLng 49.123592015556916, 16.45813708831463

      offset = Spherical.computeOffset brno, distance, heading

      assert.isTrue offset.equals shouldBe

    test 'should work with computeHeading and computeDistanceBetween', ->
      brno = new LatLng 49.2020701, 16.5779606
      barcelona = new LatLng 41.39479, 2.1487679
      distance = Spherical.computeDistanceBetween brno, barcelona
      heading = Spherical.computeHeading brno, barcelona

      assert.isTrue barcelona.equals Spherical.computeOffset brno, distance, heading
