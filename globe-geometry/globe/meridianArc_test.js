// Generated by github.com/steida/coffee2closure 0.1.12
goog.require('globeGeometry.LatLng');
suite('globeGeometry.globe.MeridianArc', function() {
  var LatLng, MeridianArc;
  MeridianArc = globeGeometry.globe.MeridianArc;
  LatLng = globeGeometry.LatLng;
  suite('getStart', function() {
    return test('should work', function() {
      var arc;
      arc = new MeridianArc(-10, 20);
      assert.equal(arc.getStart(), -10);
      arc = new MeridianArc(20, -10);
      return assert.equal(arc.getStart(), 20);
    });
  });
  suite('getEnd', function() {
    return test('should work', function() {
      var arc;
      arc = new MeridianArc(-10, 20);
      assert.equal(arc.getEnd(), 20);
      arc = new MeridianArc(20, -10);
      return assert.equal(arc.getEnd(), -10);
    });
  });
  suite('contains', function() {
    return test('should work', function() {
      var arc;
      arc = new MeridianArc(-10, 20);
      assert.isTrue(arc.contains(-10));
      assert.isTrue(arc.contains(-2));
      assert.isTrue(arc.contains(0));
      assert.isTrue(arc.contains(3.4));
      assert.isTrue(arc.contains(10));
      return assert.isTrue(arc.contains(20));
    });
  });
  suite('extend', function() {
    return test('should extend', function() {
      var arc, arc2;
      arc = new MeridianArc(0, 2);
      assert.isFalse(arc.contains(3));
      arc2 = arc.extend(3);
      assert.isTrue(arc2.contains(3));
      assert.equal(arc2.getStart(), 0);
      assert.equal(arc2.getEnd(), 3);
      assert.isFalse(arc.contains(-2));
      arc2 = arc.extend(-2);
      assert.isTrue(arc2.contains(-2));
      assert.equal(arc2.getStart(), -2);
      assert.equal(arc2.getEnd(), 2);
      assert.isTrue(arc.contains(1));
      arc2 = arc.extend(1);
      assert.isTrue(arc2.contains(1));
      assert.equal(arc2.getStart(), 0);
      return assert.equal(arc2.getEnd(), 2);
    });
  });
  suite('getCenter', function() {
    return test('should work', function() {
      var arc;
      arc = new MeridianArc(0, 2);
      assert.equal(arc.getCenter(), 1);
      arc = new MeridianArc(-30, -10);
      assert.equal(arc.getCenter(), -20);
      arc = new MeridianArc(-30, 20);
      return assert.equal(arc.getCenter(), -5);
    });
  });
  suite('intersects', function() {
    return test('should work', function() {
      var arc, arcHalfIn, arcHalfIn2, arcIn, arcOut;
      arc = new MeridianArc(0, 45);
      arcIn = new MeridianArc(10, 20);
      arcHalfIn = new MeridianArc(-10, 20);
      arcHalfIn2 = new MeridianArc(30, 50);
      arcOut = new MeridianArc(50, 60);
      assert.isFalse(arc.intersects(arcOut));
      assert.isTrue(arc.intersects(arcIn));
      assert.isTrue(arc.intersects(arcHalfIn));
      return assert.isTrue(arc.intersects(arcHalfIn2));
    });
  });
  return suite('isEmpty', function() {
    return test('should work', function() {
      var arc;
      arc = new MeridianArc(20, 10);
      assert.isTrue(arc.isEmpty());
      arc = new MeridianArc(10, 20);
      return assert.isFalse(arc.isEmpty());
    });
  });
});