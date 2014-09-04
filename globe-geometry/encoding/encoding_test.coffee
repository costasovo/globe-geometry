goog.require 'globeGeometry.encoding'
goog.require 'globeGeometry.LatLng'

suite 'globeGeometry.encoding', ->

  Encoding = globeGeometry.encoding
  LatLng = globeGeometry.LatLng

  suite 'encodeUnsignedNumber', ->
    test 'should work with integer', ->
      enc = Encoding.encodeUnsignedNumber 174
      assert.equal enc, 'mD'

  suite 'encodeSignedNumber', ->
    test 'should work with negative float', ->
      enc = Encoding.encodeSignedNumber -179.9832104
      assert.equal enc, '`~oia@'
      enc = Encoding.encodeSignedNumber -120.2
      assert.equal enc, '~ps|U'

    test.skip 'should work with float', ->
      enc = Encoding.encodeSignedNumber 38.5
      assert.equal enc, '_p~iF'

  suite 'encodePath', ->
    test 'should encode path', ->
      path = [
        new LatLng 38.5, -120.2
        new LatLng 40.7, -120.95
        new LatLng 43.252, -126.453
      ]
      encodedPath = Encoding.encodePath path
      assert.equal encodedPath, '_p~iF~ps|U_ulLnnqC_mqNvxq`@'