'use strict';

require('mocha');
var assert = require('assert');
var should = require('should');
var copyDescriptor = require('./');

describe('copyDescriptor', function () {
  it('should:', function () {
    copyDescriptor('a').should.eql({a: 'b'});
    copyDescriptor('a').should.equal('a');
  });

  it('should throw an error:', function () {
    (function () {
      copyDescriptor();
    }).should.throw('copyDescriptor expects valid arguments');
  });
});
