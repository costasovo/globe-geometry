###*
  @fileoverview A point in geographical coordinates: latitude and longitude.
###

goog.provide 'globeGeometry.LatLng'

goog.require 'goog.string'

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
    @lat = Number lat
    @lng = Number lng

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
    lat = @lat.toFixed precision
    lng = @lng.toFixed precision
    return Number(lat) + ',' + Number(lng)

  ###*
    @param {globeGeometry.LatLng} other
    @return {boolean}
    @export
  ###
  equal: (other) ->
    lat = @round @getLat()
    lat2 = @round other.getLat()
    lng = @round @getLng()
    lng2 = @round other.getLng()
    return (lat == lat2) && (@lng == lng2)

  ###*
    @param {number} num
    @return {number}
    @private
  ###
  round: (num) ->
    for i in [0..6]
      if num <= 10^i
        return Number num.toPrecision @PRECISION + i
    return Number num.toPrecision @PRECISION