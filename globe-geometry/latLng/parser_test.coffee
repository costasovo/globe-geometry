suite 'globeGeometry.latLng.parser', ->

  Parser = new globeGeometry.latLng.parser()

  suite 'parseDms', ->
    test 'should work without letters and with space separator', ->
      latLng = Parser.parseDms "49°12'32.3\" 16°35'53.9\""

      assert.sameMembers latLng, [49.208972, 16.598305]

    test 'should work without letters and with comma separator', ->
      latLng = Parser.parseDms "49°12'32.3\",16°35'53.9\""

      assert.sameMembers latLng, [49.208972, 16.598305]

    test 'should work without letters and with comma space separator', ->
      latLng = Parser.parseDms "49°12'32.3\", 16°35'53.9\""

      assert.sameMembers latLng, [49.208972, 16.598305]

    test 'should work without values separated by spaces', ->
      latLng = Parser.parseDms "32° 18' 23.1\" 122° 36' 52.5\""

      assert.sameMembers latLng, [32.306416, 122.614583]