###*
  @fileoverview Tile in Mercator projection. Defined by x, y coordinate and zoom level
###

goog.provide 'globeGeometry.mercator.Tile'

goog.require 'globeGeometry.mercator'
goog.require 'globeGeometry.math'
goog.require 'globeGeometry.quadKey'

class globeGeometry.mercator.Tile

  ###*
    @param {number} x
    @param {number} y
    @param {number} z
    @constructor
    @final
    @export
  ###
  constructor: (x, y, z) ->
    x = Math.round Math.abs Number x
    y = Math.round Math.abs Number y
    @z = Math.round Math.abs Number z
    max = Math.pow(2, @z) - 1
    @x = goog.math.clamp x, 0, max
    @y = goog.math.clamp y, 0, max

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
    @return {number}
    @export
  ###
  getZ: () -> return @z

  ###*
    @param {globeGeometry.mercator.Tile} tile
    @return {boolean}
    @export
  ###
  equals: (tile) ->
    return @x == tile.getX() && @y == tile.getY() && @z == tile.getZ()

  toQuadKey: () ->
    return globeGeometry.quadKey.fromTileToQuadKey @