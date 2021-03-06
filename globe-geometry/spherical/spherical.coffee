###*
  @fileoverview Utility functions for computing geodesic angles, distances and areas.
###

goog.provide 'globeGeometry.spherical'

goog.require 'goog.math'

class globeGeometry.spherical

  ###*
    @type {number} Earth's radius in meters
    @public
  ###
  @RADIUS: 6378137

  ###*
    @param {globeGeometry.LatLng} from
    @param {globeGeometry.LatLng} to
    @param {number=} radius
    @return {number}
    @export
    @see http://www.movable-type.co.uk/scripts/latlong.html
  ###
  @computeDistanceBetween: (from, to, radius = globeGeometry.spherical.RADIUS) ->
    fromLat = goog.math.toRadians from.getLat()
    fromLng = goog.math.toRadians from.getLng()
    toLat = goog.math.toRadians to.getLat()
    toLng = goog.math.toRadians to.getLng()

    deltaLat = toLat - fromLat
    deltaLng = toLng - fromLng

    a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
            Math.cos(fromLat) * Math.cos(toLat) *
            Math.sin(deltaLng/2) * Math.sin(deltaLng/2)
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    d = c * radius
    return d

  ###*
    @param {globeGeometry.LatLng} from
    @param {globeGeometry.LatLng} to
    @return {number}
    @export
    @see http://www.movable-type.co.uk/scripts/latlong.html
  ###
  @computeHeading: (from, to) ->
    fromLat = goog.math.toRadians from.getLat()
    toLat = goog.math.toRadians to.getLat()
    deltaLng = goog.math.toRadians to.getLng() - from.getLng()

    y = Math.sin(deltaLng) * Math.cos(toLat)
    x = Math.cos(fromLat)*Math.sin(toLat) -
            Math.sin(fromLat)*Math.cos(toLat)*Math.cos(deltaLng)
    heading = Math.atan2 y, x
    return goog.math.toDegrees heading

  ###*
    @param {Array.<globeGeometry.LatLng>} path
    @param {number=} radius
    @return {number}
    @export
    @see http://www.movable-type.co.uk/scripts/latlong.html
  ###
  @computeLength: (path, radius = globeGeometry.spherical.RADIUS) ->
    length = 0
    for point, i in path
      from = path[i]
      to = path[i + 1]
      if to instanceof globeGeometry.LatLng
        length += globeGeometry.spherical.computeDistanceBetween from, to, radius
    return length

  ###*
    @param {globeGeometry.LatLng} from
    @param {number} distance
    @param {number} heading
    @param {number=} radius
    @return {globeGeometry.LatLng}
    @export
    @see http://www.movable-type.co.uk/scripts/latlong.html
  ###
  @computeOffset: (from, distance, heading, radius = globeGeometry.spherical.RADIUS) ->
    headingRad = goog.math.toRadians heading
    distanceRad = distance / radius

    latRad = goog.math.toRadians from.getLat()
    lngRad = goog.math.toRadians from.getLng()

    toLatRad = Math.asin( Math.sin(latRad)*Math.cos(distanceRad) +
                        Math.cos(latRad)*Math.sin(distanceRad)*Math.cos(headingRad) )
    toLngRad = lngRad + Math.atan2(Math.sin(headingRad)*Math.sin(distanceRad)*Math.cos(latRad),
                             Math.cos(distanceRad)-Math.sin(latRad)*Math.sin(toLatRad))
    toLngRad = (toLngRad+3*Math.PI) % (2*Math.PI) - Math.PI

    return new globeGeometry.LatLng(goog.math.toDegrees(toLatRad), goog.math.toDegrees(toLngRad))

  ###*
    @param {globeGeometry.LatLng} to
    @param {number} distance
    @param {number} heading
    @param {number=} radius
    @return {globeGeometry.LatLng}
    @export
    @see http://www.movable-type.co.uk/scripts/latlong.html
  ###
  @computeOffsetOrigin: (to, distance, heading, radius = globeGeometry.spherical.RADIUS) ->
    heading = (heading + 180) % 360
    return globeGeometry.spherical.computeOffset to, distance, heading


