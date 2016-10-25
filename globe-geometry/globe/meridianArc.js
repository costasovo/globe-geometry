// Generated by github.com/steida/coffee2closure 0.1.12
/**
  @fileoverview Arc of meridian circle
 */
goog.provide('globeGeometry.globe.MeridianArc');
goog.require("goog.math.Range");

/**
  @param {number} start
  @param {number} end
  @constructor
  @final
 */
globeGeometry.globe.MeridianArc = function(start, end) {
  this.start = start;
  this.end = end;
  this.range = new goog.math.Range(this.start, this.end);
}

/**
  @return {number}
 */
globeGeometry.globe.MeridianArc.prototype.getStart = function() {
  return this.start;
};

/**
  @return {number}
 */
globeGeometry.globe.MeridianArc.prototype.getEnd = function() {
  return this.end;
};

/**
  @return {goog.math.Range}
 */
globeGeometry.globe.MeridianArc.prototype.getRange = function() {
  return this.range;
};

/**
  @param {number} point
  @return {boolean}
 */
globeGeometry.globe.MeridianArc.prototype.contains = function(point) {
  return goog.math.Range.containsPoint(this.range, point);
};

/**
  @param {number} point
  @return {globeGeometry.globe.MeridianArc}
 */
globeGeometry.globe.MeridianArc.prototype.extend = function(point) {
  var end, start;
  start = point < this.start ? point : this.start;
  end = point > this.end ? point : this.end;
  return new globeGeometry.globe.MeridianArc(start, end);
};

/**
  @return {number}
 */
globeGeometry.globe.MeridianArc.prototype.getCenter = function() {
  return (this.range.start + this.range.end) / 2;
};

/**
  @param {globeGeometry.globe.MeridianArc} other
  @return {boolean}
 */
globeGeometry.globe.MeridianArc.prototype.intersects = function(other) {
  if (this.isEmpty() || other.isEmpty()) {
    return false;
  }
  return goog.math.Range.hasIntersection(this.range, other.getRange());
};

/**
  @return {boolean}
 */
globeGeometry.globe.MeridianArc.prototype.isEmpty = function() {
  return this.end < this.start;
};