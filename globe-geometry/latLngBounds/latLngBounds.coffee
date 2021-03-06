###*
  @fileoverview A LatLngBounds instance represents a rectangle in geographical coordinates, including one that crosses the 180 degrees longitudinal meridian.
###

goog.provide 'globeGeometry.LatLngBounds'

goog.require 'globeGeometry.LatLng'
goog.require 'globeGeometry.globe.MeridianArc'
goog.require 'globeGeometry.globe.ParallelArc'

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
    @return {globeGeometry.globe.MeridianArc}
  ###
  getMeridianArc: () ->
    return @meridianArc

  ###*
    @return {globeGeometry.globe.ParallelArc}
  ###
  getParallelArc: () ->
    return @parallelArc

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

  ###*
    @param {globeGeometry.LatLng} point
    @return {boolean}
    @export
  ###
  contains: (point) ->
    return false if @isEmpty()
    latOk = @meridianArc.contains point.getLat()
    lngOk = @parallelArc.contains point.getLng()
    return latOk && lngOk

  ###*
    @param {globeGeometry.LatLngBounds} other
    @return {boolean}
    @export
  ###
  intersects: (other) ->
    return false if @isEmpty() || other.isEmpty()
    return @meridianArc.intersects(other.getMeridianArc()) && @parallelArc.intersects(other.getParallelArc())

  ###*
    @return {string}
    @export
  ###
  toString: () ->
    return '((1, 180), (-1, -180))' if !goog.isDefAndNotNull(@sw) && !goog.isDefAndNotNull(@ne) # Google maps has it this way
    sw = @sw
    ne = if goog.isDefAndNotNull @ne then @ne else @sw
    return '(' + sw.toString() + ', ' + ne.toString() + ')';

  ###*
    @param {number} precision
    @return {string}
    @export
  ###
  toUrlValue: (precision = 6) ->
    return '1,180,-1,-180' if !goog.isDefAndNotNull(@sw) && !goog.isDefAndNotNull(@ne) # Google maps has it this way
    sw = @sw
    ne = if goog.isDefAndNotNull @ne then @ne else @sw
    return sw.toUrlValue(precision) + ',' + ne.toUrlValue(precision);

  ###*
    @param {globeGeometry.LatLng} point
    @return {globeGeometry.LatLngBounds}
    @export
  ###
  extend: (point) ->
    meridianArc = @meridianArc.extend point.getLat() if goog.isDefAndNotNull @meridianArc
    parallelArc = @parallelArc.extend point.getLng() if goog.isDefAndNotNull @parallelArc

    if goog.isDefAndNotNull(meridianArc) && goog.isDefAndNotNull(parallelArc)
      sw = new globeGeometry.LatLng meridianArc.getStart(), parallelArc.getStart()
      ne = new globeGeometry.LatLng meridianArc.getEnd(), parallelArc.getEnd()
    else if goog.isDefAndNotNull @sw
      sw = @sw
      ne = point
    else
      sw = point
      ne = point

    return new globeGeometry.LatLngBounds sw, ne

  ###*
    @param {globeGeometry.LatLngBounds} other
    @return {globeGeometry.LatLngBounds}
    @export
  ###
  union: (other) ->
    bounds = new globeGeometry.LatLngBounds @getSouthWest(), @getNorthEast()
    sw = other.getSouthWest()
    bounds = bounds.extend sw if goog.isDefAndNotNull sw
    ne = other.getNorthEast()
    bounds = bounds.extend ne if goog.isDefAndNotNull ne
    return bounds
