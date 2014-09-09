###*
  @fileoverview Utility functions for computing QuadKeys in Mercator spherical projection.
###

goog.provide 'globeGeometry.quadKey'

goog.require 'globeGeometry.mercator'

class globeGeometry.quadKey

  ###*
    @param {globeGeometry.LatLng} latLng
    @param {number} zoomLevel
    @return {string}
    @export
    @see http://msdn.microsoft.com/en-us/library/bb259689.aspx
  ###
  @fromLatLngToQuadKey: (latLng, zoomLevel) ->
    tile = globeGeometry.mercator.fromLatLngToTile latLng, zoomLevel
    return globeGeometry.quadKey.fromTileToQuadKey tile, zoomLevel

  ###*
    @param {goog.math.Coordinate} tile
    @param {number} zoomLevel
    @return {string}
    @export
    @see http://msdn.microsoft.com/en-us/library/bb259689.aspx
  ###
  @fromTileToQuadKey: (tile, zoomLevel) ->
    key = ''
    for i in [zoomLevel..1]
      digit = 0
      mask = 1 << (i - 1)
      digit += 1 if (tile.x & mask) != 0
      digit += 2 if (tile.y & mask) != 0
      key += digit
    return key