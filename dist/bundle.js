(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.h = undefined;

exports.default = function (opts) {
    var config = Object.assign({}, opts, {
        render: renderer(opts.mount)
    });
    return (0, _helixJs2.default)(config);
};

var _helixJs = require('helix-js');

var _helixJs2 = _interopRequireDefault(_helixJs);

var _inferno = require('inferno');

var _inferno2 = _interopRequireDefault(_inferno);

var _infernoCreateElement = require('inferno-create-element');

var createElement = _interopRequireWildcard(_infernoCreateElement);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var h = exports.h = createElement;
function renderer(dom) {
    var _dom = dom;
    return function (node, state, prev, actions) {
        if (node) {
            _inferno2.default.render(node(state, prev, actions), _dom);
        }
    };
}

},{"helix-js":6,"inferno":8,"inferno-create-element":7}],2:[function(require,module,exports){
(function (global){
'use strict';

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
    return global.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = require('util/');
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = function () {
  return function foo() {}.name === 'foo';
}();
function pToString(obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof global.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' + name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' + self.operator + ' ' + truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

    // 7.2. If the expected value is a Date object, the actual value is
    // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

    // 7.3 If the expected value is a RegExp object, the actual value is
    // equivalent if it is also a RegExp object with the same source and
    // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source && actual.global === expected.global && actual.multiline === expected.multiline && actual.lastIndex === expected.lastIndex && actual.ignoreCase === expected.ignoreCase;

    // 7.4. Other pairs that do not both pass typeof value == 'object',
    // equivalence is determined by ==.
  } else if ((actual === null || (typeof actual === 'undefined' ? 'undefined' : _typeof(actual)) !== 'object') && (expected === null || (typeof expected === 'undefined' ? 'undefined' : _typeof(expected)) !== 'object')) {
    return strict ? actual === expected : actual == expected;

    // If both values are instances of typed arrays, wrap their underlying
    // ArrayBuffers in a Buffer each to increase performance
    // This optimization requires the arrays to have the same type as checked by
    // Object.prototype.toString (aka pToString). Never perform binary
    // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
    // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) && pToString(actual) === pToString(expected) && !(actual instanceof Float32Array || actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer), new Uint8Array(expected.buffer)) === 0;

    // 7.5 For all other Object pairs, including Array objects, equivalence is
    // determined by having the same number of owned properties (as verified
    // with Object.prototype.hasOwnProperty.call), the same set of keys
    // (although not necessarily the same order), equivalent values for every
    // corresponding key, and an identical 'prototype' property. Note: this
    // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || { actual: [], expected: [] };

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined) return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b)) return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if (aIsArgs && !bIsArgs || !aIsArgs && bIsArgs) return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length) return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i]) return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects)) return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}

// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') + (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if (isUnwantedException && userProvidedMessage && expectedException(actual, expected) || isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if (shouldThrow && actual && expected && !expectedException(actual, expected) || !shouldThrow && actual) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function (block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function (block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function (err) {
  if (err) throw err;
};

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"util/":16}],3:[function(require,module,exports){
"use strict";

},{}],4:[function(require,module,exports){
'use strict';

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

},{}],5:[function(require,module,exports){
(function (global){
"use strict";

if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined") {
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Object.defineProperty(exports, "__esModule", { value: true });
var rlite = require("rlite-router");
var href = require("sheet-router/href");
var qs = require("query-string-json");
var twine_js_1 = require("twine-js");
function combineObjects(a, b) {
    return Object.assign({}, a, b);
}
function wrap(routes, fn) {
    return Object.keys(routes).map(function (key) {
        var route = routes[key];
        return _defineProperty({}, key, fn(key, route));
    }).reduce(combineObjects, {});
}
function createModel(model, routes, render) {
    if (routes) {
        if (model.models) {
            model.models.location = location(render);
        } else {
            model.models = {
                location: location(render)
            };
        }
    }
    return model;
}
function getQueryFromLocation(location) {
    var query = qs.parse(location);
    if (query) {
        return Object.keys(query).map(function (key) {
            return _defineProperty({}, key, query[key][0]);
        }).reduce(function (curr, prev) {
            return Object.assign({}, prev, curr);
        });
    }
    return {};
}
function location(rerender) {
    return {
        state: {
            pathname: '',
            params: {}
        },
        reducers: {
            receiveRoute: function receiveRoute(_state, _ref3) {
                var pathname = _ref3.pathname,
                    params = _ref3.params;

                return { pathname: pathname, params: params };
            }
        },
        effects: {
            set: function set(_state, _actions, pathname) {
                window.history.pushState('', '', pathname);
                rerender(pathname);
            }
        }
    };
}
function default_1(configuration) {
    var routes = configuration.routes ? wrap(configuration.routes, wrapRoutes) : null;
    var router = rlite(function () {
        return null;
    }, routes);
    var model = createModel(configuration.model, configuration.routes, renderCurrentLocation);
    var store = twine_js_1.default(onStateChange)(model);
    var render = configuration.render;
    var _state = store.state;
    var _prev = store.state;
    var _actions = store.actions;
    var _onLeave = void 0;
    var _handler = void 0;
    function rerender(node) {
        render(node, _state, _prev, _actions);
    }
    function onStateChange(state, prev, actions) {
        _state = state;
        _prev = prev;
        _actions = actions;
        rerender(getComponent(window.location.pathname));
    }
    function getComponent(path) {
        if (configuration.routes) {
            return router(path);
        } else {
            return configuration.component ? configuration.component : null;
        }
    }
    function lifecycle(handler) {
        if (_handler === handler) {
            if (handler.onUpdate) {
                handler.onUpdate(_state, _prev, _actions);
            }
        } else {
            _handler = handler;
            if (_onLeave) {
                _onLeave(_state, _prev, _actions);
                _onLeave = handler.onLeave;
            }
            if (handler.onEnter) {
                handler.onEnter(_state, _prev, _actions);
            }
        }
    }
    function wrapRoutes(route, handler) {
        var view = (typeof handler === "undefined" ? "undefined" : _typeof(handler)) === 'object' ? handler.view : handler;
        return function (params, _, pathname) {
            if (_state.location.pathname !== pathname) {
                var query = getQueryFromLocation(window.location.href);
                _actions.location.receiveRoute({ pathname: pathname, params: Object.assign({}, params, query) });
                lifecycle(handler);
                _onLeave = handler.onLeave;
                return false;
            }
            return view;
        };
    }
    function renderCurrentLocation() {
        rerender(getComponent(window.location.pathname));
    }
    function setLocationAndRender(path) {
        window.history.pushState('', '', path.pathname);
        rerender(getComponent(path.pathname));
    }
    href(setLocationAndRender);
    window.onpopstate = renderCurrentLocation;
    renderCurrentLocation();
}
exports.default = default_1;

},{"query-string-json":9,"rlite-router":10,"sheet-router/href":11,"twine-js":13}],7:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * inferno-create-element v1.4.0
 * (c) 2017 Dominic Gannaway'
 * Released under the MIT License.
 */

(function (global, factory) {
    (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('inferno')) : typeof define === 'function' && define.amd ? define(['inferno'], factory) : global['inferno-create-element'] = factory(global.Inferno);
})(undefined, function (inferno) {
    'use strict';

    // this is MUCH faster than .constructor === Array and instanceof Array
    // in Node 7 and the later versions of V8, slower in older versions though

    function isStatefulComponent(o) {
        return !isUndefined(o.prototype) && !isUndefined(o.prototype.render);
    }

    function isNullOrUndef(obj) {
        return isUndefined(obj) || isNull(obj);
    }
    function isInvalid(obj) {
        return isNull(obj) || obj === false || isTrue(obj) || isUndefined(obj);
    }

    function isAttrAnEvent(attr) {
        return attr[0] === 'o' && attr[1] === 'n';
    }
    function isString(obj) {
        return typeof obj === 'string';
    }

    function isNull(obj) {
        return obj === null;
    }
    function isTrue(obj) {
        return obj === true;
    }
    function isUndefined(obj) {
        return obj === undefined;
    }
    function isObject(o) {
        return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object';
    }

    var componentHooks = {
        onComponentWillMount: true,
        onComponentDidMount: true,
        onComponentWillUnmount: true,
        onComponentShouldUpdate: true,
        onComponentWillUpdate: true,
        onComponentDidUpdate: true
    };
    function createElement(name, props) {
        var _children = [],
            len$2 = arguments.length - 2;
        while (len$2-- > 0) {
            _children[len$2] = arguments[len$2 + 2];
        }if (isInvalid(name) || isObject(name)) {
            throw new Error('Inferno Error: createElement() name parameter cannot be undefined, null, false or true, It must be a string, class or function.');
        }
        var children = _children;
        var ref = null;
        var key = null;
        var events = null;
        var flags = 0;
        if (_children) {
            if (_children.length === 1) {
                children = _children[0];
            } else if (_children.length === 0) {
                children = undefined;
            }
        }
        if (isString(name)) {
            switch (name) {
                case 'svg':
                    flags = 128 /* SvgElement */;
                    break;
                case 'input':
                    flags = 512 /* InputElement */;
                    break;
                case 'textarea':
                    flags = 1024 /* TextareaElement */;
                    break;
                case 'select':
                    flags = 2048 /* SelectElement */;
                    break;
                default:
                    flags = 2 /* HtmlElement */;
                    break;
            }
            /*
             This fixes de-optimisation:
             uses object Keys for looping props to avoid deleting props of looped object
             */
            if (!isNullOrUndef(props)) {
                var propKeys = Object.keys(props);
                for (var i = 0, len = propKeys.length; i < len; i++) {
                    var propKey = propKeys[i];
                    if (propKey === 'key') {
                        key = props.key;
                        delete props.key;
                    } else if (propKey === 'children' && isUndefined(children)) {
                        children = props.children; // always favour children args, default to props
                    } else if (propKey === 'ref') {
                        ref = props.ref;
                    } else if (isAttrAnEvent(propKey)) {
                        if (!events) {
                            events = {};
                        }
                        events[propKey] = props[propKey];
                        delete props[propKey];
                    }
                }
            }
        } else {
            flags = isStatefulComponent(name) ? 4 /* ComponentClass */ : 8 /* ComponentFunction */;
            if (!isUndefined(children)) {
                if (!props) {
                    props = {};
                }
                props.children = children;
                children = null;
            }
            if (!isNullOrUndef(props)) {
                /*
                 This fixes de-optimisation:
                 uses object Keys for looping props to avoid deleting props of looped object
                 */
                var propKeys$1 = Object.keys(props);
                for (var i$1 = 0, len$1 = propKeys$1.length; i$1 < len$1; i$1++) {
                    var propKey$1 = propKeys$1[i$1];
                    if (componentHooks[propKey$1]) {
                        if (!ref) {
                            ref = {};
                        }
                        ref[propKey$1] = props[propKey$1];
                    } else if (propKey$1 === 'key') {
                        key = props.key;
                        delete props.key;
                    }
                }
            }
        }
        return inferno.createVNode(flags, name, props, children, events, key, ref);
    }

    return createElement;
});

},{"inferno":8}],8:[function(require,module,exports){
(function (process){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Inferno v1.4.0
 * (c) 2017 Dominic Gannaway'
 * Released under the MIT License.
 */

(function (global, factory) {
    (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : factory(global.Inferno = global.Inferno || {});
})(undefined, function (exports) {
    'use strict';

    var NO_OP = '$NO_OP';
    var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
    var isBrowser = typeof window !== 'undefined' && window.document;

    // this is MUCH faster than .constructor === Array and instanceof Array
    // in Node 7 and the later versions of V8, slower in older versions though
    var isArray = Array.isArray;
    function isStatefulComponent(o) {
        return !isUndefined(o.prototype) && !isUndefined(o.prototype.render);
    }
    function isStringOrNumber(obj) {
        var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
        return type === 'string' || type === 'number';
    }
    function isNullOrUndef(obj) {
        return isUndefined(obj) || isNull(obj);
    }
    function isInvalid(obj) {
        return isNull(obj) || obj === false || isTrue(obj) || isUndefined(obj);
    }
    function isFunction(obj) {
        return typeof obj === 'function';
    }
    function isAttrAnEvent(attr) {
        return attr[0] === 'o' && attr[1] === 'n';
    }
    function isString(obj) {
        return typeof obj === 'string';
    }
    function isNumber(obj) {
        return typeof obj === 'number';
    }
    function isNull(obj) {
        return obj === null;
    }
    function isTrue(obj) {
        return obj === true;
    }
    function isUndefined(obj) {
        return obj === undefined;
    }
    function isObject(o) {
        return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object';
    }
    function throwError(message) {
        if (!message) {
            message = ERROR_MSG;
        }
        throw new Error("Inferno Error: " + message);
    }
    function warning(message) {
        console.warn(message);
    }
    function combineFrom(first, second) {
        var obj = {};
        var key;
        if (first) {
            for (key in first) {
                obj[key] = first[key];
            }
        }
        if (second) {
            for (key in second) {
                obj[key] = second[key];
            }
        }
        return obj;
    }
    function Lifecycle() {
        this.listeners = [];
    }
    Lifecycle.prototype.addListener = function addListener(callback) {
        this.listeners.push(callback);
    };
    Lifecycle.prototype.trigger = function trigger() {
        var listeners = this.listeners;
        for (var i = 0, len = listeners.length; i < len; i++) {
            listeners[i]();
        }
    };

    function applyKey(key, vNode) {
        vNode.key = key;
        return vNode;
    }
    function applyKeyIfMissing(key, vNode) {
        if (isNumber(key)) {
            key = "." + key;
        }
        if (isNull(vNode.key) || vNode.key[0] === '.') {
            return applyKey(key, vNode);
        }
        return vNode;
    }
    function applyKeyPrefix(key, vNode) {
        vNode.key = key + vNode.key;
        return vNode;
    }
    function _normalizeVNodes(nodes, result, index, currentKey) {
        for (var len = nodes.length; index < len; index++) {
            var n = nodes[index];
            var key = currentKey + "." + index;
            if (!isInvalid(n)) {
                if (isArray(n)) {
                    _normalizeVNodes(n, result, 0, key);
                } else {
                    if (isStringOrNumber(n)) {
                        n = createTextVNode(n, null);
                    } else if (isVNode(n) && n.dom || n.key && n.key[0] === '.') {
                        n = directClone(n);
                    }
                    if (isNull(n.key) || n.key[0] === '.') {
                        n = applyKey(key, n);
                    } else {
                        n = applyKeyPrefix(currentKey, n);
                    }
                    result.push(n);
                }
            }
        }
    }
    function normalizeVNodes(nodes) {
        var newNodes;
        // we assign $ which basically means we've flagged this array for future note
        // if it comes back again, we need to clone it, as people are using it
        // in an immutable way
        // tslint:disable
        if (nodes['$']) {
            nodes = nodes.slice();
        } else {
            nodes['$'] = true;
        }
        // tslint:enable
        for (var i = 0, len = nodes.length; i < len; i++) {
            var n = nodes[i];
            if (isInvalid(n) || isArray(n)) {
                var result = (newNodes || nodes).slice(0, i);
                _normalizeVNodes(nodes, result, i, "");
                return result;
            } else if (isStringOrNumber(n)) {
                if (!newNodes) {
                    newNodes = nodes.slice(0, i);
                }
                newNodes.push(applyKeyIfMissing(i, createTextVNode(n, null)));
            } else if (isVNode(n) && n.dom || isNull(n.key) && !(n.flags & 64 /* HasNonKeyedChildren */)) {
                if (!newNodes) {
                    newNodes = nodes.slice(0, i);
                }
                newNodes.push(applyKeyIfMissing(i, directClone(n)));
            } else if (newNodes) {
                newNodes.push(applyKeyIfMissing(i, directClone(n)));
            }
        }
        return newNodes || nodes;
    }
    function normalizeChildren(children) {
        if (isArray(children)) {
            return normalizeVNodes(children);
        } else if (isVNode(children) && children.dom) {
            return directClone(children);
        }
        return children;
    }
    function normalizeProps(vNode, props, children) {
        if (!(vNode.flags & 28 /* Component */) && isNullOrUndef(children) && !isNullOrUndef(props.children)) {
            vNode.children = props.children;
        }
        if (props.ref) {
            vNode.ref = props.ref;
            delete props.ref;
        }
        if (props.events) {
            vNode.events = props.events;
        }
        if (!isNullOrUndef(props.key)) {
            vNode.key = props.key;
            delete props.key;
        }
    }
    function normalizeElement(type, vNode) {
        if (type === 'svg') {
            vNode.flags = 128 /* SvgElement */;
        } else if (type === 'input') {
            vNode.flags = 512 /* InputElement */;
        } else if (type === 'select') {
            vNode.flags = 2048 /* SelectElement */;
        } else if (type === 'textarea') {
            vNode.flags = 1024 /* TextareaElement */;
        } else if (type === 'media') {
            vNode.flags = 256 /* MediaElement */;
        } else {
            vNode.flags = 2 /* HtmlElement */;
        }
    }
    function normalize(vNode) {
        var props = vNode.props;
        var children = vNode.children;
        // convert a wrongly created type back to element
        // Primitive node doesn't have defaultProps, only Component
        if (vNode.flags & 28 /* Component */) {
                // set default props
                var type = vNode.type;
                var defaultProps = type.defaultProps;
                if (!isNullOrUndef(defaultProps)) {
                    if (!props) {
                        props = vNode.props = defaultProps; // Create new object if only defaultProps given
                    } else {
                        for (var prop in defaultProps) {
                            if (isUndefined(props[prop])) {
                                props[prop] = defaultProps[prop];
                            }
                        }
                    }
                }
                if (isString(type)) {
                    normalizeElement(type, vNode);
                    if (props && props.children) {
                        vNode.children = props.children;
                        children = props.children;
                    }
                }
            }
        if (props) {
            normalizeProps(vNode, props, children);
        }
        if (!isInvalid(children)) {
            vNode.children = normalizeChildren(children);
        }
        if (props && !isInvalid(props.children)) {
            props.children = normalizeChildren(props.children);
        }
        if (process.env.NODE_ENV !== 'production') {
            // This code will be stripped out from production CODE
            // It will help users to track errors in their applications.
            var verifyKeys = function verifyKeys(vNodes) {
                var keyValues = vNodes.map(function (vnode) {
                    return vnode.key;
                });
                keyValues.some(function (item, idx) {
                    var hasDuplicate = keyValues.indexOf(item) !== idx;
                    if (hasDuplicate) {
                        warning('Inferno normalisation(...): Encountered two children with same key, all keys must be unique within its siblings. Duplicated key is:' + item);
                    }
                    return hasDuplicate;
                });
            };
            if (vNode.children && Array.isArray(vNode.children)) {
                verifyKeys(vNode.children);
            }
        }
    }

    var options = {
        recyclingEnabled: false,
        findDOMNodeEnabled: false,
        roots: null,
        createVNode: null,
        beforeRender: null,
        afterRender: null,
        afterMount: null,
        afterUpdate: null,
        beforeUnmount: null
    };

    var xlinkNS = 'http://www.w3.org/1999/xlink';
    var xmlNS = 'http://www.w3.org/XML/1998/namespace';
    var svgNS = 'http://www.w3.org/2000/svg';
    var TRUE = true;
    var strictProps = Object.create(null);
    strictProps.volume = TRUE;
    strictProps.defaultChecked = TRUE;
    Object.freeze(strictProps);
    var booleanProps = Object.create(null);
    booleanProps.muted = TRUE;
    booleanProps.scoped = TRUE;
    booleanProps.loop = TRUE;
    booleanProps.open = TRUE;
    booleanProps.checked = TRUE;
    booleanProps.default = TRUE;
    booleanProps.capture = TRUE;
    booleanProps.disabled = TRUE;
    booleanProps.readOnly = TRUE;
    booleanProps.required = TRUE;
    booleanProps.autoplay = TRUE;
    booleanProps.controls = TRUE;
    booleanProps.seamless = TRUE;
    booleanProps.reversed = TRUE;
    booleanProps.allowfullscreen = TRUE;
    booleanProps.novalidate = TRUE;
    booleanProps.hidden = TRUE;
    Object.freeze(booleanProps);
    var namespaces = Object.create(null);
    namespaces['xlink:href'] = xlinkNS;
    namespaces['xlink:arcrole'] = xlinkNS;
    namespaces['xlink:actuate'] = xlinkNS;
    namespaces['xlink:show'] = xlinkNS;
    namespaces['xlink:role'] = xlinkNS;
    namespaces['xlink:title'] = xlinkNS;
    namespaces['xlink:type'] = xlinkNS;
    namespaces['xml:base'] = xmlNS;
    namespaces['xml:lang'] = xmlNS;
    namespaces['xml:space'] = xmlNS;
    Object.freeze(namespaces);
    var isUnitlessNumber = Object.create(null);
    isUnitlessNumber.animationIterationCount = TRUE;
    isUnitlessNumber.borderImageOutset = TRUE;
    isUnitlessNumber.borderImageSlice = TRUE;
    isUnitlessNumber.borderImageWidth = TRUE;
    isUnitlessNumber.boxFlex = TRUE;
    isUnitlessNumber.boxFlexGroup = TRUE;
    isUnitlessNumber.boxOrdinalGroup = TRUE;
    isUnitlessNumber.columnCount = TRUE;
    isUnitlessNumber.flex = TRUE;
    isUnitlessNumber.flexGrow = TRUE;
    isUnitlessNumber.flexPositive = TRUE;
    isUnitlessNumber.flexShrink = TRUE;
    isUnitlessNumber.flexNegative = TRUE;
    isUnitlessNumber.flexOrder = TRUE;
    isUnitlessNumber.gridRow = TRUE;
    isUnitlessNumber.gridColumn = TRUE;
    isUnitlessNumber.fontWeight = TRUE;
    isUnitlessNumber.lineClamp = TRUE;
    isUnitlessNumber.lineHeight = TRUE;
    isUnitlessNumber.opacity = TRUE;
    isUnitlessNumber.order = TRUE;
    isUnitlessNumber.orphans = TRUE;
    isUnitlessNumber.tabSize = TRUE;
    isUnitlessNumber.widows = TRUE;
    isUnitlessNumber.zIndex = TRUE;
    isUnitlessNumber.zoom = TRUE;
    isUnitlessNumber.fillOpacity = TRUE;
    isUnitlessNumber.floodOpacity = TRUE;
    isUnitlessNumber.stopOpacity = TRUE;
    isUnitlessNumber.strokeDasharray = TRUE;
    isUnitlessNumber.strokeDashoffset = TRUE;
    isUnitlessNumber.strokeMiterlimit = TRUE;
    isUnitlessNumber.strokeOpacity = TRUE;
    isUnitlessNumber.strokeWidth = TRUE;
    Object.freeze(isUnitlessNumber);
    var skipProps = Object.create(null);
    skipProps.children = TRUE;
    skipProps.childrenType = TRUE;
    skipProps.defaultValue = TRUE;
    skipProps.ref = TRUE;
    skipProps.key = TRUE;
    skipProps.selected = TRUE;
    skipProps.checked = TRUE;
    skipProps.multiple = TRUE;
    Object.freeze(skipProps);
    var delegatedProps = Object.create(null);
    delegatedProps.onClick = TRUE;
    delegatedProps.onMouseDown = TRUE;
    delegatedProps.onMouseUp = TRUE;
    delegatedProps.onMouseMove = TRUE;
    delegatedProps.onSubmit = TRUE;
    delegatedProps.onDblClick = TRUE;
    delegatedProps.onKeyDown = TRUE;
    delegatedProps.onKeyUp = TRUE;
    delegatedProps.onKeyPress = TRUE;
    Object.freeze(delegatedProps);

    var isiOS = isBrowser && !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    var delegatedEvents = new Map();
    function handleEvent(name, lastEvent, nextEvent, dom) {
        var delegatedRoots = delegatedEvents.get(name);
        if (nextEvent) {
            if (!delegatedRoots) {
                delegatedRoots = { items: new Map(), count: 0, docEvent: null };
                delegatedRoots.docEvent = attachEventToDocument(name, delegatedRoots);
                delegatedEvents.set(name, delegatedRoots);
            }
            if (!lastEvent) {
                delegatedRoots.count++;
                if (isiOS && name === 'onClick') {
                    trapClickOnNonInteractiveElement(dom);
                }
            }
            delegatedRoots.items.set(dom, nextEvent);
        } else if (delegatedRoots) {
            if (delegatedRoots.items.has(dom)) {
                delegatedRoots.count--;
                delegatedRoots.items.delete(dom);
                if (delegatedRoots.count === 0) {
                    document.removeEventListener(normalizeEventName(name), delegatedRoots.docEvent);
                    delegatedEvents.delete(name);
                }
            }
        }
    }
    function dispatchEvent(event, dom, items, count, eventData) {
        var eventsToTrigger = items.get(dom);
        if (eventsToTrigger) {
            count--;
            // linkEvent object
            eventData.dom = dom;
            if (eventsToTrigger.event) {
                eventsToTrigger.event(eventsToTrigger.data, event);
            } else {
                eventsToTrigger(event);
            }
            if (eventData.stopPropagation) {
                return;
            }
        }
        if (count > 0) {
            var parentDom = dom.parentNode;
            // Html Nodes can be nested fe: span inside button in that scenario browser does not handle disabled attribute on parent,
            // because the event listener is on document.body
            if (parentDom && parentDom.disabled !== true || parentDom === document.body) {
                dispatchEvent(event, parentDom, items, count, eventData);
            }
        }
    }
    function normalizeEventName(name) {
        return name.substr(2).toLowerCase();
    }
    function attachEventToDocument(name, delegatedRoots) {
        var docEvent = function docEvent(event) {
            var eventData = {
                stopPropagation: false,
                dom: document
            };
            // we have to do this as some browsers recycle the same Event between calls
            // so we need to make the property configurable
            Object.defineProperty(event, 'currentTarget', {
                configurable: true,
                get: function get() {
                    return eventData.dom;
                }
            });
            event.stopPropagation = function () {
                eventData.stopPropagation = true;
            };
            var count = delegatedRoots.count;
            if (count > 0) {
                dispatchEvent(event, event.target, delegatedRoots.items, count, eventData);
            }
        };
        document.addEventListener(normalizeEventName(name), docEvent);
        return docEvent;
    }
    function emptyFn() {}
    function trapClickOnNonInteractiveElement(dom) {
        // Mobile Safari does not fire properly bubble click events on
        // non-interactive elements, which means delegated click listeners do not
        // fire. The workaround for this bug involves attaching an empty click
        // listener on the target node.
        // http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
        // Just set it using the onclick property so that we don't have to manage any
        // bookkeeping for it. Not sure if we need to clear it when the listener is
        // removed.
        // TODO: Only do this for the relevant Safaris maybe?
        dom.onclick = emptyFn;
    }

    function isCheckedType(type) {
        return type === 'checkbox' || type === 'radio';
    }
    function isControlled(props) {
        var usesChecked = isCheckedType(props.type);
        return usesChecked ? !isNullOrUndef(props.checked) : !isNullOrUndef(props.value);
    }
    function onTextInputChange(e) {
        var vNode = this.vNode;
        var events = vNode.events || EMPTY_OBJ;
        var dom = vNode.dom;
        if (events.onInput) {
            var event = events.onInput;
            if (event.event) {
                event.event(event.data, e);
            } else {
                event(e);
            }
        } else if (events.oninput) {
            events.oninput(e);
        }
        // the user may have updated the vNode from the above onInput events
        // so we need to get it from the context of `this` again
        applyValue(this.vNode, dom);
    }
    function wrappedOnChange(e) {
        var vNode = this.vNode;
        var events = vNode.events || EMPTY_OBJ;
        var event = events.onChange;
        if (event.event) {
            event.event(event.data, e);
        } else {
            event(e);
        }
    }
    function onCheckboxChange(e) {
        var vNode = this.vNode;
        var events = vNode.events || EMPTY_OBJ;
        var dom = vNode.dom;
        if (events.onClick) {
            var event = events.onClick;
            if (event.event) {
                event.event(event.data, e);
            } else {
                event(e);
            }
        } else if (events.onclick) {
            events.onclick(e);
        }
        // the user may have updated the vNode from the above onClick events
        // so we need to get it from the context of `this` again
        applyValue(this.vNode, dom);
    }
    function handleAssociatedRadioInputs(name) {
        var inputs = document.querySelectorAll("input[type=\"radio\"][name=\"" + name + "\"]");
        [].forEach.call(inputs, function (dom) {
            var inputWrapper = wrappers.get(dom);
            if (inputWrapper) {
                var props = inputWrapper.vNode.props;
                if (props) {
                    dom.checked = inputWrapper.vNode.props.checked;
                }
            }
        });
    }
    function processInput(vNode, dom) {
        var props = vNode.props || EMPTY_OBJ;
        applyValue(vNode, dom);
        if (isControlled(props)) {
            var inputWrapper = wrappers.get(dom);
            if (!inputWrapper) {
                inputWrapper = {
                    vNode: vNode
                };
                if (isCheckedType(props.type)) {
                    dom.onclick = onCheckboxChange.bind(inputWrapper);
                    dom.onclick.wrapped = true;
                } else {
                    dom.oninput = onTextInputChange.bind(inputWrapper);
                    dom.oninput.wrapped = true;
                }
                if (props.onChange) {
                    dom.onchange = wrappedOnChange.bind(inputWrapper);
                    dom.onchange.wrapped = true;
                }
                wrappers.set(dom, inputWrapper);
            }
            inputWrapper.vNode = vNode;
            return true;
        }
        return false;
    }
    function applyValue(vNode, dom) {
        var props = vNode.props || EMPTY_OBJ;
        var type = props.type;
        var value = props.value;
        var checked = props.checked;
        var multiple = props.multiple;
        var defaultValue = props.defaultValue;
        var hasValue = !isNullOrUndef(value);
        if (type && type !== dom.type) {
            dom.type = type;
        }
        if (multiple && multiple !== dom.multiple) {
            dom.multiple = multiple;
        }
        if (!isNullOrUndef(defaultValue) && !hasValue) {
            dom.defaultValue = defaultValue + '';
        }
        if (isCheckedType(type)) {
            if (hasValue) {
                dom.value = value;
            }
            if (!isNullOrUndef(checked)) {
                dom.checked = checked;
            }
            if (type === 'radio' && props.name) {
                handleAssociatedRadioInputs(props.name);
            }
        } else {
            if (hasValue && dom.value !== value) {
                dom.value = value;
            } else if (!isNullOrUndef(checked)) {
                dom.checked = checked;
            }
        }
    }

    function isControlled$1(props) {
        return !isNullOrUndef(props.value);
    }
    function updateChildOptionGroup(vNode, value) {
        var type = vNode.type;
        if (type === 'optgroup') {
            var children = vNode.children;
            if (isArray(children)) {
                for (var i = 0, len = children.length; i < len; i++) {
                    updateChildOption(children[i], value);
                }
            } else if (isVNode(children)) {
                updateChildOption(children, value);
            }
        } else {
            updateChildOption(vNode, value);
        }
    }
    function updateChildOption(vNode, value) {
        var props = vNode.props || EMPTY_OBJ;
        var dom = vNode.dom;
        // we do this as multiple may have changed
        dom.value = props.value;
        if (isArray(value) && value.indexOf(props.value) !== -1 || props.value === value) {
            dom.selected = true;
        } else if (!isNullOrUndef(value) || !isNullOrUndef(props.selected)) {
            dom.selected = props.selected || false;
        }
    }
    function onSelectChange(e) {
        var vNode = this.vNode;
        var events = vNode.events || EMPTY_OBJ;
        var dom = vNode.dom;
        if (events.onChange) {
            var event = events.onChange;
            if (event.event) {
                event.event(event.data, e);
            } else {
                event(e);
            }
        } else if (events.onchange) {
            events.onchange(e);
        }
        // the user may have updated the vNode from the above onChange events
        // so we need to get it from the context of `this` again
        applyValue$1(this.vNode, dom, false);
    }
    function processSelect(vNode, dom, mounting) {
        var props = vNode.props || EMPTY_OBJ;
        applyValue$1(vNode, dom, mounting);
        if (isControlled$1(props)) {
            var selectWrapper = wrappers.get(dom);
            if (!selectWrapper) {
                selectWrapper = {
                    vNode: vNode
                };
                dom.onchange = onSelectChange.bind(selectWrapper);
                dom.onchange.wrapped = true;
                wrappers.set(dom, selectWrapper);
            }
            selectWrapper.vNode = vNode;
            return true;
        }
        return false;
    }
    function applyValue$1(vNode, dom, mounting) {
        var props = vNode.props || EMPTY_OBJ;
        if (props.multiple !== dom.multiple) {
            dom.multiple = props.multiple;
        }
        var children = vNode.children;
        if (!isInvalid(children)) {
            var value = props.value;
            if (mounting && isNullOrUndef(value)) {
                value = props.defaultValue;
            }
            if (isArray(children)) {
                for (var i = 0, len = children.length; i < len; i++) {
                    updateChildOptionGroup(children[i], value);
                }
            } else if (isVNode(children)) {
                updateChildOptionGroup(children, value);
            }
        }
    }

    function isControlled$2(props) {
        return !isNullOrUndef(props.value);
    }
    function wrappedOnChange$1(e) {
        var vNode = this.vNode;
        var events = vNode.events || EMPTY_OBJ;
        var event = events.onChange;
        if (event.event) {
            event.event(event.data, e);
        } else {
            event(e);
        }
    }
    function onTextareaInputChange(e) {
        var vNode = this.vNode;
        var events = vNode.events || EMPTY_OBJ;
        var dom = vNode.dom;
        if (events.onInput) {
            var event = events.onInput;
            if (event.event) {
                event.event(event.data, e);
            } else {
                event(e);
            }
        } else if (events.oninput) {
            events.oninput(e);
        }
        // the user may have updated the vNode from the above onInput events
        // so we need to get it from the context of `this` again
        applyValue$2(this.vNode, dom, false);
    }
    function processTextarea(vNode, dom, mounting) {
        var props = vNode.props || EMPTY_OBJ;
        applyValue$2(vNode, dom, mounting);
        var textareaWrapper = wrappers.get(dom);
        if (isControlled$2(props)) {
            if (!textareaWrapper) {
                textareaWrapper = {
                    vNode: vNode
                };
                dom.oninput = onTextareaInputChange.bind(textareaWrapper);
                dom.oninput.wrapped = true;
                if (props.onChange) {
                    dom.onchange = wrappedOnChange$1.bind(textareaWrapper);
                    dom.onchange.wrapped = true;
                }
                wrappers.set(dom, textareaWrapper);
            }
            textareaWrapper.vNode = vNode;
            return true;
        }
        return false;
    }
    function applyValue$2(vNode, dom, mounting) {
        var props = vNode.props || EMPTY_OBJ;
        var value = props.value;
        var domValue = dom.value;
        if (isNullOrUndef(value)) {
            if (mounting) {
                var defaultValue = props.defaultValue;
                if (!isNullOrUndef(defaultValue)) {
                    if (defaultValue !== domValue) {
                        dom.value = defaultValue;
                    }
                } else if (domValue !== '') {
                    dom.value = '';
                }
            }
        } else {
            /* There is value so keep it controlled */
            if (domValue !== value) {
                dom.value = value;
            }
        }
    }

    var wrappers = new Map();
    function processElement(flags, vNode, dom, mounting) {
        if (flags & 512 /* InputElement */) {
                return processInput(vNode, dom);
            }
        if (flags & 2048 /* SelectElement */) {
                return processSelect(vNode, dom, mounting);
            }
        if (flags & 1024 /* TextareaElement */) {
                return processTextarea(vNode, dom, mounting);
            }
        return false;
    }

    function normalizeChildNodes(parentDom) {
        var dom = parentDom.firstChild;
        while (dom) {
            if (dom.nodeType === 8) {
                if (dom.data === '!') {
                    var placeholder = document.createTextNode('');
                    parentDom.replaceChild(placeholder, dom);
                    dom = dom.nextSibling;
                } else {
                    var lastDom = dom.previousSibling;
                    parentDom.removeChild(dom);
                    dom = lastDom || parentDom.firstChild;
                }
            } else {
                dom = dom.nextSibling;
            }
        }
    }
    function hydrateComponent(vNode, dom, lifecycle, context, isSVG, isClass) {
        var type = vNode.type;
        var ref = vNode.ref;
        vNode.dom = dom;
        var props = vNode.props || EMPTY_OBJ;
        if (isClass) {
            var _isSVG = dom.namespaceURI === svgNS;
            var instance = createClassComponentInstance(vNode, type, props, context, _isSVG);
            var input = instance._lastInput;
            instance._vComponent = vNode;
            instance._vNode = vNode;
            hydrate(input, dom, lifecycle, instance._childContext, _isSVG);
            mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
            options.findDOMNodeEnabled && componentToDOMNodeMap.set(instance, dom);
            vNode.children = instance;
        } else {
            var input$1 = createFunctionalComponentInput(vNode, type, props, context);
            hydrate(input$1, dom, lifecycle, context, isSVG);
            vNode.children = input$1;
            vNode.dom = input$1.dom;
            mountFunctionalComponentCallbacks(ref, dom, lifecycle);
        }
        return dom;
    }
    function hydrateElement(vNode, dom, lifecycle, context, isSVG) {
        var children = vNode.children;
        var props = vNode.props;
        var events = vNode.events;
        var flags = vNode.flags;
        var ref = vNode.ref;
        if (isSVG || flags & 128 /* SvgElement */) {
            isSVG = true;
        }
        if (dom.nodeType !== 1 || dom.tagName.toLowerCase() !== vNode.type) {
            if (process.env.NODE_ENV !== 'production') {
                warning('Inferno hydration: Server-side markup doesn\'t match client-side markup or Initial render target is not empty');
            }
            var newDom = mountElement(vNode, null, lifecycle, context, isSVG);
            vNode.dom = newDom;
            replaceChild(dom.parentNode, newDom, dom);
            return newDom;
        }
        vNode.dom = dom;
        if (children) {
            hydrateChildren(children, dom, lifecycle, context, isSVG);
        }
        var hasControlledValue = false;
        if (!(flags & 2 /* HtmlElement */)) {
            hasControlledValue = processElement(flags, vNode, dom, false);
        }
        if (props) {
            for (var prop in props) {
                patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue);
            }
        }
        if (events) {
            for (var name in events) {
                patchEvent(name, null, events[name], dom);
            }
        }
        if (ref) {
            mountRef(dom, ref, lifecycle);
        }
        return dom;
    }
    function hydrateChildren(children, parentDom, lifecycle, context, isSVG) {
        normalizeChildNodes(parentDom);
        var dom = parentDom.firstChild;
        if (isArray(children)) {
            for (var i = 0, len = children.length; i < len; i++) {
                var child = children[i];
                if (!isNull(child) && isObject(child)) {
                    if (dom) {
                        dom = hydrate(child, dom, lifecycle, context, isSVG);
                        dom = dom.nextSibling;
                    } else {
                        mount(child, parentDom, lifecycle, context, isSVG);
                    }
                }
            }
        } else if (isStringOrNumber(children)) {
            if (dom && dom.nodeType === 3) {
                if (dom.nodeValue !== children) {
                    dom.nodeValue = children;
                }
            } else if (children) {
                parentDom.textContent = children;
            }
            dom = dom.nextSibling;
        } else if (isObject(children)) {
            hydrate(children, dom, lifecycle, context, isSVG);
            dom = dom.nextSibling;
        }
        // clear any other DOM nodes, there should be only a single entry for the root
        while (dom) {
            var nextSibling = dom.nextSibling;
            parentDom.removeChild(dom);
            dom = nextSibling;
        }
    }
    function hydrateText(vNode, dom) {
        if (dom.nodeType !== 3) {
            var newDom = mountText(vNode, null);
            vNode.dom = newDom;
            replaceChild(dom.parentNode, newDom, dom);
            return newDom;
        }
        var text = vNode.children;
        if (dom.nodeValue !== text) {
            dom.nodeValue = text;
        }
        vNode.dom = dom;
        return dom;
    }
    function hydrateVoid(vNode, dom) {
        vNode.dom = dom;
        return dom;
    }
    function hydrate(vNode, dom, lifecycle, context, isSVG) {
        var flags = vNode.flags;
        if (flags & 28 /* Component */) {
                return hydrateComponent(vNode, dom, lifecycle, context, isSVG, flags & 4 /* ComponentClass */);
            } else if (flags & 3970 /* Element */) {
                return hydrateElement(vNode, dom, lifecycle, context, isSVG);
            } else if (flags & 1 /* Text */) {
                return hydrateText(vNode, dom);
            } else if (flags & 4096 /* Void */) {
                return hydrateVoid(vNode, dom);
            } else {
            if (process.env.NODE_ENV !== 'production') {
                throwError("hydrate() expects a valid VNode, instead it received an object with the type \"" + (typeof vNode === 'undefined' ? 'undefined' : _typeof(vNode)) + "\".");
            }
            throwError();
        }
    }
    function hydrateRoot(input, parentDom, lifecycle) {
        var dom = parentDom && parentDom.firstChild;
        if (dom) {
            hydrate(input, dom, lifecycle, EMPTY_OBJ, false);
            dom = parentDom.firstChild;
            // clear any other DOM nodes, there should be only a single entry for the root
            while (dom = dom.nextSibling) {
                parentDom.removeChild(dom);
            }
            return true;
        }
        return false;
    }

    var componentPools = new Map();
    var elementPools = new Map();
    function recycleElement(vNode, lifecycle, context, isSVG) {
        var tag = vNode.type;
        var pools = elementPools.get(tag);
        if (!isUndefined(pools)) {
            var key = vNode.key;
            var pool = key === null ? pools.nonKeyed : pools.keyed.get(key);
            if (!isUndefined(pool)) {
                var recycledVNode = pool.pop();
                if (!isUndefined(recycledVNode)) {
                    patchElement(recycledVNode, vNode, null, lifecycle, context, isSVG, true);
                    return vNode.dom;
                }
            }
        }
        return null;
    }
    function poolElement(vNode) {
        var tag = vNode.type;
        var key = vNode.key;
        var pools = elementPools.get(tag);
        if (isUndefined(pools)) {
            pools = {
                nonKeyed: [],
                keyed: new Map()
            };
            elementPools.set(tag, pools);
        }
        if (isNull(key)) {
            pools.nonKeyed.push(vNode);
        } else {
            var pool = pools.keyed.get(key);
            if (isUndefined(pool)) {
                pool = [];
                pools.keyed.set(key, pool);
            }
            pool.push(vNode);
        }
    }
    function recycleComponent(vNode, lifecycle, context, isSVG) {
        var type = vNode.type;
        var pools = componentPools.get(type);
        if (!isUndefined(pools)) {
            var key = vNode.key;
            var pool = key === null ? pools.nonKeyed : pools.keyed.get(key);
            if (!isUndefined(pool)) {
                var recycledVNode = pool.pop();
                if (!isUndefined(recycledVNode)) {
                    var flags = vNode.flags;
                    var failed = patchComponent(recycledVNode, vNode, null, lifecycle, context, isSVG, flags & 4 /* ComponentClass */, true);
                    if (!failed) {
                        return vNode.dom;
                    }
                }
            }
        }
        return null;
    }
    function poolComponent(vNode) {
        var hooks = vNode.ref;
        var nonRecycleHooks = hooks && (hooks.onComponentWillMount || hooks.onComponentWillUnmount || hooks.onComponentDidMount || hooks.onComponentWillUpdate || hooks.onComponentDidUpdate);
        if (nonRecycleHooks) {
            return;
        }
        var type = vNode.type;
        var key = vNode.key;
        var pools = componentPools.get(type);
        if (isUndefined(pools)) {
            pools = {
                nonKeyed: [],
                keyed: new Map()
            };
            componentPools.set(type, pools);
        }
        if (isNull(key)) {
            pools.nonKeyed.push(vNode);
        } else {
            var pool = pools.keyed.get(key);
            if (isUndefined(pool)) {
                pool = [];
                pools.keyed.set(key, pool);
            }
            pool.push(vNode);
        }
    }

    function unmount(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
        var flags = vNode.flags;
        if (flags & 28 /* Component */) {
                unmountComponent(vNode, parentDom, lifecycle, canRecycle, isRecycling);
            } else if (flags & 3970 /* Element */) {
                unmountElement(vNode, parentDom, lifecycle, canRecycle, isRecycling);
            } else if (flags & (1 /* Text */ | 4096 /* Void */)) {
            unmountVoidOrText(vNode, parentDom);
        }
    }
    function unmountVoidOrText(vNode, parentDom) {
        if (parentDom) {
            removeChild(parentDom, vNode.dom);
        }
    }
    function unmountComponent(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
        var instance = vNode.children;
        var flags = vNode.flags;
        var isStatefulComponent$$1 = flags & 4;
        var ref = vNode.ref;
        var dom = vNode.dom;
        if (!isRecycling) {
            if (isStatefulComponent$$1) {
                if (!instance._unmounted) {
                    instance._ignoreSetState = true;
                    options.beforeUnmount && options.beforeUnmount(vNode);
                    instance.componentWillUnmount && instance.componentWillUnmount();
                    if (ref && !isRecycling) {
                        ref(null);
                    }
                    instance._unmounted = true;
                    options.findDOMNodeEnabled && componentToDOMNodeMap.delete(instance);
                    unmount(instance._lastInput, null, instance._lifecycle, false, isRecycling);
                }
            } else {
                if (!isNullOrUndef(ref)) {
                    if (!isNullOrUndef(ref.onComponentWillUnmount)) {
                        ref.onComponentWillUnmount(dom);
                    }
                }
                unmount(instance, null, lifecycle, false, isRecycling);
            }
        }
        if (parentDom) {
            var lastInput = instance._lastInput;
            if (isNullOrUndef(lastInput)) {
                lastInput = instance;
            }
            removeChild(parentDom, dom);
        }
        if (options.recyclingEnabled && !isStatefulComponent$$1 && (parentDom || canRecycle)) {
            poolComponent(vNode);
        }
    }
    function unmountElement(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
        var dom = vNode.dom;
        var ref = vNode.ref;
        var events = vNode.events;
        if (ref && !isRecycling) {
            unmountRef(ref);
        }
        var children = vNode.children;
        if (!isNullOrUndef(children)) {
            unmountChildren$1(children, lifecycle, isRecycling);
        }
        if (!isNull(events)) {
            for (var name in events) {
                // do not add a hasOwnProperty check here, it affects performance
                patchEvent(name, events[name], null, dom);
                events[name] = null;
            }
        }
        if (parentDom) {
            removeChild(parentDom, dom);
        }
        if (options.recyclingEnabled && (parentDom || canRecycle)) {
            poolElement(vNode);
        }
    }
    function unmountChildren$1(children, lifecycle, isRecycling) {
        if (isArray(children)) {
            for (var i = 0, len = children.length; i < len; i++) {
                var child = children[i];
                if (!isInvalid(child) && isObject(child)) {
                    unmount(child, null, lifecycle, false, isRecycling);
                }
            }
        } else if (isObject(children)) {
            unmount(children, null, lifecycle, false, isRecycling);
        }
    }
    function unmountRef(ref) {
        if (isFunction(ref)) {
            ref(null);
        } else {
            if (isInvalid(ref)) {
                return;
            }
            if (process.env.NODE_ENV !== 'production') {
                throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
            }
            throwError();
        }
    }

    // rather than use a Map, like we did before, we can use an array here
    // given there shouldn't be THAT many roots on the page, the difference
    // in performance is huge: https://esbench.com/bench/5802a691330ab09900a1a2da
    var roots = [];
    var componentToDOMNodeMap = new Map();
    options.roots = roots;
    function findDOMNode(ref) {
        if (!options.findDOMNodeEnabled) {
            if (process.env.NODE_ENV !== 'production') {
                throwError('findDOMNode() has been disabled, use Inferno.options.findDOMNodeEnabled = true; enabled findDOMNode(). Warning this can significantly impact performance!');
            }
            throwError();
        }
        var dom = ref && ref.nodeType ? ref : null;
        return componentToDOMNodeMap.get(ref) || dom;
    }
    function getRoot(dom) {
        for (var i = 0, len = roots.length; i < len; i++) {
            var root = roots[i];
            if (root.dom === dom) {
                return root;
            }
        }
        return null;
    }
    function setRoot(dom, input, lifecycle) {
        var root = {
            dom: dom,
            input: input,
            lifecycle: lifecycle
        };
        roots.push(root);
        return root;
    }
    function removeRoot(root) {
        for (var i = 0, len = roots.length; i < len; i++) {
            if (roots[i] === root) {
                roots.splice(i, 1);
                return;
            }
        }
    }
    if (process.env.NODE_ENV !== 'production') {
        if (isBrowser && document.body === null) {
            warning('Inferno warning: you cannot initialize inferno without "document.body". Wait on "DOMContentLoaded" event, add script to bottom of body, or use async/defer attributes on script tag.');
        }
    }
    var documentBody = isBrowser ? document.body : null;
    function render(input, parentDom) {
        if (documentBody === parentDom) {
            if (process.env.NODE_ENV !== 'production') {
                throwError('you cannot render() to the "document.body". Use an empty element as a container instead.');
            }
            throwError();
        }
        if (input === NO_OP) {
            return;
        }
        var root = getRoot(parentDom);
        if (isNull(root)) {
            var lifecycle = new Lifecycle();
            if (!isInvalid(input)) {
                if (input.dom) {
                    input = directClone(input);
                }
                if (!hydrateRoot(input, parentDom, lifecycle)) {
                    mount(input, parentDom, lifecycle, EMPTY_OBJ, false);
                }
                root = setRoot(parentDom, input, lifecycle);
                lifecycle.trigger();
            }
        } else {
            var lifecycle$1 = root.lifecycle;
            lifecycle$1.listeners = [];
            if (isNullOrUndef(input)) {
                unmount(root.input, parentDom, lifecycle$1, false, false);
                removeRoot(root);
            } else {
                if (input.dom) {
                    input = directClone(input);
                }
                patch(root.input, input, parentDom, lifecycle$1, EMPTY_OBJ, false, false);
            }
            lifecycle$1.trigger();
            root.input = input;
        }
        if (root) {
            var rootInput = root.input;
            if (rootInput && rootInput.flags & 28 /* Component */) {
                return rootInput.children;
            }
        }
    }
    function createRenderer(parentDom) {
        return function renderer(lastInput, nextInput) {
            if (!parentDom) {
                parentDom = lastInput;
            }
            render(nextInput, parentDom);
        };
    }

    function patch(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
        if (lastVNode !== nextVNode) {
            var lastFlags = lastVNode.flags;
            var nextFlags = nextVNode.flags;
            if (nextFlags & 28 /* Component */) {
                    if (lastFlags & 28 /* Component */) {
                            patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, nextFlags & 4 /* ComponentClass */, isRecycling);
                        } else {
                        replaceVNode(parentDom, mountComponent(nextVNode, null, lifecycle, context, isSVG, nextFlags & 4 /* ComponentClass */), lastVNode, lifecycle, isRecycling);
                    }
                } else if (nextFlags & 3970 /* Element */) {
                    if (lastFlags & 3970 /* Element */) {
                            patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
                        } else {
                        replaceVNode(parentDom, mountElement(nextVNode, null, lifecycle, context, isSVG), lastVNode, lifecycle, isRecycling);
                    }
                } else if (nextFlags & 1 /* Text */) {
                    if (lastFlags & 1 /* Text */) {
                            patchText(lastVNode, nextVNode);
                        } else {
                        replaceVNode(parentDom, mountText(nextVNode, null), lastVNode, lifecycle, isRecycling);
                    }
                } else if (nextFlags & 4096 /* Void */) {
                    if (lastFlags & 4096 /* Void */) {
                            patchVoid(lastVNode, nextVNode);
                        } else {
                        replaceVNode(parentDom, mountVoid(nextVNode, null), lastVNode, lifecycle, isRecycling);
                    }
                } else {
                // Error case: mount new one replacing old one
                replaceLastChildAndUnmount(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
            }
        }
    }
    function unmountChildren(children, dom, lifecycle, isRecycling) {
        if (isVNode(children)) {
            unmount(children, dom, lifecycle, true, isRecycling);
        } else if (isArray(children)) {
            removeAllChildren(dom, children, lifecycle, isRecycling);
        } else {
            dom.textContent = '';
        }
    }
    function patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
        var nextTag = nextVNode.type;
        var lastTag = lastVNode.type;
        if (lastTag !== nextTag) {
            replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
        } else {
            var dom = lastVNode.dom;
            var lastProps = lastVNode.props;
            var nextProps = nextVNode.props;
            var lastChildren = lastVNode.children;
            var nextChildren = nextVNode.children;
            var lastFlags = lastVNode.flags;
            var nextFlags = nextVNode.flags;
            var nextRef = nextVNode.ref;
            var lastEvents = lastVNode.events;
            var nextEvents = nextVNode.events;
            nextVNode.dom = dom;
            if (isSVG || nextFlags & 128 /* SvgElement */) {
                isSVG = true;
            }
            if (lastChildren !== nextChildren) {
                patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
            }
            var hasControlledValue = false;
            if (!(nextFlags & 2 /* HtmlElement */)) {
                hasControlledValue = processElement(nextFlags, nextVNode, dom, false);
            }
            // inlined patchProps  -- starts --
            if (lastProps !== nextProps) {
                var lastPropsOrEmpty = lastProps || EMPTY_OBJ;
                var nextPropsOrEmpty = nextProps || EMPTY_OBJ;
                if (nextPropsOrEmpty !== EMPTY_OBJ) {
                    for (var prop in nextPropsOrEmpty) {
                        // do not add a hasOwnProperty check here, it affects performance
                        var nextValue = nextPropsOrEmpty[prop];
                        var lastValue = lastPropsOrEmpty[prop];
                        if (isNullOrUndef(nextValue)) {
                            removeProp(prop, nextValue, dom);
                        } else {
                            patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue);
                        }
                    }
                }
                if (lastPropsOrEmpty !== EMPTY_OBJ) {
                    for (var prop$1 in lastPropsOrEmpty) {
                        // do not add a hasOwnProperty check here, it affects performance
                        if (isNullOrUndef(nextPropsOrEmpty[prop$1])) {
                            removeProp(prop$1, lastPropsOrEmpty[prop$1], dom);
                        }
                    }
                }
            }
            // inlined patchProps  -- ends --
            if (lastEvents !== nextEvents) {
                patchEvents(lastEvents, nextEvents, dom);
            }
            if (nextRef) {
                if (lastVNode.ref !== nextRef || isRecycling) {
                    mountRef(dom, nextRef, lifecycle);
                }
            }
        }
    }
    function patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling) {
        var patchArray = false;
        var patchKeyed = false;
        if (nextFlags & 64 /* HasNonKeyedChildren */) {
                patchArray = true;
            } else if (lastFlags & 32 /* HasKeyedChildren */ && nextFlags & 32 /* HasKeyedChildren */) {
            patchKeyed = true;
            patchArray = true;
        } else if (isInvalid(nextChildren)) {
            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
        } else if (isInvalid(lastChildren)) {
            if (isStringOrNumber(nextChildren)) {
                setTextContent(dom, nextChildren);
            } else {
                if (isArray(nextChildren)) {
                    mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
                } else {
                    mount(nextChildren, dom, lifecycle, context, isSVG);
                }
            }
        } else if (isStringOrNumber(nextChildren)) {
            if (isStringOrNumber(lastChildren)) {
                updateTextContent(dom, nextChildren);
            } else {
                unmountChildren(lastChildren, dom, lifecycle, isRecycling);
                setTextContent(dom, nextChildren);
            }
        } else if (isArray(nextChildren)) {
            if (isArray(lastChildren)) {
                patchArray = true;
                if (isKeyed(lastChildren, nextChildren)) {
                    patchKeyed = true;
                }
            } else {
                unmountChildren(lastChildren, dom, lifecycle, isRecycling);
                mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
            }
        } else if (isArray(lastChildren)) {
            removeAllChildren(dom, lastChildren, lifecycle, isRecycling);
            mount(nextChildren, dom, lifecycle, context, isSVG);
        } else if (isVNode(nextChildren)) {
            if (isVNode(lastChildren)) {
                patch(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
            } else {
                unmountChildren(lastChildren, dom, lifecycle, isRecycling);
                mount(nextChildren, dom, lifecycle, context, isSVG);
            }
        }
        if (patchArray) {
            if (patchKeyed) {
                patchKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
            } else {
                patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
            }
        }
    }
    function patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isClass, isRecycling) {
        var lastType = lastVNode.type;
        var nextType = nextVNode.type;
        var lastKey = lastVNode.key;
        var nextKey = nextVNode.key;
        if (lastType !== nextType || lastKey !== nextKey) {
            replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
            return false;
        } else {
            var nextProps = nextVNode.props || EMPTY_OBJ;
            if (isClass) {
                var instance = lastVNode.children;
                if (instance._unmounted) {
                    if (isNull(parentDom)) {
                        return true;
                    }
                    replaceChild(parentDom, mountComponent(nextVNode, null, lifecycle, context, isSVG, nextVNode.flags & 4 /* ComponentClass */), lastVNode.dom);
                } else {
                    var lastState = instance.state;
                    var nextState = instance.state;
                    var lastProps = instance.props;
                    var childContext;
                    if (!isUndefined(instance.getChildContext)) {
                        childContext = instance.getChildContext();
                    }
                    nextVNode.children = instance;
                    instance._isSVG = isSVG;
                    instance._syncSetState = false;
                    if (isNullOrUndef(childContext)) {
                        childContext = context;
                    } else {
                        childContext = combineFrom(context, childContext);
                    }
                    var lastInput = instance._lastInput;
                    var nextInput = instance._updateComponent(lastState, nextState, lastProps, nextProps, context, false, false);
                    var didUpdate = true;
                    instance._childContext = childContext;
                    if (isInvalid(nextInput)) {
                        nextInput = createVoidVNode();
                    } else if (nextInput === NO_OP) {
                        nextInput = lastInput;
                        didUpdate = false;
                    } else if (isStringOrNumber(nextInput)) {
                        nextInput = createTextVNode(nextInput, null);
                    } else if (isArray(nextInput)) {
                        if (process.env.NODE_ENV !== 'production') {
                            throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
                        }
                        throwError();
                    } else if (isObject(nextInput) && nextInput.dom) {
                        nextInput = directClone(nextInput);
                    }
                    if (nextInput.flags & 28 /* Component */) {
                            nextInput.parentVNode = nextVNode;
                        } else if (lastInput.flags & 28 /* Component */) {
                            lastInput.parentVNode = nextVNode;
                        }
                    instance._lastInput = nextInput;
                    instance._vNode = nextVNode;
                    if (didUpdate) {
                        patch(lastInput, nextInput, parentDom, lifecycle, childContext, isSVG, isRecycling);
                        if (!isUndefined(instance.componentDidUpdate)) {
                            instance.componentDidUpdate(lastProps, lastState);
                        }
                        options.afterUpdate && options.afterUpdate(nextVNode);
                        options.findDOMNodeEnabled && componentToDOMNodeMap.set(instance, nextInput.dom);
                    }
                    instance._syncSetState = true;
                    nextVNode.dom = nextInput.dom;
                }
            } else {
                var shouldUpdate = true;
                var lastProps$1 = lastVNode.props;
                var nextHooks = nextVNode.ref;
                var nextHooksDefined = !isNullOrUndef(nextHooks);
                var lastInput$1 = lastVNode.children;
                var nextInput$1 = lastInput$1;
                nextVNode.dom = lastVNode.dom;
                nextVNode.children = lastInput$1;
                if (lastKey !== nextKey) {
                    shouldUpdate = true;
                } else {
                    if (nextHooksDefined && !isNullOrUndef(nextHooks.onComponentShouldUpdate)) {
                        shouldUpdate = nextHooks.onComponentShouldUpdate(lastProps$1, nextProps);
                    }
                }
                if (shouldUpdate !== false) {
                    if (nextHooksDefined && !isNullOrUndef(nextHooks.onComponentWillUpdate)) {
                        nextHooks.onComponentWillUpdate(lastProps$1, nextProps);
                    }
                    nextInput$1 = nextType(nextProps, context);
                    if (isInvalid(nextInput$1)) {
                        nextInput$1 = createVoidVNode();
                    } else if (isStringOrNumber(nextInput$1) && nextInput$1 !== NO_OP) {
                        nextInput$1 = createTextVNode(nextInput$1, null);
                    } else if (isArray(nextInput$1)) {
                        if (process.env.NODE_ENV !== 'production') {
                            throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
                        }
                        throwError();
                    } else if (isObject(nextInput$1) && nextInput$1.dom) {
                        nextInput$1 = directClone(nextInput$1);
                    }
                    if (nextInput$1 !== NO_OP) {
                        patch(lastInput$1, nextInput$1, parentDom, lifecycle, context, isSVG, isRecycling);
                        nextVNode.children = nextInput$1;
                        if (nextHooksDefined && !isNullOrUndef(nextHooks.onComponentDidUpdate)) {
                            nextHooks.onComponentDidUpdate(lastProps$1, nextProps);
                        }
                        nextVNode.dom = nextInput$1.dom;
                    }
                }
                if (nextInput$1.flags & 28 /* Component */) {
                        nextInput$1.parentVNode = nextVNode;
                    } else if (lastInput$1.flags & 28 /* Component */) {
                        lastInput$1.parentVNode = nextVNode;
                    }
            }
        }
        return false;
    }
    function patchText(lastVNode, nextVNode) {
        var nextText = nextVNode.children;
        var dom = lastVNode.dom;
        nextVNode.dom = dom;
        if (lastVNode.children !== nextText) {
            dom.nodeValue = nextText;
        }
    }
    function patchVoid(lastVNode, nextVNode) {
        nextVNode.dom = lastVNode.dom;
    }
    function patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling) {
        var lastChildrenLength = lastChildren.length;
        var nextChildrenLength = nextChildren.length;
        var commonLength = lastChildrenLength > nextChildrenLength ? nextChildrenLength : lastChildrenLength;
        var i = 0;
        for (; i < commonLength; i++) {
            var nextChild = nextChildren[i];
            if (nextChild.dom) {
                nextChild = nextChildren[i] = directClone(nextChild);
            }
            patch(lastChildren[i], nextChild, dom, lifecycle, context, isSVG, isRecycling);
        }
        if (lastChildrenLength < nextChildrenLength) {
            for (i = commonLength; i < nextChildrenLength; i++) {
                var nextChild$1 = nextChildren[i];
                if (nextChild$1.dom) {
                    nextChild$1 = nextChildren[i] = directClone(nextChild$1);
                }
                appendChild(dom, mount(nextChild$1, null, lifecycle, context, isSVG));
            }
        } else if (nextChildrenLength === 0) {
            removeAllChildren(dom, lastChildren, lifecycle, isRecycling);
        } else if (lastChildrenLength > nextChildrenLength) {
            for (i = commonLength; i < lastChildrenLength; i++) {
                unmount(lastChildren[i], dom, lifecycle, false, isRecycling);
            }
        }
    }
    function patchKeyedChildren(a, b, dom, lifecycle, context, isSVG, isRecycling) {
        var aLength = a.length;
        var bLength = b.length;
        var aEnd = aLength - 1;
        var bEnd = bLength - 1;
        var aStart = 0;
        var bStart = 0;
        var i;
        var j;
        var aNode;
        var bNode;
        var nextNode;
        var nextPos;
        var node;
        if (aLength === 0) {
            if (bLength !== 0) {
                mountArrayChildren(b, dom, lifecycle, context, isSVG);
            }
            return;
        } else if (bLength === 0) {
            removeAllChildren(dom, a, lifecycle, isRecycling);
            return;
        }
        var aStartNode = a[aStart];
        var bStartNode = b[bStart];
        var aEndNode = a[aEnd];
        var bEndNode = b[bEnd];
        if (bStartNode.dom) {
            b[bStart] = bStartNode = directClone(bStartNode);
        }
        if (bEndNode.dom) {
            b[bEnd] = bEndNode = directClone(bEndNode);
        }
        // Step 1
        /* eslint no-constant-condition: 0 */
        outer: while (true) {
            // Sync nodes with the same key at the beginning.
            while (aStartNode.key === bStartNode.key) {
                patch(aStartNode, bStartNode, dom, lifecycle, context, isSVG, isRecycling);
                aStart++;
                bStart++;
                if (aStart > aEnd || bStart > bEnd) {
                    break outer;
                }
                aStartNode = a[aStart];
                bStartNode = b[bStart];
                if (bStartNode.dom) {
                    b[bStart] = bStartNode = directClone(bStartNode);
                }
            }
            // Sync nodes with the same key at the end.
            while (aEndNode.key === bEndNode.key) {
                patch(aEndNode, bEndNode, dom, lifecycle, context, isSVG, isRecycling);
                aEnd--;
                bEnd--;
                if (aStart > aEnd || bStart > bEnd) {
                    break outer;
                }
                aEndNode = a[aEnd];
                bEndNode = b[bEnd];
                if (bEndNode.dom) {
                    b[bEnd] = bEndNode = directClone(bEndNode);
                }
            }
            // Move and sync nodes from right to left.
            if (aEndNode.key === bStartNode.key) {
                patch(aEndNode, bStartNode, dom, lifecycle, context, isSVG, isRecycling);
                insertOrAppend(dom, bStartNode.dom, aStartNode.dom);
                aEnd--;
                bStart++;
                aEndNode = a[aEnd];
                bStartNode = b[bStart];
                if (bStartNode.dom) {
                    b[bStart] = bStartNode = directClone(bStartNode);
                }
                continue;
            }
            // Move and sync nodes from left to right.
            if (aStartNode.key === bEndNode.key) {
                patch(aStartNode, bEndNode, dom, lifecycle, context, isSVG, isRecycling);
                nextPos = bEnd + 1;
                nextNode = nextPos < b.length ? b[nextPos].dom : null;
                insertOrAppend(dom, bEndNode.dom, nextNode);
                aStart++;
                bEnd--;
                aStartNode = a[aStart];
                bEndNode = b[bEnd];
                if (bEndNode.dom) {
                    b[bEnd] = bEndNode = directClone(bEndNode);
                }
                continue;
            }
            break;
        }
        if (aStart > aEnd) {
            if (bStart <= bEnd) {
                nextPos = bEnd + 1;
                nextNode = nextPos < b.length ? b[nextPos].dom : null;
                while (bStart <= bEnd) {
                    node = b[bStart];
                    if (node.dom) {
                        b[bStart] = node = directClone(node);
                    }
                    bStart++;
                    insertOrAppend(dom, mount(node, null, lifecycle, context, isSVG), nextNode);
                }
            }
        } else if (bStart > bEnd) {
            while (aStart <= aEnd) {
                unmount(a[aStart++], dom, lifecycle, false, isRecycling);
            }
        } else {
            aLength = aEnd - aStart + 1;
            bLength = bEnd - bStart + 1;
            var sources = new Array(bLength);
            // Mark all nodes as inserted.
            for (i = 0; i < bLength; i++) {
                sources[i] = -1;
            }
            var moved = false;
            var pos = 0;
            var patched = 0;
            // When sizes are small, just loop them through
            if (bLength <= 4 || aLength * bLength <= 16) {
                for (i = aStart; i <= aEnd; i++) {
                    aNode = a[i];
                    if (patched < bLength) {
                        for (j = bStart; j <= bEnd; j++) {
                            bNode = b[j];
                            if (aNode.key === bNode.key) {
                                sources[j - bStart] = i;
                                if (pos > j) {
                                    moved = true;
                                } else {
                                    pos = j;
                                }
                                if (bNode.dom) {
                                    b[j] = bNode = directClone(bNode);
                                }
                                patch(aNode, bNode, dom, lifecycle, context, isSVG, isRecycling);
                                patched++;
                                a[i] = null;
                                break;
                            }
                        }
                    }
                }
            } else {
                var keyIndex = new Map();
                // Map keys by their index in array
                for (i = bStart; i <= bEnd; i++) {
                    keyIndex.set(b[i].key, i);
                }
                // Try to patch same keys
                for (i = aStart; i <= aEnd; i++) {
                    aNode = a[i];
                    if (patched < bLength) {
                        j = keyIndex.get(aNode.key);
                        if (!isUndefined(j)) {
                            bNode = b[j];
                            sources[j - bStart] = i;
                            if (pos > j) {
                                moved = true;
                            } else {
                                pos = j;
                            }
                            if (bNode.dom) {
                                b[j] = bNode = directClone(bNode);
                            }
                            patch(aNode, bNode, dom, lifecycle, context, isSVG, isRecycling);
                            patched++;
                            a[i] = null;
                        }
                    }
                }
            }
            // fast-path: if nothing patched remove all old and add all new
            if (aLength === a.length && patched === 0) {
                removeAllChildren(dom, a, lifecycle, isRecycling);
                while (bStart < bLength) {
                    node = b[bStart];
                    if (node.dom) {
                        b[bStart] = node = directClone(node);
                    }
                    bStart++;
                    insertOrAppend(dom, mount(node, null, lifecycle, context, isSVG), null);
                }
            } else {
                i = aLength - patched;
                while (i > 0) {
                    aNode = a[aStart++];
                    if (!isNull(aNode)) {
                        unmount(aNode, dom, lifecycle, true, isRecycling);
                        i--;
                    }
                }
                if (moved) {
                    var seq = lis_algorithm(sources);
                    j = seq.length - 1;
                    for (i = bLength - 1; i >= 0; i--) {
                        if (sources[i] === -1) {
                            pos = i + bStart;
                            node = b[pos];
                            if (node.dom) {
                                b[pos] = node = directClone(node);
                            }
                            nextPos = pos + 1;
                            nextNode = nextPos < b.length ? b[nextPos].dom : null;
                            insertOrAppend(dom, mount(node, dom, lifecycle, context, isSVG), nextNode);
                        } else {
                            if (j < 0 || i !== seq[j]) {
                                pos = i + bStart;
                                node = b[pos];
                                nextPos = pos + 1;
                                nextNode = nextPos < b.length ? b[nextPos].dom : null;
                                insertOrAppend(dom, node.dom, nextNode);
                            } else {
                                j--;
                            }
                        }
                    }
                } else if (patched !== bLength) {
                    // when patched count doesn't match b length we need to insert those new ones
                    // loop backwards so we can use insertBefore
                    for (i = bLength - 1; i >= 0; i--) {
                        if (sources[i] === -1) {
                            pos = i + bStart;
                            node = b[pos];
                            if (node.dom) {
                                b[pos] = node = directClone(node);
                            }
                            nextPos = pos + 1;
                            nextNode = nextPos < b.length ? b[nextPos].dom : null;
                            insertOrAppend(dom, mount(node, null, lifecycle, context, isSVG), nextNode);
                        }
                    }
                }
            }
        }
    }
    // // https://en.wikipedia.org/wiki/Longest_increasing_subsequence
    function lis_algorithm(arr) {
        var p = arr.slice(0);
        var result = [0];
        var i;
        var j;
        var u;
        var v;
        var c;
        var len = arr.length;
        for (i = 0; i < len; i++) {
            var arrI = arr[i];
            if (arrI === -1) {
                continue;
            }
            j = result[result.length - 1];
            if (arr[j] < arrI) {
                p[i] = j;
                result.push(i);
                continue;
            }
            u = 0;
            v = result.length - 1;
            while (u < v) {
                c = (u + v) / 2 | 0;
                if (arr[result[c]] < arrI) {
                    u = c + 1;
                } else {
                    v = c;
                }
            }
            if (arrI < arr[result[u]]) {
                if (u > 0) {
                    p[i] = result[u - 1];
                }
                result[u] = i;
            }
        }
        u = result.length;
        v = result[u - 1];
        while (u-- > 0) {
            result[u] = v;
            v = p[v];
        }
        return result;
    }
    function patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue) {
        if (prop in skipProps || hasControlledValue && prop === 'value') {
            return;
        } else if (prop in booleanProps) {
            dom[prop] = !!nextValue;
        } else if (prop in strictProps) {
            var value = isNullOrUndef(nextValue) ? '' : nextValue;
            if (dom[prop] !== value) {
                dom[prop] = value;
            }
        } else if (lastValue !== nextValue) {
            if (isAttrAnEvent(prop)) {
                patchEvent(prop, lastValue, nextValue, dom);
            } else if (isNullOrUndef(nextValue)) {
                dom.removeAttribute(prop);
            } else if (prop === 'className') {
                if (isSVG) {
                    dom.setAttribute('class', nextValue);
                } else {
                    dom.className = nextValue;
                }
            } else if (prop === 'style') {
                patchStyle(lastValue, nextValue, dom);
            } else if (prop === 'dangerouslySetInnerHTML') {
                var lastHtml = lastValue && lastValue.__html;
                var nextHtml = nextValue && nextValue.__html;
                if (lastHtml !== nextHtml) {
                    if (!isNullOrUndef(nextHtml)) {
                        dom.innerHTML = nextHtml;
                    }
                }
            } else {
                var ns = isSVG ? namespaces[prop] : false;
                if (ns) {
                    dom.setAttributeNS(ns, prop, nextValue);
                } else {
                    dom.setAttribute(prop, nextValue);
                }
            }
        }
    }
    function patchEvents(lastEvents, nextEvents, dom) {
        lastEvents = lastEvents || EMPTY_OBJ;
        nextEvents = nextEvents || EMPTY_OBJ;
        if (nextEvents !== EMPTY_OBJ) {
            for (var name in nextEvents) {
                // do not add a hasOwnProperty check here, it affects performance
                patchEvent(name, lastEvents[name], nextEvents[name], dom);
            }
        }
        if (lastEvents !== EMPTY_OBJ) {
            for (var name$1 in lastEvents) {
                // do not add a hasOwnProperty check here, it affects performance
                if (isNullOrUndef(nextEvents[name$1])) {
                    patchEvent(name$1, lastEvents[name$1], null, dom);
                }
            }
        }
    }
    function patchEvent(name, lastValue, nextValue, dom) {
        if (lastValue !== nextValue) {
            var nameLowerCase = name.toLowerCase();
            var domEvent = dom[nameLowerCase];
            // if the function is wrapped, that means it's been controlled by a wrapper
            if (domEvent && domEvent.wrapped) {
                return;
            }
            if (delegatedProps[name]) {
                handleEvent(name, lastValue, nextValue, dom);
            } else {
                if (!isFunction(nextValue) && !isNullOrUndef(nextValue)) {
                    var linkEvent = nextValue.event;
                    if (linkEvent && isFunction(linkEvent)) {
                        if (!dom._data) {
                            dom[nameLowerCase] = function (e) {
                                linkEvent(e.currentTarget._data, e);
                            };
                        }
                        dom._data = nextValue.data;
                    } else {
                        if (process.env.NODE_ENV !== 'production') {
                            throwError("an event on a VNode \"" + name + "\". was not a function or a valid linkEvent.");
                        }
                        throwError();
                    }
                } else {
                    dom[nameLowerCase] = nextValue;
                }
            }
        }
    }
    // We are assuming here that we come from patchProp routine
    // -nextAttrValue cannot be null or undefined
    function patchStyle(lastAttrValue, nextAttrValue, dom) {
        var domStyle = dom.style;
        if (isString(nextAttrValue)) {
            domStyle.cssText = nextAttrValue;
            return;
        }
        for (var style in nextAttrValue) {
            // do not add a hasOwnProperty check here, it affects performance
            var value = nextAttrValue[style];
            if (!isNumber(value) || style in isUnitlessNumber) {
                domStyle[style] = value;
            } else {
                domStyle[style] = value + 'px';
            }
        }
        if (!isNullOrUndef(lastAttrValue)) {
            for (var style$1 in lastAttrValue) {
                if (isNullOrUndef(nextAttrValue[style$1])) {
                    domStyle[style$1] = '';
                }
            }
        }
    }
    function removeProp(prop, lastValue, dom) {
        if (prop === 'className') {
            dom.removeAttribute('class');
        } else if (prop === 'value') {
            dom.value = '';
        } else if (prop === 'style') {
            dom.removeAttribute('style');
        } else if (isAttrAnEvent(prop)) {
            handleEvent(name, lastValue, null, dom);
        } else {
            dom.removeAttribute(prop);
        }
    }

    function mount(vNode, parentDom, lifecycle, context, isSVG) {
        var flags = vNode.flags;
        if (flags & 3970 /* Element */) {
                return mountElement(vNode, parentDom, lifecycle, context, isSVG);
            } else if (flags & 28 /* Component */) {
                return mountComponent(vNode, parentDom, lifecycle, context, isSVG, flags & 4 /* ComponentClass */);
            } else if (flags & 4096 /* Void */) {
                return mountVoid(vNode, parentDom);
            } else if (flags & 1 /* Text */) {
                return mountText(vNode, parentDom);
            } else {
            if (process.env.NODE_ENV !== 'production') {
                if ((typeof vNode === 'undefined' ? 'undefined' : _typeof(vNode)) === 'object') {
                    throwError("mount() received an object that's not a valid VNode, you should stringify it first. Object: \"" + JSON.stringify(vNode) + "\".");
                } else {
                    throwError("mount() expects a valid VNode, instead it received an object with the type \"" + (typeof vNode === 'undefined' ? 'undefined' : _typeof(vNode)) + "\".");
                }
            }
            throwError();
        }
    }
    function mountText(vNode, parentDom) {
        var dom = document.createTextNode(vNode.children);
        vNode.dom = dom;
        if (parentDom) {
            appendChild(parentDom, dom);
        }
        return dom;
    }
    function mountVoid(vNode, parentDom) {
        var dom = document.createTextNode('');
        vNode.dom = dom;
        if (parentDom) {
            appendChild(parentDom, dom);
        }
        return dom;
    }
    function mountElement(vNode, parentDom, lifecycle, context, isSVG) {
        if (options.recyclingEnabled) {
            var dom$1 = recycleElement(vNode, lifecycle, context, isSVG);
            if (!isNull(dom$1)) {
                if (!isNull(parentDom)) {
                    appendChild(parentDom, dom$1);
                }
                return dom$1;
            }
        }
        var flags = vNode.flags;
        if (isSVG || flags & 128 /* SvgElement */) {
            isSVG = true;
        }
        var dom = documentCreateElement(vNode.type, isSVG);
        var children = vNode.children;
        var props = vNode.props;
        var events = vNode.events;
        var ref = vNode.ref;
        vNode.dom = dom;
        if (!isInvalid(children)) {
            if (isStringOrNumber(children)) {
                setTextContent(dom, children);
            } else if (isArray(children)) {
                mountArrayChildren(children, dom, lifecycle, context, isSVG);
            } else if (isVNode(children)) {
                mount(children, dom, lifecycle, context, isSVG);
            }
        }
        var hasControlledValue = false;
        if (!(flags & 2 /* HtmlElement */)) {
            hasControlledValue = processElement(flags, vNode, dom, true);
        }
        if (!isNull(props)) {
            for (var prop in props) {
                // do not add a hasOwnProperty check here, it affects performance
                patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue);
            }
        }
        if (!isNull(events)) {
            for (var name in events) {
                // do not add a hasOwnProperty check here, it affects performance
                patchEvent(name, null, events[name], dom);
            }
        }
        if (!isNull(ref)) {
            mountRef(dom, ref, lifecycle);
        }
        if (!isNull(parentDom)) {
            appendChild(parentDom, dom);
        }
        return dom;
    }
    function mountArrayChildren(children, dom, lifecycle, context, isSVG) {
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            // Verify can string/number be here. might cause de-opt. - Normalization takes care of it.
            if (!isInvalid(child)) {
                if (child.dom) {
                    children[i] = child = directClone(child);
                }
                mount(children[i], dom, lifecycle, context, isSVG);
            }
        }
    }
    function mountComponent(vNode, parentDom, lifecycle, context, isSVG, isClass) {
        if (options.recyclingEnabled) {
            var dom$1 = recycleComponent(vNode, lifecycle, context, isSVG);
            if (!isNull(dom$1)) {
                if (!isNull(parentDom)) {
                    appendChild(parentDom, dom$1);
                }
                return dom$1;
            }
        }
        var type = vNode.type;
        var props = vNode.props || EMPTY_OBJ;
        var ref = vNode.ref;
        var dom;
        if (isClass) {
            var instance = createClassComponentInstance(vNode, type, props, context, isSVG);
            var input = instance._lastInput;
            instance._vNode = vNode;
            vNode.dom = dom = mount(input, null, lifecycle, instance._childContext, isSVG);
            if (!isNull(parentDom)) {
                appendChild(parentDom, dom);
            }
            mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
            options.findDOMNodeEnabled && componentToDOMNodeMap.set(instance, dom);
            vNode.children = instance;
        } else {
            var input$1 = createFunctionalComponentInput(vNode, type, props, context);
            vNode.dom = dom = mount(input$1, null, lifecycle, context, isSVG);
            vNode.children = input$1;
            mountFunctionalComponentCallbacks(ref, dom, lifecycle);
            if (!isNull(parentDom)) {
                appendChild(parentDom, dom);
            }
        }
        return dom;
    }
    function mountClassComponentCallbacks(vNode, ref, instance, lifecycle) {
        if (ref) {
            if (isFunction(ref)) {
                ref(instance);
            } else {
                if (process.env.NODE_ENV !== 'production') {
                    if (isStringOrNumber(ref)) {
                        throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
                    } else if (isObject(ref) && vNode.flags & 4 /* ComponentClass */) {
                        throwError('functional component lifecycle events are not supported on ES2015 class components.');
                    } else {
                        throwError("a bad value for \"ref\" was used on component: \"" + JSON.stringify(ref) + "\"");
                    }
                }
                throwError();
            }
        }
        var cDM = instance.componentDidMount;
        var afterMount = options.afterMount;
        if (!isUndefined(cDM) || !isNull(afterMount)) {
            lifecycle.addListener(function () {
                afterMount && afterMount(vNode);
                cDM && instance.componentDidMount();
                instance._syncSetState = true;
            });
        } else {
            instance._syncSetState = true;
        }
    }
    function mountFunctionalComponentCallbacks(ref, dom, lifecycle) {
        if (ref) {
            if (!isNullOrUndef(ref.onComponentWillMount)) {
                ref.onComponentWillMount();
            }
            if (!isNullOrUndef(ref.onComponentDidMount)) {
                lifecycle.addListener(function () {
                    return ref.onComponentDidMount(dom);
                });
            }
        }
    }
    function mountRef(dom, value, lifecycle) {
        if (isFunction(value)) {
            lifecycle.addListener(function () {
                return value(dom);
            });
        } else {
            if (isInvalid(value)) {
                return;
            }
            if (process.env.NODE_ENV !== 'production') {
                throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
            }
            throwError();
        }
    }

    // We need EMPTY_OBJ defined in one place.
    // Its used for comparison so we cant inline it into shared
    var EMPTY_OBJ = {};
    if (process.env.NODE_ENV !== 'production') {
        Object.freeze(EMPTY_OBJ);
    }
    function createClassComponentInstance(vNode, Component, props, context, isSVG) {
        if (isUndefined(context)) {
            context = EMPTY_OBJ; // Context should not be mutable
        }
        var instance = new Component(props, context);
        instance.context = context;
        if (instance.props === EMPTY_OBJ) {
            instance.props = props;
        }
        instance._patch = patch;
        if (options.findDOMNodeEnabled) {
            instance._componentToDOMNodeMap = componentToDOMNodeMap;
        }
        instance._unmounted = false;
        instance._pendingSetState = true;
        instance._isSVG = isSVG;
        if (!isUndefined(instance.componentWillMount)) {
            instance.componentWillMount();
        }
        var childContext;
        if (!isUndefined(instance.getChildContext)) {
            childContext = instance.getChildContext();
        }
        if (isNullOrUndef(childContext)) {
            instance._childContext = context;
        } else {
            instance._childContext = combineFrom(context, childContext);
        }
        options.beforeRender && options.beforeRender(instance);
        var input = instance.render(props, instance.state, context);
        options.afterRender && options.afterRender(instance);
        if (isArray(input)) {
            if (process.env.NODE_ENV !== 'production') {
                throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
            }
            throwError();
        } else if (isInvalid(input)) {
            input = createVoidVNode();
        } else if (isStringOrNumber(input)) {
            input = createTextVNode(input, null);
        } else {
            if (input.dom) {
                input = directClone(input);
            }
            if (input.flags & 28 /* Component */) {
                    // if we have an input that is also a component, we run into a tricky situation
                    // where the root vNode needs to always have the correct DOM entry
                    // so we break monomorphism on our input and supply it our vNode as parentVNode
                    // we can optimise this in the future, but this gets us out of a lot of issues
                    input.parentVNode = vNode;
                }
        }
        instance._pendingSetState = false;
        instance._lastInput = input;
        return instance;
    }
    function replaceLastChildAndUnmount(lastInput, nextInput, parentDom, lifecycle, context, isSVG, isRecycling) {
        replaceVNode(parentDom, mount(nextInput, null, lifecycle, context, isSVG), lastInput, lifecycle, isRecycling);
    }
    function replaceVNode(parentDom, dom, vNode, lifecycle, isRecycling) {
        unmount(vNode, null, lifecycle, false, isRecycling);
        replaceChild(parentDom, dom, vNode.dom);
    }
    function createFunctionalComponentInput(vNode, component, props, context) {
        var input = component(props, context);
        if (isArray(input)) {
            if (process.env.NODE_ENV !== 'production') {
                throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
            }
            throwError();
        } else if (isInvalid(input)) {
            input = createVoidVNode();
        } else if (isStringOrNumber(input)) {
            input = createTextVNode(input, null);
        } else {
            if (input.dom) {
                input = directClone(input);
            }
            if (input.flags & 28 /* Component */) {
                    // if we have an input that is also a component, we run into a tricky situation
                    // where the root vNode needs to always have the correct DOM entry
                    // so we break monomorphism on our input and supply it our vNode as parentVNode
                    // we can optimise this in the future, but this gets us out of a lot of issues
                    input.parentVNode = vNode;
                }
        }
        return input;
    }
    function setTextContent(dom, text) {
        if (text !== '') {
            dom.textContent = text;
        } else {
            dom.appendChild(document.createTextNode(''));
        }
    }
    function updateTextContent(dom, text) {
        dom.firstChild.nodeValue = text;
    }
    function appendChild(parentDom, dom) {
        parentDom.appendChild(dom);
    }
    function insertOrAppend(parentDom, newNode, nextNode) {
        if (isNullOrUndef(nextNode)) {
            appendChild(parentDom, newNode);
        } else {
            parentDom.insertBefore(newNode, nextNode);
        }
    }
    function documentCreateElement(tag, isSVG) {
        if (isSVG === true) {
            return document.createElementNS(svgNS, tag);
        } else {
            return document.createElement(tag);
        }
    }
    function replaceWithNewNode(lastNode, nextNode, parentDom, lifecycle, context, isSVG, isRecycling) {
        unmount(lastNode, null, lifecycle, false, isRecycling);
        var dom = mount(nextNode, null, lifecycle, context, isSVG);
        nextNode.dom = dom;
        replaceChild(parentDom, dom, lastNode.dom);
    }
    function replaceChild(parentDom, nextDom, lastDom) {
        if (!parentDom) {
            parentDom = lastDom.parentNode;
        }
        parentDom.replaceChild(nextDom, lastDom);
    }
    function removeChild(parentDom, dom) {
        parentDom.removeChild(dom);
    }
    function removeAllChildren(dom, children, lifecycle, isRecycling) {
        dom.textContent = '';
        if (!options.recyclingEnabled || options.recyclingEnabled && !isRecycling) {
            removeChildren(null, children, lifecycle, isRecycling);
        }
    }
    function removeChildren(dom, children, lifecycle, isRecycling) {
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            if (!isInvalid(child)) {
                unmount(child, dom, lifecycle, true, isRecycling);
            }
        }
    }
    function isKeyed(lastChildren, nextChildren) {
        return nextChildren.length && !isNullOrUndef(nextChildren[0]) && !isNullOrUndef(nextChildren[0].key) && lastChildren.length && !isNullOrUndef(lastChildren[0]) && !isNullOrUndef(lastChildren[0].key);
    }

    function createVNode(flags, type, props, children, events, key, ref, noNormalise) {
        if (flags & 16 /* ComponentUnknown */) {
                flags = isStatefulComponent(type) ? 4 /* ComponentClass */ : 8 /* ComponentFunction */;
            }
        var vNode = {
            children: isUndefined(children) ? null : children,
            dom: null,
            events: events || null,
            flags: flags,
            key: isUndefined(key) ? null : key,
            props: props || null,
            ref: ref || null,
            type: type
        };
        if (!noNormalise) {
            normalize(vNode);
        }
        if (options.createVNode) {
            options.createVNode(vNode);
        }
        return vNode;
    }
    function directClone(vNodeToClone) {
        var newVNode;
        var flags = vNodeToClone.flags;
        if (flags & 28 /* Component */) {
                var props;
                var propsToClone = vNodeToClone.props;
                if (!propsToClone) {
                    props = EMPTY_OBJ;
                } else {
                    props = {};
                    for (var key in propsToClone) {
                        props[key] = propsToClone[key];
                    }
                }
                newVNode = createVNode(flags, vNodeToClone.type, props, null, vNodeToClone.events, vNodeToClone.key, vNodeToClone.ref, true);
                var newProps = newVNode.props;
                if (newProps) {
                    var newChildren = newProps.children;
                    // we need to also clone component children that are in props
                    // as the children may also have been hoisted
                    if (newChildren) {
                        if (isArray(newChildren)) {
                            var len = newChildren.length;
                            if (len > 0) {
                                var tmpArray = [];
                                for (var i = 0; i < len; i++) {
                                    var child = newChildren[i];
                                    if (isStringOrNumber(child)) {
                                        tmpArray.push(child);
                                    } else if (!isInvalid(child) && isVNode(child)) {
                                        tmpArray.push(directClone(child));
                                    }
                                }
                                newProps.children = tmpArray;
                            }
                        } else if (isVNode(newChildren)) {
                            newProps.children = directClone(newChildren);
                        }
                    }
                }
                newVNode.children = null;
            } else if (flags & 3970 /* Element */) {
                var children = vNodeToClone.children;
                var props$1;
                var propsToClone$1 = vNodeToClone.props;
                if (!propsToClone$1) {
                    props$1 = EMPTY_OBJ;
                } else {
                    props$1 = {};
                    for (var key$1 in propsToClone$1) {
                        props$1[key$1] = propsToClone$1[key$1];
                    }
                }
                newVNode = createVNode(flags, vNodeToClone.type, props$1, children, vNodeToClone.events, vNodeToClone.key, vNodeToClone.ref, !children);
            } else if (flags & 1 /* Text */) {
                newVNode = createTextVNode(vNodeToClone.children, vNodeToClone.key);
            }
        return newVNode;
    }
    /*
     directClone is preferred over cloneVNode and used internally also.
     This function makes Inferno backwards compatible.
     And can be tree-shaked by modern bundlers
    
     Would be nice to combine this with directClone but could not do it without breaking change
     */
    function cloneVNode(vNodeToClone, props) {
        var _children = [],
            len$2 = arguments.length - 2;
        while (len$2-- > 0) {
            _children[len$2] = arguments[len$2 + 2];
        }var children = _children;
        var childrenLen = _children.length;
        if (childrenLen > 0 && !isUndefined(_children[0])) {
            if (!props) {
                props = {};
            }
            if (childrenLen === 1) {
                children = _children[0];
            }
            if (!isUndefined(children)) {
                props.children = children;
            }
        }
        var newVNode;
        if (isArray(vNodeToClone)) {
            var tmpArray = [];
            for (var i = 0, len = vNodeToClone.length; i < len; i++) {
                tmpArray.push(directClone(vNodeToClone[i]));
            }
            newVNode = tmpArray;
        } else {
            var flags = vNodeToClone.flags;
            var events = vNodeToClone.events || props && props.events || null;
            var key = !isNullOrUndef(vNodeToClone.key) ? vNodeToClone.key : props ? props.key : null;
            var ref = vNodeToClone.ref || (props ? props.ref : null);
            if (flags & 28 /* Component */) {
                    newVNode = createVNode(flags, vNodeToClone.type, !vNodeToClone.props && !props ? EMPTY_OBJ : combineFrom(vNodeToClone.props, props), null, events, key, ref, true);
                    var newProps = newVNode.props;
                    if (newProps) {
                        var newChildren = newProps.children;
                        // we need to also clone component children that are in props
                        // as the children may also have been hoisted
                        if (newChildren) {
                            if (isArray(newChildren)) {
                                var len$1 = newChildren.length;
                                if (len$1 > 0) {
                                    var tmpArray$1 = [];
                                    for (var i$1 = 0; i$1 < len$1; i$1++) {
                                        var child = newChildren[i$1];
                                        if (isStringOrNumber(child)) {
                                            tmpArray$1.push(child);
                                        } else if (!isInvalid(child) && isVNode(child)) {
                                            tmpArray$1.push(directClone(child));
                                        }
                                    }
                                    newProps.children = tmpArray$1;
                                }
                            } else if (isVNode(newChildren)) {
                                newProps.children = directClone(newChildren);
                            }
                        }
                    }
                    newVNode.children = null;
                } else if (flags & 3970 /* Element */) {
                    children = props && !isUndefined(props.children) ? props.children : vNodeToClone.children;
                    newVNode = createVNode(flags, vNodeToClone.type, !vNodeToClone.props && !props ? EMPTY_OBJ : combineFrom(vNodeToClone.props, props), children, events, key, ref, !children);
                } else if (flags & 1 /* Text */) {
                    newVNode = createTextVNode(vNodeToClone.children, key);
                }
        }
        return newVNode;
    }
    function createVoidVNode() {
        return createVNode(4096 /* Void */);
    }
    function createTextVNode(text, key) {
        return createVNode(1 /* Text */, null, null, text, null, key);
    }
    function isVNode(o) {
        return !!o.flags;
    }

    function linkEvent(data, event) {
        return { data: data, event: event };
    }

    if (process.env.NODE_ENV !== 'production') {
        var testFunc = function testFn() {};
        if ((testFunc.name || testFunc.toString()).indexOf('testFn') === -1) {
            warning('It looks like you\'re using a minified copy of the development build ' + 'of Inferno. When deploying Inferno apps to production, make sure to use ' + 'the production build which skips development warnings and is faster. ' + 'See http://infernojs.org for more details.');
        }
    }
    // This will be replaced by rollup
    var version = '1.4.0';
    // we duplicate it so it plays nicely with different module loading systems
    var index = {
        linkEvent: linkEvent,
        // core shapes
        createVNode: createVNode,
        // cloning
        cloneVNode: cloneVNode,
        // used to shared common items between Inferno libs
        NO_OP: NO_OP,
        EMPTY_OBJ: EMPTY_OBJ,
        // DOM
        render: render,
        findDOMNode: findDOMNode,
        createRenderer: createRenderer,
        options: options,
        version: version
    };

    exports.version = version;
    exports['default'] = index;
    exports.linkEvent = linkEvent;
    exports.createVNode = createVNode;
    exports.cloneVNode = cloneVNode;
    exports.NO_OP = NO_OP;
    exports.EMPTY_OBJ = EMPTY_OBJ;
    exports.render = render;
    exports.findDOMNode = findDOMNode;
    exports.createRenderer = createRenderer;
    exports.options = options;
    exports.internal_isUnitlessNumber = isUnitlessNumber;
    exports.internal_normalize = normalize;

    Object.defineProperty(exports, '__esModule', { value: true });
});

}).call(this,require('_process'))
},{"_process":4}],9:[function(require,module,exports){
'use strict';

(function () {

  'use strict';

  var fs = require('fs');

  function convert(arr, file, callback) {
    if (!Array.isArray(arr)) {
      callback(new Error('First argument must be an array'));
      return false;
    }
    var data = {};
    var final = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var url = _step.value;

        if (typeof url !== 'string') {
          callback(new Error('Array must contain strings'));
          return false;
        }
        var obj = parse(url);
        final.push(combine(obj, data));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    write(file, JSON.stringify(final), function (error) {
      if (error) callback(error);
      callback(null, true);
    });
  }

  // *** helpers *** //

  function parse(url) {
    if (typeof url !== 'string') return false;
    if (url.indexOf('?') === -1) return false;
    var params = url.slice(url.indexOf('?') + 1).split('&');
    if (params.length < 1 || params[0] === '') return false;
    return params.reduce(function (result, value, index) {
      var hash = value.split(/=(.+)?/);
      if (!Object.keys(result).length) {
        return updateObject(hash, result);
      } else {
        for (var key in result) {
          if (result.hasOwnProperty(hash[0])) {
            result[hash[0]] = result[hash[0]].concat(hash[1]);
          } else {
            return updateObject(hash, result);
          }
        }
        return result;
      }
    }, {});
  }

  function updateObject(hash, obj) {
    if (hash.length === 1) obj[hash[0]] = null;else obj[hash[0]] = [hash[1]];
    return obj;
  }

  function combine(obj, src, callback) {
    if (!obj) return 'obj cannot be falsely';
    if (obj !== Object(obj) || Array.isArray(obj)) return 'obj must be an object';
    if (!Object.keys(obj).length) return 'obj cannot be empty';
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        obj[key] = obj[key].concat(src[key][0]);
      }
    }
    return obj;
  }

  function read(name, callback) {
    fs.readFile(name, 'utf8', function (err, data) {
      if (err) callback(err);
      callback(null, data);
    });
  }

  function write(name, data, callback) {
    fs.writeFile(name, data, function (err) {
      if (err) callback(err);
      callback(null, true);
    });
  }

  module.exports = {
    convert: convert,
    parse: parse,
    combine: combine,
    write: write,
    read: read
  };
})();

},{"fs":3}],10:[function(require,module,exports){
'use strict';

// This library started as an experiment to see how small I could make
// a functional router. It has since been optimized (and thus grown).
// The redundancy and inelegance here is for the sake of either size
// or speed.
(function (root, factory) {
  var define = root && root.define;

  if (define && define.amd) {
    define('rlite', [], factory);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.Rlite = factory();
  }
})(undefined, function () {
  return function (notFound, routeDefinitions) {
    var routes = {};
    var decode = decodeURIComponent;

    init();

    return run;

    function init() {
      for (var key in routeDefinitions) {
        add(key, routeDefinitions[key]);
      }
    };

    function noop(s) {
      return s;
    }

    function sanitize(url) {
      ~url.indexOf('/?') && (url = url.replace('/?', '?'));
      url[0] == '/' && (url = url.slice(1));
      url[url.length - 1] == '/' && (url = url.slice(0, -1));

      return url;
    }

    function processUrl(url, esc) {
      var pieces = url.split('/'),
          rules = routes,
          params = {};

      for (var i = 0; i < pieces.length && rules; ++i) {
        var piece = esc(pieces[i]);
        rules = rules[piece.toLowerCase()] || rules[':'];
        rules && rules['~'] && (params[rules['~']] = piece);
      }

      return rules && {
        cb: rules['@'],
        params: params
      };
    }

    function processQuery(url, ctx, esc) {
      if (url && ctx.cb) {
        var hash = url.indexOf('#'),
            query = (hash < 0 ? url : url.slice(0, hash)).split('&');

        for (var i = 0; i < query.length; ++i) {
          var nameValue = query[i].split('=');

          ctx.params[nameValue[0]] = esc(nameValue[1]);
        }
      }

      return ctx;
    }

    function lookup(url) {
      var querySplit = sanitize(url).split('?');
      var esc = ~url.indexOf('%') ? decode : noop;

      return processQuery(querySplit[1], processUrl(querySplit[0], esc) || {}, esc);
    }

    function add(route, handler) {
      var pieces = route.split('/');
      var rules = routes;

      for (var i = +(route[0] === '/'); i < pieces.length; ++i) {
        var piece = pieces[i];
        var name = piece[0] == ':' ? ':' : piece.toLowerCase();

        rules = rules[name] || (rules[name] = {});

        name == ':' && (rules['~'] = piece.slice(1));
      }

      rules['@'] = handler;
    }

    function run(url, arg) {
      var result = lookup(url);

      return (result.cb || notFound)(result.params, arg, url);
    };
  };
});

},{}],11:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var window = require('global/window');
var assert = require('assert');

var qs = require('./qs');

module.exports = href;

var noRoutingAttrName = 'data-no-routing';

// handle a click if is anchor tag with an href
// and url lives on the same domain. Replaces
// trailing '#' so empty links work as expected.
// (fn(str), obj?) -> undefined
function href(cb, root) {
  assert.equal(typeof cb === 'undefined' ? 'undefined' : _typeof(cb), 'function', 'sheet-router/href: cb must be a function');

  window.onclick = function (e) {
    if (e.button && e.button !== 0 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;

    var node = function traverse(node) {
      if (!node || node === root) return;
      if (node.localName !== 'a') return traverse(node.parentNode);
      if (node.href === undefined) return traverse(node.parentNode);
      if (window.location.host !== node.host) return traverse(node.parentNode);
      return node;
    }(e.target);

    if (!node) return;

    var isRoutingDisabled = node.hasAttribute(noRoutingAttrName);
    if (isRoutingDisabled) return;

    e.preventDefault();
    cb({
      pathname: node.pathname,
      search: node.search ? qs(node.search) : {},
      href: node.href,
      hash: node.hash
    });
  };
}

},{"./qs":12,"assert":2,"global/window":5}],12:[function(require,module,exports){
'use strict';

var window = require('global/window');

var decodeURIComponent = window.decodeURIComponent;
var reg = new RegExp('([^?=&]+)(=([^&]*))?', 'g');

module.exports = qs;

// decode a uri into a kv representation :: str -> obj
function qs(uri) {
  var obj = {};
  uri.replace(/^.*\?/, '').replace(reg, map);
  return obj;

  function map(a0, a1, a2, a3) {
    obj[decodeURIComponent(a1)] = decodeURIComponent(a3);
  }
}

},{"global/window":5}],13:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Object.defineProperty(exports, "__esModule", { value: true });
function noop() {
    return null;
}
function arrayToObj(curr, prev) {
    return Object.assign({}, curr, prev);
}
function merge(model, prop) {
    if (model.models) {
        var child = Object.keys(model.models).map(function (key) {
            return _defineProperty({}, key, merge(model.models[key], prop));
        }).reduce(arrayToObj, {});
        return Object.assign({}, model[prop], child);
    }
    return model[prop];
}
exports.merge = merge;
function createState(model) {
    return merge(model, 'state');
}
exports.createState = createState;
function retrieveNestedModel(model, path) {
    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    if (model.models) {
        var currModel = model.models[path[index]];
        if (currModel && currModel.models && currModel.models[path[index + 1]]) {
            return retrieveNestedModel(currModel, path, index + 1);
        }
        return currModel;
    }
    return model;
}
exports.retrieveNestedModel = retrieveNestedModel;
function getNestedObjFromPath(state, path) {
    if (path.length) {
        return getNestedObjFromPath(state[path[0]], path.slice(1));
    }
    return state;
}
exports.getNestedObjFromPath = getNestedObjFromPath;
function updateStateAtPath(state, path, value) {
    if (path.length > 0) {
        var key = path[0];
        if (path.length > 1) {
            state[key] = updateStateAtPath(state[key], path.slice(1), value);
        } else {
            state[key] = value;
        }
    }
    return state;
}
exports.updateStateAtPath = updateStateAtPath;
function twine(opts) {
    if (!opts) {
        opts = noop;
    }
    var onStateChange = typeof opts === 'function' ? opts : opts.onStateChange || noop;
    var onMethodCall = typeof opts === 'function' ? noop : opts.onMethodCall || noop;
    return function output(model) {
        var state = createState(model);
        var actions = createActions(model, []);
        function decorateActions(reducers, effects, path) {
            var decoratedReducers = Object.keys(reducers || {}).map(function (key) {
                return _defineProperty({}, key, function () {
                    var oldState = Object.assign({}, state);
                    var localState = path.length ? getNestedObjFromPath(state, path) : state;
                    var reducerArgs = [localState].concat(Array.prototype.slice.call(arguments));
                    var reducerResponse = reducers[key].apply(null, reducerArgs);
                    var newLocalState = Object.assign({}, localState, reducerResponse);
                    state = path.length ? updateStateAtPath(state, path, newLocalState) : newLocalState;
                    var onMethodCallArgs = [state, oldState].concat(Array.prototype.slice.call(arguments));
                    onMethodCall.apply(null, onMethodCallArgs);
                    onStateChange(state, oldState, actions);
                    return newLocalState;
                });
            });
            var decoratedEffects = Object.keys(effects || {}).map(function (key) {
                return _defineProperty({}, key, function () {
                    if (path.length) {
                        var nestedModel = retrieveNestedModel(model, path);
                        var effectState = nestedModel.scoped ? getNestedObjFromPath(state, path) : state;
                        var effectActions = nestedModel.scoped ? getNestedObjFromPath(actions, path) : actions;
                        return effects[key].apply(null, [effectState, effectActions].concat(Array.prototype.slice.call(arguments)));
                    }
                    return effects[key].apply(null, [state, actions].concat(Array.prototype.slice.call(arguments)));
                });
            });
            return decoratedReducers.concat(decoratedEffects).reduce(arrayToObj, {});
        }
        function createActions(model, path) {
            if (model.models) {
                var child = Object.keys(model.models).map(function (key) {
                    return _defineProperty({}, key, createActions(model.models[key], path.concat(key)));
                }).reduce(arrayToObj, {});
                return Object.assign({}, decorateActions(model.reducers, model.effects, path), child);
            }
            return decorateActions(model.reducers, model.effects, path);
        }
        return {
            state: state,
            actions: actions
        };
    };
}
exports.default = twine;

},{}],14:[function(require,module,exports){
'use strict';

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function TempCtor() {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}

},{}],15:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function isBuffer(arg) {
  return arg && (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
};

},{}],16:[function(require,module,exports){
(function (process,global){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function (f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function (x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s':
        return String(args[i++]);
      case '%d':
        return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};

// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function (fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function () {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};

var debugs = {};
var debugEnviron;
exports.debuglog = function (set) {
  if (isUndefined(debugEnviron)) debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function () {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function () {};
    }
  }
  return debugs[set];
};

/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;

// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold': [1, 22],
  'italic': [3, 23],
  'underline': [4, 24],
  'inverse': [7, 27],
  'white': [37, 39],
  'grey': [90, 39],
  'black': [30, 39],
  'blue': [34, 39],
  'cyan': [36, 39],
  'green': [32, 39],
  'magenta': [35, 39],
  'red': [31, 39],
  'yellow': [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};

function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\x1B[' + inspect.colors[style][0] + 'm' + str + '\x1B[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}

function stylizeNoColor(str, styleType) {
  return str;
}

function arrayToHash(array) {
  var hash = {};

  array.forEach(function (val, idx) {
    hash[val] = true;
  });

  return hash;
}

function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect && value && isFunction(value.inspect) &&
  // Filter out the util module, it's inspect function is special
  value.inspect !== exports.inspect &&
  // Also filter out any prototype objects using the circular check.
  !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '',
      array = false,
      braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function (key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}

function formatPrimitive(ctx, value) {
  if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value)) return ctx.stylize('' + value, 'number');
  if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value)) return ctx.stylize('null', 'null');
}

function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}

function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function (key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
    }
  });
  return output;
}

function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function (line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function (line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}

function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function (prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'symbol' || // ES6 symbol
  typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}

// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function () {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};

/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function (origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":15,"_process":4,"inherits":14}]},{},[1]);
