// Generated by github.com/steida/coffee2closure 0.1.12
goog.require('globeGeometry.LatLng');
goog.require('globeGeometry.MercatorTile');
suite('globeGeometry.quadKey', function() {
  var LatLng, QuadKey;
  QuadKey = globeGeometry.quadKey;
  LatLng = globeGeometry.LatLng;
  suite('fromLatLngToQuadKey', function() {
    return test('should work for 0,0', function() {
      var latLng, quadKey;
      latLng = new LatLng(0, 0);
      quadKey = QuadKey.fromLatLngToQuadKey(latLng, 3);
      return assert.equal(quadKey, '300');
    });
  });
  suite('fromTileToQuadKey', function() {
    return test('should work for 3,5', function() {
      var quadKey, tile;
      tile = new globeGeometry.MercatorTile(3, 5, 3);
      quadKey = QuadKey.fromTileToQuadKey(tile);
      return assert.equal(quadKey, '213');
    });
  });
  return suite('fromQuadKeyToTile', function() {
    return test('should work for 213', function() {
      var tile;
      tile = QuadKey.fromQuadKeyToTile('213');
      assert.equal(tile.x, 3);
      return assert.equal(tile.y, 5);
    });
  });
});