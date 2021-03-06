// Generated by github.com/steida/coffee2closure 0.1.12
/**
  @fileoverview 2D size, where width is the distance on the x-axis, and height is the distance on the y-axis.
 */
goog.provide('globeGeometry.Size');

/**
  @param {number} width
  @param {number} height
  @constructor
  @final
  @export
 */
globeGeometry.Size = function(width, height) {
  this.width = Number(width);
  this.height = Number(height);
}

/**
  @return {number}
  @export
 */
globeGeometry.Size.prototype.getWidth = function() {
  return this.width;
};

/**
  @return {number}
  @export
 */
globeGeometry.Size.prototype.getHeight = function() {
  return this.height;
};

/**
  @param {globeGeometry.Size} size
  @return {boolean}
  @export
 */
globeGeometry.Size.prototype.equals = function(size) {
  return this.width === size.getWidth() && this.height === size.getHeight();
};