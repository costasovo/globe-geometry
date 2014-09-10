###*
  @fileoverview 2D point. Defined by x a y coordinate.
###

goog.provide 'globeGeometry.Point'

goog.require 'globeGeometry.math'

class globeGeometry.Point

  ###*
    @param {number} x
    @param {number} y
    @constructor
    @final
    @export
  ###
  constructor: (x, y) ->
    @x = Number x
    @y = Number y

  ###*
    @return {number}
    @export
  ###
  getX: () -> return @x

  ###*
    @return {number}
    @export
  ###
  getY: () -> return @y

  ###*
    @param {globeGeometry.Point} point
    @return {boolean}
    @export
  ###
  equals: (point) ->
    return @x == point.getX() && @y == point.getY()
