###*
  @fileoverview Utilities for polyline encoding and decoding
###

goog.provide 'globeGeometry.encoding'

goog.require 'globeGeometry.LatLng'

class globeGeometry.encoding

  ###*
    @param {Array.<globeGeometry.LatLng>} path
    @return {string}
    @export
    @see https://developers.google.com/maps/documentation/utilities/polylinealgorithm
  ###
  @encodePath: (path) ->
    encoded = ''
    prev = new globeGeometry.LatLng 0, 0
    for point in path
      latOffset = point.getLat() - prev.getLat()
      lngOffset = point.getLng() - prev.getLng()
      encoded += globeGeometry.encoding.encodeSignedNumber latOffset
      encoded += globeGeometry.encoding.encodeSignedNumber lngOffset
      prev = point
    return encoded

  ###*
    @param {string} path
    @return {Array.<globeGeometry.LatLng>}
    @export
    @see https://developers.google.com/maps/documentation/utilities/polylinealgorithm
  ###
  @decodePath: (path) ->
    nums = globeGeometry.encoding.decodeSignedNumbers path
    lat = lng = 0
    points = []
    for num, i in nums
      lat += num if i % 2 == 0
      lng += num if i % 2 == 1
      if i > 0 && i % 2 == 1
        points.push new globeGeometry.LatLng lat, lng
    return points

  ###*
    @param {number} value
    @return {string}
    @see https://developers.google.com/maps/documentation/utilities/polylinealgorithm
    @see http://jeromejaglale.com/doc/javascript/google_static_maps_polyline_encoding
  ###
  @encodeUnsignedNumber: (value) ->
    encoded = ''
    while value >= 0x20
      encoded += String.fromCharCode (0x20 | (value & 0x1f)) + 63
      value >>= 5

    encoded += String.fromCharCode value + 63
    return encoded

  ###*
    @param {number} value
    @return {string}
    @see https://developers.google.com/maps/documentation/utilities/polylinealgorithm
    @see http://jeromejaglale.com/doc/javascript/google_static_maps_polyline_encoding
  ###
  @encodeSignedNumber: (value) ->
    value = Math.round value * 1e5
    num = value << 1
    num = ~num if value < 0

    return globeGeometry.encoding.encodeUnsignedNumber num

  ###*
    @param {string} encoded
    @return {Array.<number>}
    @see https://developers.google.com/maps/documentation/utilities/polylinealgorithm
    @see http://cheateinstein.com/category-php/decoding-polyline-algorithm-format-javascriptphp/
  ###
  @decodeUnsignedNumbers: (encoded) ->
    index = 0; nums = []
    while index < encoded.length
      num = shift = 0
      loop
        b = encoded.charCodeAt(index++) - 63;
        num |= (b & 0x1f) << shift
        shift += 5
        break unless b >= 0x20
      nums.push num
    return nums

  ###*
    @param {string} encoded
    @return {Array.<number>}
    @see https://developers.google.com/maps/documentation/utilities/polylinealgorithm
    @see http://cheateinstein.com/category-php/decoding-polyline-algorithm-format-javascriptphp/
  ###
  @decodeSignedNumbers: (encoded) ->
    nums = globeGeometry.encoding.decodeUnsignedNumbers encoded
    for num, i in nums
      num = if (num & 1) then ~(num >> 1) else (num >> 1)
      nums[i] = num / 1e5
    return nums