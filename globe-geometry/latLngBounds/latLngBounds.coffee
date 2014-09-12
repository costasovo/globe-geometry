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
    @export
  ###
  getNorthEast: () -> @ne

  ###*
    @return {globeGeometry.LatLng | undefined}
    @export
  ###
  getSouthWest: () -> @sw

  ###*
    @return {boolean}
    @export
  ###
  isEmpty: () ->
    return !goog.isDefAndNotNull(@sw) && !goog.isDefAndNotNull(@ne)