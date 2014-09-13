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

  ###*
    @param {globeGeometry.LatLngBounds} bounds
    @return {boolean}
    @export
  ###
  equals: (bounds) ->
    return true if @isEmpty() && bounds.isEmpty()
    sw = bounds.getSouthWest()
    ne = bounds.getNorthEast()
    return true if @sw.equals(sw) && !goog.isDefAndNotNull(ne) && !goog.isDefAndNotNull(@ne)
    return sw.equals(@sw) && ne.equals(@ne)