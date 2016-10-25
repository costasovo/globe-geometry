// Generated by github.com/steida/coffee2closure 0.1.12
goog.require('globeGeometry.Point');
suite('globeGeometry.Point', function() {
  var Point;
  Point = globeGeometry.Point;
  suite('constructor', function() {
    return test('should work', function() {
      var point;
      point = new Point(8, -2.5);
      assert.equal(point.getX(), 8);
      return assert.equal(point.getY(), -2.5);
    });
  });
  return suite('equals', function() {
    test('should work with same point', function() {
      var point;
      point = new Point(17, 22);
      return assert.isTrue(point.equals(point), "Point does equal itself");
    });
    return test('should not work with point in different zoom level', function() {
      var point, point2;
      point = new Point(17, 22);
      point2 = new Point(4, 3);
      assert.isFalse(point.equals(point2), "Point does not equal different point");
      return assert.isFalse(point2.equals(point), "Point does not equal different point");
    });
  });
});