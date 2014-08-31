###*
  @fileoverview Factory for creating LatLng instances from various input data formats
###

goog.provide 'globeGeometry.latLng.factory'

goog.require 'globeGeometry.latLng.parser'
goog.require 'globeGeometry.LatLng'

class globeGeometry.latLng.factory

  ###*
    @param {string} input
    @return {globeGeometry.LatLng}
    @export
  ###
  @createInstance: (input) ->
    parser = new globeGeometry.latLng.parser()
    latLng = parser.parseDms input
    latLng = parser.parseDdm input if !goog.isArray latLng

    throw Error 'Invalid input' if !goog.isArray latLng

    return new globeGeometry.LatLng latLng[0], latLng[1]
