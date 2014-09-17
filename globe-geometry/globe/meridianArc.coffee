###*
  @fileoverview Arc of meridian circle
###

goog.provide 'globeGeometry.globe.MeridianArc'

goog.require "goog.math.Range"

class globeGeometry.globe.MeridianArc

  ###*
    @param {number} start
    @param {number} end
    @constructor
    @final
  ###
  constructor: (@start, @end) ->
    @range = new goog.math.Range @start, @end

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
    @return {goog.math.Range}
  ###
  getRange: () ->
    return @range

  ###*
    @param {number} point
    @return {boolean}
  ###
  contains: (point) ->
    return goog.math.Range.containsPoint @range, point

  ###*
    @param {number} point
  ###
  extend: (point) ->
    @start = point if point < @start
    @end = point if point > @end
    @range.includePoint point

  ###*
    @return {number}
  ###
  getCenter: () ->
    return (@range.start + @range.end) / 2

  ###*
    @param {globeGeometry.globe.MeridianArc} other
    @return {boolean}
  ###
  intersects: (other) ->
    return false if @isEmpty() || other.isEmpty()
    return goog.math.Range.hasIntersection @range, other.getRange()

  ###*
    @return {boolean}
  ###
  isEmpty: () ->
    return @end < @start
