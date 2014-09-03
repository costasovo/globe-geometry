goog.require 'globeGeometry.encoding'

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

    test 'should work with float', ->
      enc = Encoding.encodeSignedNumber 38.5
      assert.equal enc, '_p~iF'
