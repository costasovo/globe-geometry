// Generated by github.com/steida/coffee2closure 0.1.12
/**
  @fileoverview Utility functions for computing in Mercator spherical projection.
 */
goog.provide('globeGeometry.mercator');
goog.require('globeGeometry.LatLng');
goog.require('globeGeometry.LatLngBounds');
goog.require('globeGeometry.Point');
goog.require('globeGeometry.MercatorTile');
globeGeometry.mercator = function() {}

/**
  @type {number} Size of tile in pixels
  @public
 */
globeGeometry.mercator.TILE_SIZE = 256;

/**
  @param {globeGeometry.LatLng} latLng
  @param {number} zoomLevel
  @return {globeGeometry.Point}
  @export
  @see http://msdn.microsoft.com/en-us/library/bb259689.aspx
 */
globeGeometry.mercator.fromLatLngToPoint = function(latLng, zoomLevel) {
  var canvasSize, sinLat, x, y;
  canvasSize = globeGeometry.mercator.TILE_SIZE * Math.pow(2, zoomLevel);
  sinLat = Math.sin(latLng.getLat() * Math.PI / 180);
  x = ((latLng.getLng() + 180) / 360) * canvasSize;
  y = (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * canvasSize;
  return new globeGeometry.Point(x, y);
};

/**
  @param {globeGeometry.LatLng} latLng
  @param {number} zoomLevel
  @return {globeGeometry.MercatorTile}
  @export
  @see http://msdn.microsoft.com/en-us/library/bb259689.aspx
 */
globeGeometry.mercator.fromLatLngToTile = function(latLng, zoomLevel) {
  var point, x, y;
  point = globeGeometry.mercator.fromLatLngToPoint(latLng, zoomLevel);
  x = Math.floor(point.getX() / globeGeometry.mercator.TILE_SIZE);
  y = Math.floor(point.getY() / globeGeometry.mercator.TILE_SIZE);
  return new globeGeometry.MercatorTile(x, y, zoomLevel);
};

/**
  @param {globeGeometry.Point} point
  @param {number} zoomLevel
  @return {globeGeometry.LatLng}
  @export
  @see http://msdn.microsoft.com/en-us/library/bb259689.aspx
 */
globeGeometry.mercator.fromPointToLatLng = function(point, zoomLevel) {
  var canvasSize, lat, lng, x, y;
  canvasSize = globeGeometry.mercator.TILE_SIZE * Math.pow(2, zoomLevel);
  x = goog.math.clamp(point.getX(), 0, canvasSize - 1);
  y = goog.math.clamp(point.getY(), 0, canvasSize - 1);
  x = x / canvasSize - 0.5;
  y = 0.5 - y / canvasSize;
  lat = 90 - 360 * Math.atan(Math.exp(-y * 2 * Math.PI)) / Math.PI;
  lng = 360 * x;
  return new globeGeometry.LatLng(lat, lng);
};

/**
  @param {globeGeometry.MercatorTile} tile
  @return {globeGeometry.LatLngBounds}
  @export
 */
globeGeometry.mercator.fromTileToLatLngBounds = function(tile) {
  var ne, nePoint, neX, neY, sw, swPoint, swX, swY;
  swX = tile.getX() * globeGeometry.mercator.TILE_SIZE;
  swY = tile.getY() * globeGeometry.mercator.TILE_SIZE + globeGeometry.mercator.TILE_SIZE - 1;
  neX = tile.getX() * globeGeometry.mercator.TILE_SIZE + globeGeometry.mercator.TILE_SIZE - 1;
  neY = tile.getY() * globeGeometry.mercator.TILE_SIZE;
  swPoint = new globeGeometry.Point(swX, swY);
  nePoint = new globeGeometry.Point(neX, neY);
  sw = globeGeometry.mercator.fromPointToLatLng(swPoint, tile.getZ());
  ne = globeGeometry.mercator.fromPointToLatLng(nePoint, tile.getZ());
  return new globeGeometry.LatLngBounds(sw, ne);
};

/**
  @param {globeGeometry.LatLngBounds} bounds
  @param {number} zoomLevel
  @return {globeGeometry.LatLngBounds}
  @export
 */
globeGeometry.mercator.zoomOutBounds = function(bounds, zoomLevel) {
  var diffX, diffY, ne, nePoint, sw, swPoint, zoomedNePoint, zoomedSwPoint;
  ne = bounds.getNorthEast();
  sw = bounds.getSouthWest();
  if (!goog.isDef(sw) || !goog.isDef(ne)) {
    return null;
  }
  swPoint = globeGeometry.mercator.fromLatLngToPoint(sw, zoomLevel);
  nePoint = globeGeometry.mercator.fromLatLngToPoint(ne, zoomLevel);
  diffX = Math.abs(swPoint.getX() - nePoint.getX());
  diffY = Math.abs(swPoint.getY() - nePoint.getY());
  zoomedSwPoint = new globeGeometry.Point(swPoint.getX() - (diffX / 2), swPoint.getY() + (diffY / 2));
  zoomedNePoint = new globeGeometry.Point(nePoint.getX() + (diffX / 2), nePoint.getY() - (diffY / 2));
  sw = globeGeometry.mercator.fromPointToLatLng(zoomedSwPoint, zoomLevel);
  ne = globeGeometry.mercator.fromPointToLatLng(zoomedNePoint, zoomLevel);
  return new globeGeometry.LatLngBounds(sw, ne);
};