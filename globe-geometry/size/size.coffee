###*
  @fileoverview 2D size, where width is the distance on the x-axis, and height is the distance on the y-axis.
###

goog.provide 'globeGeometry.Size'

class globeGeometry.Size

  ###*
    @param {number} width
    @param {number} height
    @constructor
    @final
    @export
  ###
  constructor: (width, height) ->
    @width = Number width
    @height = Number height

  ###*
    @return {number}
    @export
  ###
  getWidth: () -> return @width

  ###*
    @return {number}
    @export
  ###
  getHeight: () -> return @height

  ###*
    @param {globeGeometry.Size} size
    @return {boolean}
    @export
  ###
  equals: (size) ->
    return @width == size.getWidth() && @height == size.getHeight()
