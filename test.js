/*!
 * omit-empty <https://github.com/jonschlinkert/omit-empty>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('mocha');
var assert = require('assert');
var omitEmpty = require('./');

describe('.omitEmpty()', function() {
  it('should omit empty objects.', function() {
    assert.deepEqual(omitEmpty({a: {b: {c: 'foo'}, d: {}}}), {a: {b: {c: 'foo'}}});
  });

  it('should omit empty objects.', function() {
    assert.deepEqual(omitEmpty({a: undefined}), {});
    assert.deepEqual(omitEmpty({a: null}), {});
    assert.deepEqual(omitEmpty({a: ''}), {});
  });

  it('should omit nested empty objects.', function() {
    assert.deepEqual(omitEmpty({a: {b: undefined}}), {});
    assert.deepEqual(omitEmpty({a: {b: null}}), {});
    assert.deepEqual(omitEmpty({a: {b: ''}}), {});
  });

  it('should not omit functions', function() {
    var fn = function(a, b, c) {};
    assert.deepEqual(omitEmpty({a: fn}), {a: fn});
  });

  it('should not omit functions with no length', function() {
    var fn = function() {};
    assert.deepEqual(omitEmpty({a: fn}), {a: fn});
  });

  it('should omit empty primitives.', function() {
    assert.deepEqual(omitEmpty({a: {b: {c: 'foo'}, d: ''}}), {a: {b: {c: 'foo'}}});
  });

  it('should omit empty arrays.', function() {
    assert.deepEqual(omitEmpty({a: {b: {c: 'foo', d: []}, foo: []}}), {a: {b: {c: 'foo'}}});
    assert.deepEqual(omitEmpty({a: {b: {c: 'foo', d: [undefined]}, foo: [null]}}), {a: {b: {c: 'foo'}}});
    assert.deepEqual(omitEmpty({a: {b: {c: 'foo', d: ['']}, foo: [null]}}), {a: {b: {c: 'foo'}}});
    assert.deepEqual(omitEmpty({a: {z: [''], b: {c: 'foo', d: ['']}, foo: [null]}}), {a: {b: {c: 'foo'}}});
  });

  it('should not omit `0`.', function() {
    assert.deepEqual(omitEmpty({a: {b: {c: 'foo', d: 0}, foo: []}}), {a: {b: {c: 'foo', d: 0}}});
  });

  it('should omit `0` when `noZero` is defined.', function() {
    assert.deepEqual(omitEmpty({a: {b: {c: 'foo', d: 0}, foo: []}}, true), {a: {b: {c: 'foo'}}});
  });

  it('should not omit `false`.', function() {
    assert.deepEqual(omitEmpty({a: {b: {c: 'foo', d: 0}, foo: [], bar: false}}), {a: {b: {c: 'foo', d: 0}, bar: false}});
  });

  it('should not omit Dates.', function() {
    var today = new Date()
    assert.deepEqual(omitEmpty({a: {b: {c: 'foo', d: today}, foo: [], bar: false}}), {a: {b: {c: 'foo', d: today}, bar: false}});
  });

  it('should handle complex objects.', function() {
    var o = {a: {b: {c: 'foo', d: 0, e: {f: {g: {}, h: {i: 'i'}}}}, foo: [['bar', 'baz'], []], bar: [], one: 1, two: 2, three: 0 } };
    assert.deepEqual(omitEmpty(o), {a: {b: {c: 'foo', d: 0, e: {f: {h: {i: 'i'}}}}, foo: [['bar', 'baz']], one: 1, two: 2, three: 0}});
  });
});

