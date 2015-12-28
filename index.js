/*!
 * copy-descriptor <https://github.com/jonschlinkert/copy-descriptor>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/**
 * Copy a descriptor from one object to another.
 *
 * ```js
 * function App() {
 *   this.cache = {};
 * }
 * App.prototype.set = function(key, val) {
 *   this.cache[key] = val;
 *   return this;
 * };
 * Object.defineProperty(App.prototype, 'count', {
 *   get: function() {
 *     return Object.keys(this.cache).length;
 *   }
 * });
 * copy(App.prototype, 'count', 'len');
 * var app = new App();
 * app.set('a', true);
 * app.set('b', true);
 * app.set('c', true);
 * console.log(app.count);
 * //=> 3
 * console.log(app.len);
 * //=> 3
 * ```
 * @param {Object} `receiver`
 * @param {Object} `provider`
 * @param {String} `name`
 * @return {Object}
 * @api public
 */

module.exports = function copyDescriptor(receiver, provider, from, to) {
  if (typeof provider === 'string') {
    to = from;
    from = provider;
    provider = receiver;
  }

  if (typeof from !== 'string') {
    throw new TypeError('expected key to be a string.');
  }
  if (typeof to !== 'string') {
    to = from;
  }

  if (!isObject(receiver)) {
    throw new TypeError('expected receiver to be an object.');
  }
  if (!isObject(provider)) {
    throw new TypeError('expected provider to be an object.');
  }

  var val = Object.getOwnPropertyDescriptor(provider, from);
  if (val) Object.defineProperty(receiver, to, val);
};

function isObject(val) {
  return {}.toString.call(val) === '[object Object]';
}
