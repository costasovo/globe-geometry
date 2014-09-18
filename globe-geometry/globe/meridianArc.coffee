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
    @return {globeGeometry.globe.MeridianArc}
  ###
  extend: (point) ->
    start = if point < @start then point else @start
    end = if point > @end then point else @end
    return new globeGeometry.globe.MeridianArc start, end

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
