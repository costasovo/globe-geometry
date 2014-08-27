###*
  @fileoverview A point in geographical coordinates: latitude and longitude.
###

goog.provide 'globeGeometry.LatLng'

goog.require 'goog.math'

class globeGeometry.LatLng

  ###*
    @type {number}
    @private
  ###
  PRECISION: 9

  ###*
    @param {*} lat
    @param {*} lng
    @constructor
    @final
    @export
  ###
  constructor: (lat, lng) ->
    @lat = goog.math.clamp Number(lat), -90, 90
    @lng = goog.math.clamp Number(lng), -180, 180

  ###*
    @return {number}
    @export
  ###
  getLat: () -> return @lat

  ###*
    @return {number}
    @export
  ###
  getLng: () -> return @lng

  ###*
    @return {string}
    @export
  ###
  toString: () ->
    return '(' + @lat + ', ' + @lng + ')'

  ###*
    @param {number} precision
    @return {string}
    @export
  ###
  toUrlValue: (precision = 6) ->
    lat = @round @getLat(), precision
    lng = @round @getLng(), precision
    return Number(lat) + ',' + Number(lng)

  ###*
    @param {globeGeometry.LatLng} other
    @return {boolean}
    @export
  ###
  equals: (other) ->
    return goog.math.nearlyEquals(@getLat(), other.getLat()) && goog.math.nearlyEquals(@getLng(), other.getLng())

  ###*
    @param {number} num
    @param {number=} precision
    @return {number}
    @private
  ###
  round: (num, precision = @PRECISION) ->
    big = Math.abs(num) * Math.pow(10, precision)
    return goog.math.sign(num) * goog.math.safeFloor(big) / Math.pow(10, precision)
