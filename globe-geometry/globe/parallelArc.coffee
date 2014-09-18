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
  ###
  crossesDateMeridian: () ->
    return @start > @end

  ###*
    @return {boolean}
  ###
  crossesZeroMeridian: () ->
    return true if @start < 0 && @end > 0
    return true if @start > 0 && @end > 0 && @crossesDateMeridian()
    return true if @start < 0 && @end < 0 && @crossesDateMeridian()
    return false

  ###*
    @param {number} lat
    @return {boolean}
  ###
  contains: (lat) ->
    if @crossesDateMeridian()
      return lat >= @start || lat <= @end
    else
      return lat >= @start && lat <= @end

  ###*
    Extend the arc to minimize the length
    @param {number} lat
    @return {globeGeometry.globe.ParallelArc}
  ###
  extend: (lat) ->
    if @contains lat
      start = @start
      end = @end
    else
      testStart = new globeGeometry.globe.ParallelArc lat, @end
      testEnd = new globeGeometry.globe.ParallelArc @start, lat
      if testStart.getLength() >= testEnd.getLength()
        start = @start
        end = lat
      else
        start = lat
        end = @end
    return new globeGeometry.globe.ParallelArc start, end

  ###*
    @return {number}
  ###
  getCenter: () ->
    if @crossesDateMeridian()
      center = (@start + @end) / 2
      return center + 180 if center <= 0
      return center - 180
    else
      return (@start + @end) / 2

  ###*
    @param {globeGeometry.globe.ParallelArc} other
    @return {boolean}
  ###
  intersects: (other) ->
    return @contains(other.getStart()) ||
      @contains(other.getEnd()) ||
      other.contains(@getStart()) ||
      other.contains(@getEnd())

  ###*
    @return {boolean}
  ###
  isEmpty: () ->
    false

  ###*
    @return {number}
  ###
  getLength: () ->
    if @crossesDateMeridian()
      return 360 - @start + @end
    else
      return @end - @start
