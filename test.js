'use strict';

require('mocha');
var assert = require('assert');
var copy = require('./');
var a, b;

describe('copy', function() {
  beforeEach(function() {
    a = {qux: 'fez'};
    b = {};

    Object.defineProperty(a, 'foo', {
      enumerable: true,
      get: function() {
        return 'bar';
      }
    });
  });

  it('should copy a descriptor from one object to another', function() {
    copy(b, a, 'foo');
    assert('foo' in b);
    assert(b.foo === 'bar');
  });

  it('should copy a property from one object to another', function() {
    copy(b, a, 'qux');
    assert('qux' in b);
    assert(b.qux === 'fez');
  });

  it('should copy a descriptor and rename it', function() {
    copy(b, a, 'foo', 'baz');
    assert(!('foo' in b));
    assert('baz' in b);
    assert(b.baz === 'bar');
  });

  it('should copy a descriptor to the same object and rename it', function() {
    copy(a, 'foo', 'baz');
    assert('foo' in a);
    assert('baz' in a);
    assert(a.foo === 'bar');
    assert(a.baz === 'bar');
  });

  it('should throw an error when property does not exist', function(cb) {
    try {
      copy({}, {}, 'foo');
      cb(new Error('expected an error'));
    } catch (err) {
      assert.equal(err.message, 'property "foo" does not exist');
      cb();
    }
  });

  it('should throw an error when the first arg is not an object', function(cb) {
    try {
      copy();
      cb(new Error('expected an error'));
    } catch (err) {
      assert.equal(err.message, 'expected the first argument to be an object');
      cb();
    }
  });

  it('should throw an error when key is not a string', function(cb) {
    try {
      copy({});
      cb(new Error('expected an error'));
    } catch (err) {
      assert.equal(err.message, 'expected key to be a string');
      cb();
    }
  });
});
