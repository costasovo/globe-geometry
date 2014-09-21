suite 'globeGeometry.latLng.Parser', ->

  Parser = new globeGeometry.latLng.Parser()

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
        assert.sameMembers latLng, [49.208972, 16.598306], 'Failed to parse ' + input

    test 'should work with inputs from all parts of globe', ->
      inputs = [
        ["51°28'11.8\"N 117°24'03.0\"W", [51.469944, -117.400833]]
        ["23°56'34.0\"S 68°54'28.6\"W", [-23.942778, -68.907944]]
        ["37°51'19.3\"S 145°01'46.3\"E", [-37.855361, 145.029528]]
      ]
      for input in inputs
        latLng = Parser.parseDms input[0]
        assert.sameMembers latLng, input[1], 'Failed to parse ' + input[0]

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
        assert.sameMembers latLng, [32.306417, 122.614583], 'Failed to parse ' + input

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
        assert.sameMembers latLng, [32.30642, -122.61458], 'Failed to parse ' + input