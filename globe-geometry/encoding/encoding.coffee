###*
  @fileoverview Utilities for polyline encoding and decoding
###

goog.provide 'globeGeometry.encoding'

goog.require 'goog.math'

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
    bin = value.toString 2
    encoded = ''
    steps = Math.floor bin.length / 5
    for i in [0..steps]
      start = bin.length - i*5 - 5
      end = bin.length - i*5
      chunk = bin.substring start, end
      chunk = parseInt chunk, 2
      chunk = chunk|32 if i < steps
      encoded += String.fromCharCode chunk + 63
    return encoded

  ###*
    @param {number} value
    @return {string}
    @see https://developers.google.com/maps/documentation/utilities/polylinealgorithm
  ###
  @encodeSignedNumber: (value) ->
    value = Math.round value * 1e5
    if value < 0
      num = (~value >>> 0) + 1
      num = (~num >>> 0) + 1
    else
      num = value
    num = (num << 1) >>> 0
    if value < 0
      num = ~num >>> 0
    encoded = globeGeometry.encoding.encodeUnsignedNumber num
    return encoded