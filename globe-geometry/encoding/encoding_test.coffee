goog.require 'globeGeometry.encoding'

suite 'globeGeometry.encoding', ->

  Encoding = globeGeometry.encoding
  LatLng = globeGeometry.LatLng

  suite 'encodeUnsignedNumber', ->
    test 'should work with unsigned value', ->
      enc = Encoding.encodeUnsignedNumber 174

      assert.equal enc, 'mD'
