'use strict';

var copy = require('..');

function App() {
  this.cache = {};
}

App.prototype.set = function(key, val) {
  this.cache[key] = val;
  return this;
};

Object.defineProperty(App.prototype, 'count', {
  get: function() {
    return Object.keys(this.cache).length;
  }
});

copy(App.prototype, 'count', 'len');

var app = new App();
app.set('a', true);
app.set('b', true);
app.set('c', true);

console.log(app.count);
//=> 3
console.log(app.len);
//=> 3
