###*
  @fileoverview Various input LatLng format parser
###

goog.provide 'globeGeometry.latLng.parser'

goog.require 'goog.array'
goog.require 'globeGeometry.math'

class globeGeometry.latLng.parser

  ###*
    @constructor
    @final
  ###
  constructor: () ->

  ###*
    @param {string} dmsPair
    @return {Array | null}
  ###
  parseDms: (dmsPair) ->
    parts = @getLatLngParts dmsPair
    return null if parts.length != 2
    lat = @parseDmsPart parts[0]
    lng = @parseDmsPart parts[1]
    return null if (!goog.isNumber(lat) || !goog.isNumber(lng))
    return [lat, lng]

  ###*
    @param {string} dmsPair
    @return {Array | null}
    @private
  ###
  getLatLngParts: (dmsPair) ->
    parts = dmsPair.split ' '
    return parts

  ###*
    @param {string} dms
    @return {number | null}
    @private
  ###
  parseDmsPart: (dms) ->
    nums = @getNumericParts dms, 3
    return null if !goog.isArray nums
    deg = nums[0] + nums[1]/60 + nums[2]/3600
    return globeGeometry.math.toFixed deg, 6

  ###*
    @param {string} str
    @param {number} count
    @return {Array | null}
    @private
  ###
  getNumericParts: (str, count) ->
    nums = str.split /[^0-9.,]+/
    nums.pop() if goog.array.peek(nums) == ''
    return null if nums.length != count
    return goog.array.map nums, (num) -> goog.string.toNumber num