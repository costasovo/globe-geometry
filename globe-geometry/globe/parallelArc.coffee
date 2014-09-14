###*
  @fileoverview Arc of parallel circle
###

goog.provide 'globeGeometry.globe.ParallelArc'

class globeGeometry.globe.ParallelArc

  ###*
    @param {number} start
    @param {number} end
    @constructor
    @final
  ###
  constructor: (@start, @end) ->

  ###*
    @return {number}
  ###
  getStart: () ->
    return @start

  ###*
    @return {number}
  ###
  getEnd: () ->
    return @end

  ###*
    @return {boolean}
    @private
  ###
  crossesDateMeridian: () ->
    return @start > @end

  ###*
    @return {boolean}
    @private
  ###
  crossesZeroMeridian: () ->
    return true if @start < 0 && @end > 0
    return true if @start > 0 && @end > 0 && @crossesDateMeridian()
    return false

  ###*
    @param {number} lat
    @return {boolean}
  ###
  contains: (lat) ->
    false

  ###*
    @param {number} lat
    @return {boolean}
  ###
  extend: (lat) ->
    false

  ###*
    @return {number}
    @private
  ###
  getCenter: () ->
    return

  ###*
    @param {globeGeometry.LatLng} latLng
    @return {boolean}
  ###
  intersects: (latLng) ->
    false

  ###*
    @return {boolean}
  ###
  isEmpty: () ->
    false
