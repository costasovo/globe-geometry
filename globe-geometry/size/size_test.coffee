goog.require 'globeGeometry.Size'

suite 'globeGeometry.Size', ->

  Size = globeGeometry.Size

  suite 'constructor', ->
    test 'should work', ->
      size = new Size 8, -2.5

      assert.equal size.getWidth(), 8
      assert.equal size.getHeight(), -2.5

  suite 'equals', ->
    test 'should work with same size', ->
      size = new Size 17, 22

      assert.isTrue size.equals(size), "Size does equal itself"

    test 'should not work with size in different zoom level', ->
      size = new Size 17, 22
      size2 = new Size 4, 3

      assert.isFalse size.equals(size2), "Size does not equal different size"
      assert.isFalse size2.equals(size), "Size does not equal different size"
