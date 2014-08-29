suite 'globeGeometry.latLng.parser', ->

  Parser = new globeGeometry.latLng.parser()

  suite 'parseDms', ->
    test 'should work without letters and space separator', ->
      latLng = Parser.parseDms "49°12'32.3\" 16°35'53.9\""

      assert.sameMembers latLng, [49.208972, 16.598305]