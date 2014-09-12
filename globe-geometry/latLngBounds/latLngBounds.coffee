###*
  @fileoverview A LatLngBounds instance represents a rectangle in geographical coordinates.
###

goog.provide 'globeGeometry.LatLngBounds'

goog.require 'globeGeometry.LatLng'

class globeGeometry.LatLngBounds

  ###*
    @param {globeGeometry.LatLng=} sw
    @param {globeGeometry.LatLng=} ne
    @constructor
    @final
    @export
  ###
  constructor: (@sw, @ne) ->

  ###*
    @return {globeGeometry.LatLng | undefined}
  ###
  getNorthEast: () -> @ne

  ###*
    @return {globeGeometry.LatLng | undefined}
  ###
  getSouthWest: () -> @sw