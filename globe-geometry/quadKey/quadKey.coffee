###*
  @fileoverview Utility functions for computing QuadKeys in Mercator spherical projection.
###

goog.provide 'globeGeometry.quadKey'

goog.require 'globeGeometry.mercator'
goog.require 'globeGeometry.MercatorTile'

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
    return globeGeometry.quadKey.fromTileToQuadKey tile

  ###*
    @param {globeGeometry.MercatorTile} tile
    @return {string}
    @export
    @see http://msdn.microsoft.com/en-us/library/bb259689.aspx
  ###
  @fromTileToQuadKey: (tile) ->
    key = ''
    for i in [tile.getZ()..1]
      digit = 0
      mask = 1 << (i - 1)
      digit += 1 if (tile.getX() & mask) != 0
      digit += 2 if (tile.getY() & mask) != 0
      key += digit
    return key

  ###*
    @param {string} key
    @return {globeGeometry.MercatorTile}
    @export
    @see http://msdn.microsoft.com/en-us/library/bb259689.aspx
  ###
  @fromQuadKeyToTile: (key) ->
    x = y = 0
    zoomLevel = key.length
    for i in [zoomLevel..1]
      mask = 1 << (i - 1)
      switch key[zoomLevel - i]
        when '0' then break
        when '1' then x |= mask
        when '2' then y |= mask
        when '3'
          x |= mask
          y |= mask
        else throw new Error 'Invalid QuadKey digit sequence.'
    return new globeGeometry.MercatorTile x, y, zoomLevel

