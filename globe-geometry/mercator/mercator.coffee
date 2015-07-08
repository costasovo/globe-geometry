###*
  @fileoverview Utility functions for computing in Mercator spherical projection.
###

goog.provide 'globeGeometry.mercator'

goog.require 'globeGeometry.LatLng'
goog.require 'globeGeometry.LatLngBounds'
goog.require 'globeGeometry.Point'
goog.require 'globeGeometry.MercatorTile'

class globeGeometry.mercator

  ###*
    @type {number} Size of tile in pixels
    @public
  ###
  @TILE_SIZE: 256

  ###*
    @param {globeGeometry.LatLng} latLng
    @param {number} zoomLevel
    @return {globeGeometry.Point}
    @export
    @see http://msdn.microsoft.com/en-us/library/bb259689.aspx
  ###
  @fromLatLngToPoint: (latLng, zoomLevel) ->
    canvasSize = globeGeometry.mercator.TILE_SIZE * Math.pow 2, zoomLevel
    sinLat = Math.sin latLng.getLat() * Math.PI/180
    x = ((latLng.getLng() + 180) / 360) * canvasSize
    y = (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * canvasSize
    return new globeGeometry.Point x, y

  ###*
    @param {globeGeometry.LatLng} latLng
    @param {number} zoomLevel
    @return {globeGeometry.MercatorTile}
    @export
    @see http://msdn.microsoft.com/en-us/library/bb259689.aspx
  ###
  @fromLatLngToTile: (latLng, zoomLevel) ->
    point = globeGeometry.mercator.fromLatLngToPoint latLng, zoomLevel
    x = point.getX() / globeGeometry.mercator.TILE_SIZE
    x = Math.floor x
    y = point.getY() / globeGeometry.mercator.TILE_SIZE
    y = if latLng.getLng() < 0 then Math.ceil y else Math.floor y
    return new globeGeometry.MercatorTile x, y, zoomLevel

  ###*
    @param {globeGeometry.Point} point
    @param {number} zoomLevel
    @return {globeGeometry.LatLng}
    @export
    @see http://msdn.microsoft.com/en-us/library/bb259689.aspx
  ###
  @fromPointToLatLng: (point, zoomLevel) ->
    canvasSize = globeGeometry.mercator.TILE_SIZE * Math.pow 2, zoomLevel
    x = goog.math.clamp point.getX(), 0, canvasSize - 1
    y = goog.math.clamp point.getY(), 0, canvasSize - 1

    x = x / canvasSize - 0.5
    y = 0.5 - y / canvasSize
    lat = 90 - 360 * Math.atan(Math.exp(-y * 2 * Math.PI)) / Math.PI
    lng = 360 * x

    return new globeGeometry.LatLng lat, lng

  ###*
    @param {globeGeometry.MercatorTile} tile
    @return {globeGeometry.LatLngBounds}
    @export
  ###
  @fromTileToLatLngBounds: (tile) ->
    swX = tile.getX() * globeGeometry.mercator.TILE_SIZE
    swY = tile.getY() * globeGeometry.mercator.TILE_SIZE + globeGeometry.mercator.TILE_SIZE - 1
    neX = tile.getX() * globeGeometry.mercator.TILE_SIZE + globeGeometry.mercator.TILE_SIZE - 1
    neY = tile.getY() * globeGeometry.mercator.TILE_SIZE
    swPoint = new globeGeometry.Point swX, swY
    nePoint = new globeGeometry.Point neX, neY
    sw = globeGeometry.mercator.fromPointToLatLng swPoint, tile.getZ()
    ne = globeGeometry.mercator.fromPointToLatLng nePoint, tile.getZ()
    return new globeGeometry.LatLngBounds sw, ne

  ###*
    @param {globeGeometry.LatLngBounds} bounds
    @param {number} zoomLevel
    @return {globeGeometry.LatLngBounds}
    @export
  ###
  @zoomOutBounds: (bounds, zoomLevel) ->
    ne = bounds.getNorthEast()
    sw = bounds.getSouthWest()

    if !goog.isDef(sw) || !goog.isDef(ne)
      return null

    swPoint = globeGeometry.mercator.fromLatLngToPoint sw, zoomLevel
    nePoint = globeGeometry.mercator.fromLatLngToPoint ne, zoomLevel

    diffX = Math.abs(swPoint.getX() - nePoint.getX())
    diffY = Math.abs(swPoint.getY() - nePoint.getY())

    zoomedSwPoint = new globeGeometry.Point swPoint.getX() - (diffX/2), swPoint.getY() + (diffY/2) 
    zoomedNePoint = new globeGeometry.Point nePoint.getX() + (diffX/2), nePoint.getY() - (diffY/2) 

    sw = globeGeometry.mercator.fromPointToLatLng zoomedSwPoint, zoomLevel
    ne = globeGeometry.mercator.fromPointToLatLng zoomedNePoint, zoomLevel 

    return new globeGeometry.LatLngBounds sw, ne
