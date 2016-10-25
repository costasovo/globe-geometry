// Generated by github.com/steida/coffee2closure 0.1.12
/**
  @fileoverview A LatLngBounds instance represents a rectangle in geographical coordinates, including one that crosses the 180 degrees longitudinal meridian.
 */
goog.provide('globeGeometry.LatLngBounds');
goog.require('globeGeometry.LatLng');
goog.require('globeGeometry.globe.MeridianArc');
goog.require('globeGeometry.globe.ParallelArc');

/**
  @param {globeGeometry.LatLng=} sw
  @param {globeGeometry.LatLng=} ne
  @constructor
  @final
  @export
 */
globeGeometry.LatLngBounds = function(sw, ne) {
  this.sw = sw;
  this.ne = ne;
  if (goog.isDefAndNotNull(this.sw) && goog.isDefAndNotNull(this.ne)) {
    this.meridianArc = new globeGeometry.globe.MeridianArc(this.sw.getLat(), this.ne.getLat());
    this.parallelArc = new globeGeometry.globe.ParallelArc(this.sw.getLng(), this.ne.getLng());
  }
}

/**
  @return {globeGeometry.LatLng | undefined}
  @export
 */
globeGeometry.LatLngBounds.prototype.getNorthEast = function() {
  return this.ne;
};

/**
  @return {globeGeometry.LatLng | undefined}
  @export
 */
globeGeometry.LatLngBounds.prototype.getSouthWest = function() {
  return this.sw;
};

/**
  @return {globeGeometry.globe.MeridianArc}
 */
globeGeometry.LatLngBounds.prototype.getMeridianArc = function() {
  return this.meridianArc;
};

/**
  @return {globeGeometry.globe.ParallelArc}
 */
globeGeometry.LatLngBounds.prototype.getParallelArc = function() {
  return this.parallelArc;
};

/**
  @return {boolean}
  @export
 */
globeGeometry.LatLngBounds.prototype.isEmpty = function() {
  return !goog.isDefAndNotNull(this.sw) && !goog.isDefAndNotNull(this.ne);
};

/**
  @param {globeGeometry.LatLngBounds} bounds
  @return {boolean}
  @export
 */
globeGeometry.LatLngBounds.prototype.equals = function(bounds) {
  var ne, sw;
  if (this.isEmpty() && bounds.isEmpty()) {
    return true;
  }
  sw = bounds.getSouthWest();
  ne = bounds.getNorthEast();
  if (this.sw.equals(sw) && !goog.isDefAndNotNull(ne) && !goog.isDefAndNotNull(this.ne)) {
    return true;
  }
  return sw.equals(this.sw) && ne.equals(this.ne);
};

/**
  @return {boolean}
  @private
 */
globeGeometry.LatLngBounds.prototype.crossesDateMeridian = function() {
  if (this.isEmpty()) {
    return false;
  }
  if ((this.sw.getLng() === 180) || (this.sw.getLng() === -180)) {
    return true;
  }
  if (!goog.isDefAndNotNull(this.parallelArc)) {
    return false;
  }
  return this.parallelArc.crossesDateMeridian();
};

/**
  @return {boolean}
  @private
 */
globeGeometry.LatLngBounds.prototype.isEDef = function() {
  return goog.isDefAndNotNull(this.sw) && goog.isDefAndNotNull(this.ne);
};

/**
  @return {globeGeometry.LatLng}
  @export
 */
globeGeometry.LatLngBounds.prototype.getCenter = function() {
  var lat, lng;
  if (this.isEmpty()) {
    return null;
  }
  lat = this.meridianArc.getCenter();
  lng = this.parallelArc.getCenter();
  return new globeGeometry.LatLng(lat, lng);
};

/**
  @param {globeGeometry.LatLng} point
  @return {boolean}
  @export
 */
globeGeometry.LatLngBounds.prototype.contains = function(point) {
  var latOk, lngOk;
  if (this.isEmpty()) {
    return false;
  }
  latOk = this.meridianArc.contains(point.getLat());
  lngOk = this.parallelArc.contains(point.getLng());
  return latOk && lngOk;
};

/**
  @param {globeGeometry.LatLngBounds} other
  @return {boolean}
  @export
 */
globeGeometry.LatLngBounds.prototype.intersects = function(other) {
  if (this.isEmpty() || other.isEmpty()) {
    return false;
  }
  return this.meridianArc.intersects(other.getMeridianArc()) && this.parallelArc.intersects(other.getParallelArc());
};

/**
  @return {string}
  @export
 */
globeGeometry.LatLngBounds.prototype.toString = function() {
  var ne, sw;
  if (!goog.isDefAndNotNull(this.sw) && !goog.isDefAndNotNull(this.ne)) {
    return '((1, 180), (-1, -180))';
  }
  sw = this.sw;
  ne = goog.isDefAndNotNull(this.ne) ? this.ne : this.sw;
  return '(' + sw.toString() + ', ' + ne.toString() + ')';
};

/**
  @param {number} precision
  @return {string}
  @export
 */
globeGeometry.LatLngBounds.prototype.toUrlValue = function(precision) {
  var ne, sw;
  if (precision == null) {
    precision = 6;
  }
  if (!goog.isDefAndNotNull(this.sw) && !goog.isDefAndNotNull(this.ne)) {
    return '1,180,-1,-180';
  }
  sw = this.sw;
  ne = goog.isDefAndNotNull(this.ne) ? this.ne : this.sw;
  return sw.toUrlValue(precision) + ',' + ne.toUrlValue(precision);
};

/**
  @param {globeGeometry.LatLng} point
  @return {globeGeometry.LatLngBounds}
  @export
 */
globeGeometry.LatLngBounds.prototype.extend = function(point) {
  var meridianArc, ne, parallelArc, sw;
  if (goog.isDefAndNotNull(this.meridianArc)) {
    meridianArc = this.meridianArc.extend(point.getLat());
  }
  if (goog.isDefAndNotNull(this.parallelArc)) {
    parallelArc = this.parallelArc.extend(point.getLng());
  }
  if (goog.isDefAndNotNull(meridianArc) && goog.isDefAndNotNull(parallelArc)) {
    sw = new globeGeometry.LatLng(meridianArc.getStart(), parallelArc.getStart());
    ne = new globeGeometry.LatLng(meridianArc.getEnd(), parallelArc.getEnd());
  } else if (goog.isDefAndNotNull(this.sw)) {
    sw = this.sw;
    ne = point;
  } else {
    sw = point;
    ne = point;
  }
  return new globeGeometry.LatLngBounds(sw, ne);
};

/**
  @param {globeGeometry.LatLngBounds} other
  @return {globeGeometry.LatLngBounds}
  @export
 */
globeGeometry.LatLngBounds.prototype.union = function(other) {
  var bounds, ne, sw;
  bounds = new globeGeometry.LatLngBounds(this.getSouthWest(), this.getNorthEast());
  sw = other.getSouthWest();
  if (goog.isDefAndNotNull(sw)) {
    bounds = bounds.extend(sw);
  }
  ne = other.getNorthEast();
  if (goog.isDefAndNotNull(ne)) {
    bounds = bounds.extend(ne);
  }
  return bounds;
};