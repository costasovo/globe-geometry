###*
  @fileoverview Utilities for polyline encoding and decoding
###

goog.provide 'globeGeometry.encoding'

goog.require 'goog.math'
goog.require 'goog.math.Integer'

class globeGeometry.encoding

  ###*
    @param {Array.<globeGeometry.LatLng>} path
    @return {string}
    @export
    @see https://developers.google.com/maps/documentation/utilities/polylinealgorithm
  ###
  @encodePath: (path) ->
    return ''

  ###*
    @param {number} value
    @return {string}
    @see https://developers.google.com/maps/documentation/utilities/polylinealgorithm
  ###
  @encodeUnsignedNumber: (value) ->
    encoded = ''
    num = goog.math.Integer.fromInt value
    bin = num.toString 2
    steps = Math.floor bin.length / 5
    for i in [0..steps]
      start = bin.length - i*5 - 5
      end = bin.length - i*5
      chunk = bin.substring start, end
      chunk = goog.math.Integer.fromString chunk, 2
      chunk = chunk.or goog.math.Integer.fromInt 32 if i < steps
      encoded += String.fromCharCode chunk.toInt() + 63

    return encoded