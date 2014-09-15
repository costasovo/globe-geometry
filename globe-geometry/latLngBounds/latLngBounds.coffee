###*
  @fileoverview A LatLngBounds instance represents a rectangle in geographical coordinates.
###

goog.provide 'globeGeometry.LatLngBounds'

goog.require 'globeGeometry.LatLng'
goog.require 'globeGeometry.globe.MeridianArc'
goog.require 'globeGeometry.globe.ParallelArc'
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
    if goog.isDefAndNotNull(@sw) && goog.isDefAndNotNull(@ne)
      @meridianArc = new globeGeometry.globe.MeridianArc @sw.getLat(), @ne.getLat()
      @parallelArc = new globeGeometry.globe.ParallelArc @sw.getLng(), @ne.getLng()

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

  ###*
    @return {boolean}
    @private
  ###
  crossesDateMeridian: () ->
    return false if @isEmpty()
    return true if (@sw.getLng() == 180) || (@sw.getLng() == -180) # semi defined on meridian
    return false if !goog.isDefAndNotNull @parallelArc
    return @parallelArc.crossesDateMeridian()

  ###*
    @return {boolean}
    @private
  ###
  isEDef: () ->
    return goog.isDefAndNotNull(@sw) && goog.isDefAndNotNull(@ne)

  ###*
    @return {globeGeometry.LatLng}
    @export
  ###
  getCenter: () ->
    return null if @isEmpty()
    lat = @meridianArc.getCenter()
    lng = @parallelArc.getCenter()
    return new globeGeometry.LatLng lat, lng
