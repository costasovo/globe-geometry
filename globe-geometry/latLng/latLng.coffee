###*
  @fileoverview A point in geographical coordinates: latitude and longitude.
###

goog.provide 'globeGeometry.LatLng'

goog.require 'globeGeometry.latLng.parser'
goog.require 'globeGeometry.math'
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
    Factory for creating LatLng instances from various input data formats
    @param {string} input
    @return {globeGeometry.LatLng}
    @export
  ###
  @createInstance: (input) ->
    parser = new globeGeometry.latLng.parser()
    latLng = parser.parseDms input
    latLng = parser.parseDdm input if !goog.isArray latLng
    latLng = parser.parseDd input if !goog.isArray latLng

    throw Error 'Invalid input' if !goog.isArray latLng

    return new globeGeometry.LatLng latLng[0], latLng[1]

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
    lat = globeGeometry.math.toFixed @getLat(), precision
    lng = globeGeometry.math.toFixed @getLng(), precision
    return Number(lat) + ',' + Number(lng)

  ###*
    @param {globeGeometry.LatLng} other
    @return {boolean}
    @export
  ###
  equals: (other) ->
    return goog.math.nearlyEquals(@getLat(), other.getLat()) && goog.math.nearlyEquals(@getLng(), other.getLng())

