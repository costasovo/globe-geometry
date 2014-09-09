###*
  @fileoverview Utility functions for computing in Mercator spherical projection.
###

goog.provide 'globeGeometry.mercator'

goog.require 'goog.math.Coordinate'

class globeGeometry.mercator

  ###*
    @type {number} Size of tile in pixels
    @public
  ###
  @TILE_SIZE: 256

  ###*
    @param {globeGeometry.LatLng} latLng
    @param {number} zoomLevel
    @return {goog.math.Coordinate}
    @export
    @see http://msdn.microsoft.com/en-us/library/bb259689.aspx
  ###
  @fromLatLngToPoint: (latLng, zoomLevel) ->
    canvasSize = globeGeometry.mercator.TILE_SIZE * Math.pow 2, zoomLevel
    sinLat = Math.sin latLng.getLat() * Math.PI/180
    x = ((latLng.getLng() + 180) / 360) * canvasSize
    y = (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * canvasSize
    return new goog.math.Coordinate x, y

  ###*
    @param {globeGeometry.LatLng} latLng
    @param {number} zoomLevel
    @return {goog.math.Coordinate}
    @export
    @see http://msdn.microsoft.com/en-us/library/bb259689.aspx
  ###
  @fromLatLngToTile: (latLng, zoomLevel) ->
    point = globeGeometry.mercator.fromLatLngToPoint latLng, zoomLevel
    x = Math.floor point.x / globeGeometry.mercator.TILE_SIZE
    y = Math.floor point.y / globeGeometry.mercator.TILE_SIZE
    return new goog.math.Coordinate x, y
