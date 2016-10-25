// Generated by github.com/steida/coffee2closure 0.1.12
/**
  @fileoverview Utility functions for computing QuadKeys in Mercator spherical projection.
 */
goog.provide('globeGeometry.quadKey');
goog.require('globeGeometry.mercator');
goog.require('globeGeometry.MercatorTile');
globeGeometry.quadKey = function() {}

/**
  @param {globeGeometry.LatLng} latLng
  @param {number} zoomLevel
  @return {string}
  @export
  @see http://msdn.microsoft.com/en-us/library/bb259689.aspx
 */
globeGeometry.quadKey.fromLatLngToQuadKey = function(latLng, zoomLevel) {
  var tile;
  tile = globeGeometry.mercator.fromLatLngToTile(latLng, zoomLevel);
  return globeGeometry.quadKey.fromTileToQuadKey(tile);
};

/**
  @param {globeGeometry.MercatorTile} tile
  @return {string}
  @export
  @see http://msdn.microsoft.com/en-us/library/bb259689.aspx
 */
globeGeometry.quadKey.fromTileToQuadKey = function(tile) {
  var digit, i, key, mask, _i, _ref;
  key = '';
  for (i = _i = _ref = tile.getZ(); _ref <= 1 ? _i <= 1 : _i >= 1; i = _ref <= 1 ? ++_i : --_i) {
    digit = 0;
    mask = 1 << (i - 1);
    if ((tile.getX() & mask) !== 0) {
      digit += 1;
    }
    if ((tile.getY() & mask) !== 0) {
      digit += 2;
    }
    key += digit;
  }
  return key;
};

/**
  @param {string} key
  @return {globeGeometry.MercatorTile}
  @export
  @see http://msdn.microsoft.com/en-us/library/bb259689.aspx
 */
globeGeometry.quadKey.fromQuadKeyToTile = function(key) {
  var i, mask, x, y, zoomLevel, _i;
  x = y = 0;
  zoomLevel = key.length;
  for (i = _i = zoomLevel; zoomLevel <= 1 ? _i <= 1 : _i >= 1; i = zoomLevel <= 1 ? ++_i : --_i) {
    mask = 1 << (i - 1);
    switch (key[zoomLevel - i]) {
      case '0':
        break;
      case '1':
        x |= mask;
        break;
      case '2':
        y |= mask;
        break;
      case '3':
        x |= mask;
        y |= mask;
        break;
      default:
        throw new Error('Invalid QuadKey digit sequence.');
    }
  }
  return new globeGeometry.MercatorTile(x, y, zoomLevel);
};