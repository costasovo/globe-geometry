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
    null

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
