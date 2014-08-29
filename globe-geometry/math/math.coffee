###*
  @fileoverview Useful math methods
###

goog.provide 'globeGeometry.math'

goog.require 'goog.math'

class globeGeometry.math

  ###*
    @param {number} num
    @param {number=} precision
    @return {number}
    @public
  ###
  @toFixed: (num, precision = 6) ->
    zeros = Math.pow(10, precision)
    big = Math.abs(num) * zeros
    return goog.math.sign(num) * goog.math.safeFloor(big) / zeros
