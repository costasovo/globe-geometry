###*
  @fileoverview Tile in Mercator projection. Defined by x, y coordinate and zoom level
###
goog.provide 'globeGeometry.MercatorTile'

goog.require 'globeGeometry.math'

class globeGeometry.MercatorTile

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
    Factory for creating Tile instances from quadKey
    @param {string} quadKey
    @return {globeGeometry.MercatorTile}
    @export
  ###
  @createInstance: (quadKey) ->
    return globeGeometry.quadKey.fromQuadKeyToTile quadKey

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
    @param {globeGeometry.MercatorTile} tile
    @return {boolean}
    @export
  ###
  equals: (tile) ->
    return @x == tile.getX() && @y == tile.getY() && @z == tile.getZ()