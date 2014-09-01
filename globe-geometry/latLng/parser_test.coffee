suite 'globeGeometry.latLng.parser', ->

  Parser = new globeGeometry.latLng.parser()

  suite 'parseDms', ->
    test 'should work with various input formats', ->
      inputs = [
        "49°12'32.3\" 16°35'53.9\""
        "49° 12' 32.3\" 16° 35' 53.9\""
        "49°12'32.3\",16°35'53.9\""
        "49° 12' 32.3\",16° 35' 53.9\""
        "49°12'32.3\", 16°35'53.9\""
        "49° 12' 32.3\", 16° 35' 53.9\""
      ]
      for input in inputs
        latLng = Parser.parseDms input
        assert.sameMembers latLng, [49.208972, 16.598305], 'Failed to parse ' + input

  suite 'parseDdm', ->
    test 'should work with various input formats', ->
      inputs = [
        "32° 18.385' 122° 36.875'"
        "32°18.385' 122°36.875'"
        "32° 18.385',122° 36.875'"
        "32°18.385',122°36.875'"
        "32° 18.385', 122° 36.875'"
        "32°18.385', 122°36.875'"
      ]
      for input in inputs
        latLng = Parser.parseDdm input
        assert.sameMembers latLng, [32.306416, 122.614583], 'Failed to parse ' + input

  suite 'parseDd', ->
    test 'should work with various input formats', ->
      inputs = [
        "32.30642° N 122.61458° W"
        "32.30642° N, 122.61458° W"
        "32.30642°N 122.61458°W"
        "32.30642°N,122.61458°W"
      ]
      for input in inputs
        latLng = Parser.parseDd input
        assert.sameMembers latLng, [32.30642, 122.61458], 'Failed to parse ' + input