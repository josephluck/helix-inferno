(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helix_js_1 = require("helix-js");
var inferno_1 = require("inferno");
var createElement = require("inferno-create-element");
exports.h = createElement;
exports.log = helix_js_1.log;
function renderer(dom) {
    var _dom = dom;
    return function (node, state, prev, actions) {
        if (node) {
            inferno_1.default.render(node(state, prev, actions), _dom);
        }
    };
}
function default_1(opts) {
    var config = Object.assign({}, opts, {
        render: renderer(opts.mount)
    });
    return helix_js_1.default(config);
}
exports.default = default_1;

},{"helix-js":5,"inferno":28,"inferno-create-element":7}],2:[function(require,module,exports){
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
},{"util/":41}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Object.defineProperty(exports, "__esModule", { value: true });
var rlite = require("rlite-router");
var href = require("sheet-router/href");
var qs = require("qs");
var twine_js_1 = require("twine-js");
var twineLog = require("twine-js/lib/log");
exports.log = twineLog.default;
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
function getQueryFromLocation(search) {
    return search.length ? qs.parse(search.slice(1)) : {};
}
function location(rerender) {
    return {
        state: {
            pathname: '',
            params: {}
        },
        reducers: {
            receiveRoute: function receiveRoute(_state, _ref2) {
                var pathname = _ref2.pathname,
                    params = _ref2.params;

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
    var notFound = configuration.routes && configuration.routes.notFound ? configuration.routes.notFound : function () {
        return null;
    };
    var router = rlite(notFound, routes);
    var model = createModel(configuration.model, configuration.routes, renderCurrentLocation);
    var plugins = [onStateChange].concat(configuration.plugins || []);
    var store = twine_js_1.default(plugins)(model);
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
                var query = getQueryFromLocation(window.location.search);
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
    function setLocationAndRender(location) {
        var search = Object.keys(location.search).length ? "?" + qs.stringify(location.search, { encode: false }) : '';
        var path = "" + location.pathname + search;
        window.history.pushState('', '', path);
        rerender(getComponent(location.pathname));
    }
    href(setLocationAndRender);
    window.onpopstate = renderCurrentLocation;
    renderCurrentLocation();
}
exports.default = default_1;

},{"qs":30,"rlite-router":34,"sheet-router/href":35,"twine-js":37,"twine-js/lib/log":38}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_1 = require("inferno");
var inferno_shared_1 = require("inferno-shared");
var componentHooks = {
    onComponentWillMount: true,
    onComponentDidMount: true,
    onComponentWillUnmount: true,
    onComponentShouldUpdate: true,
    onComponentWillUpdate: true,
    onComponentDidUpdate: true
};
function createElement(name, props) {
    var _children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        _children[_i - 2] = arguments[_i];
    }
    if (inferno_shared_1.isInvalid(name) || inferno_shared_1.isObject(name)) {
        throw new Error('Inferno Error: createElement() name parameter cannot be undefined, null, false or true, It must be a string, class or function.');
    }
    var children = _children;
    var ref = null;
    var key = null;
    var className = null;
    var flags = 0;
    if (_children) {
        if (_children.length === 1) {
            children = _children[0];
        } else if (_children.length === 0) {
            children = undefined;
        }
    }
    if (inferno_shared_1.isString(name)) {
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
        if (!inferno_shared_1.isNullOrUndef(props)) {
            var propKeys = Object.keys(props);
            for (var i = 0, len = propKeys.length; i < len; i++) {
                var propKey = propKeys[i];
                if (propKey === 'className' || propKey === 'class') {
                    className = props[propKey];
                    delete props[propKey];
                } else if (propKey === 'key') {
                    key = props.key;
                    delete props.key;
                } else if (propKey === 'children' && inferno_shared_1.isUndefined(children)) {
                    children = props.children; // always favour children args, default to props
                } else if (propKey === 'ref') {
                    ref = props.ref;
                }
            }
        }
    } else {
        flags = inferno_shared_1.isStatefulComponent(name) ? 4 /* ComponentClass */ : 8 /* ComponentFunction */;
        if (!inferno_shared_1.isUndefined(children)) {
            if (!props) {
                props = {};
            }
            props.children = children;
            children = null;
        }
        if (!inferno_shared_1.isNullOrUndef(props)) {
            /*
             This fixes de-optimisation:
             uses object Keys for looping props to avoid deleting props of looped object
             */
            var propKeys = Object.keys(props);
            for (var i = 0, len = propKeys.length; i < len; i++) {
                var propKey = propKeys[i];
                if (componentHooks[propKey]) {
                    if (!ref) {
                        ref = {};
                    }
                    ref[propKey] = props[propKey];
                } else if (propKey === 'key') {
                    key = props.key;
                    delete props.key;
                }
            }
        }
    }
    return inferno_1.createVNode(flags, name, className, children, props, key, ref);
}
exports.default = createElement;

},{"inferno":28,"inferno-shared":9}],7:[function(require,module,exports){
'use strict';

module.exports = require('./dist').default;
module.exports.default = module.exports;

},{"./dist":6}],8:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
exports.NO_OP = '$NO_OP';
exports.ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
// This should be boolean and not reference to window.document
exports.isBrowser = !!(typeof window !== 'undefined' && window.document);
function toArray(children) {
    return exports.isArray(children) ? children : children ? [children] : children;
}
exports.toArray = toArray;
// this is MUCH faster than .constructor === Array and instanceof Array
// in Node 7 and the later versions of V8, slower in older versions though
exports.isArray = Array.isArray;
function isStatefulComponent(o) {
    return !isUndefined(o.prototype) && !isUndefined(o.prototype.render);
}
exports.isStatefulComponent = isStatefulComponent;
function isStringOrNumber(obj) {
    var type = typeof obj === "undefined" ? "undefined" : _typeof(obj);
    return type === 'string' || type === 'number';
}
exports.isStringOrNumber = isStringOrNumber;
function isNullOrUndef(obj) {
    return isUndefined(obj) || isNull(obj);
}
exports.isNullOrUndef = isNullOrUndef;
function isInvalid(obj) {
    return isNull(obj) || obj === false || isTrue(obj) || isUndefined(obj);
}
exports.isInvalid = isInvalid;
function isFunction(obj) {
    return typeof obj === 'function';
}
exports.isFunction = isFunction;
function isString(obj) {
    return typeof obj === 'string';
}
exports.isString = isString;
function isNumber(obj) {
    return typeof obj === 'number';
}
exports.isNumber = isNumber;
function isNull(obj) {
    return obj === null;
}
exports.isNull = isNull;
function isTrue(obj) {
    return obj === true;
}
exports.isTrue = isTrue;
function isUndefined(obj) {
    return obj === undefined;
}
exports.isUndefined = isUndefined;
function isObject(o) {
    return (typeof o === "undefined" ? "undefined" : _typeof(o)) === 'object';
}
exports.isObject = isObject;
function throwError(message) {
    if (!message) {
        message = exports.ERROR_MSG;
    }
    throw new Error("Inferno Error: " + message);
}
exports.throwError = throwError;
function warning(message) {
    console.warn(message);
}
exports.warning = warning;
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
exports.combineFrom = combineFrom;
function Lifecycle() {
    this.listeners = [];
}
exports.Lifecycle = Lifecycle;
Lifecycle.prototype.addListener = function addListener(callback) {
    this.listeners.push(callback);
};
Lifecycle.prototype.trigger = function trigger() {
    var listeners = this.listeners;
    for (var i = 0, len = listeners.length; i < len; i++) {
        listeners[i]();
    }
};

},{}],9:[function(require,module,exports){
'use strict';

module.exports = require('./dist');
module.exports.default = module.exports;

},{"./dist":8}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.xlinkNS = 'http://www.w3.org/1999/xlink';
exports.xmlNS = 'http://www.w3.org/XML/1998/namespace';
exports.svgNS = 'http://www.w3.org/2000/svg';
var TRUE = true;
exports.strictProps = Object.create(null);
exports.strictProps.volume = TRUE;
exports.strictProps.defaultChecked = TRUE;
Object.freeze(exports.strictProps);
exports.booleanProps = Object.create(null);
exports.booleanProps.muted = TRUE;
exports.booleanProps.scoped = TRUE;
exports.booleanProps.loop = TRUE;
exports.booleanProps.open = TRUE;
exports.booleanProps.checked = TRUE;
exports.booleanProps.default = TRUE;
exports.booleanProps.capture = TRUE;
exports.booleanProps.disabled = TRUE;
exports.booleanProps.readOnly = TRUE;
exports.booleanProps.required = TRUE;
exports.booleanProps.autoplay = TRUE;
exports.booleanProps.controls = TRUE;
exports.booleanProps.seamless = TRUE;
exports.booleanProps.reversed = TRUE;
exports.booleanProps.allowfullscreen = TRUE;
exports.booleanProps.novalidate = TRUE;
exports.booleanProps.hidden = TRUE;
exports.booleanProps.autoFocus = TRUE;
Object.freeze(exports.booleanProps);
exports.namespaces = Object.create(null);
exports.namespaces['xlink:href'] = exports.xlinkNS;
exports.namespaces['xlink:arcrole'] = exports.xlinkNS;
exports.namespaces['xlink:actuate'] = exports.xlinkNS;
exports.namespaces['xlink:show'] = exports.xlinkNS;
exports.namespaces['xlink:role'] = exports.xlinkNS;
exports.namespaces['xlink:title'] = exports.xlinkNS;
exports.namespaces['xlink:type'] = exports.xlinkNS;
exports.namespaces['xml:base'] = exports.xmlNS;
exports.namespaces['xml:lang'] = exports.xmlNS;
exports.namespaces['xml:space'] = exports.xmlNS;
Object.freeze(exports.namespaces);
exports.isUnitlessNumber = Object.create(null);
exports.isUnitlessNumber.animationIterationCount = TRUE;
exports.isUnitlessNumber.borderImageOutset = TRUE;
exports.isUnitlessNumber.borderImageSlice = TRUE;
exports.isUnitlessNumber.borderImageWidth = TRUE;
exports.isUnitlessNumber.boxFlex = TRUE;
exports.isUnitlessNumber.boxFlexGroup = TRUE;
exports.isUnitlessNumber.boxOrdinalGroup = TRUE;
exports.isUnitlessNumber.columnCount = TRUE;
exports.isUnitlessNumber.flex = TRUE;
exports.isUnitlessNumber.flexGrow = TRUE;
exports.isUnitlessNumber.flexPositive = TRUE;
exports.isUnitlessNumber.flexShrink = TRUE;
exports.isUnitlessNumber.flexNegative = TRUE;
exports.isUnitlessNumber.flexOrder = TRUE;
exports.isUnitlessNumber.gridRow = TRUE;
exports.isUnitlessNumber.gridColumn = TRUE;
exports.isUnitlessNumber.fontWeight = TRUE;
exports.isUnitlessNumber.lineClamp = TRUE;
exports.isUnitlessNumber.lineHeight = TRUE;
exports.isUnitlessNumber.opacity = TRUE;
exports.isUnitlessNumber.order = TRUE;
exports.isUnitlessNumber.orphans = TRUE;
exports.isUnitlessNumber.tabSize = TRUE;
exports.isUnitlessNumber.widows = TRUE;
exports.isUnitlessNumber.zIndex = TRUE;
exports.isUnitlessNumber.zoom = TRUE;
exports.isUnitlessNumber.fillOpacity = TRUE;
exports.isUnitlessNumber.floodOpacity = TRUE;
exports.isUnitlessNumber.stopOpacity = TRUE;
exports.isUnitlessNumber.strokeDasharray = TRUE;
exports.isUnitlessNumber.strokeDashoffset = TRUE;
exports.isUnitlessNumber.strokeMiterlimit = TRUE;
exports.isUnitlessNumber.strokeOpacity = TRUE;
exports.isUnitlessNumber.strokeWidth = TRUE;
Object.freeze(exports.isUnitlessNumber);
exports.skipProps = Object.create(null);
exports.skipProps.children = TRUE;
exports.skipProps.childrenType = TRUE;
exports.skipProps.defaultValue = TRUE;
exports.skipProps.ref = TRUE;
exports.skipProps.key = TRUE;
exports.skipProps.selected = TRUE;
exports.skipProps.checked = TRUE;
exports.skipProps.multiple = TRUE;
Object.freeze(exports.skipProps);
exports.delegatedEvents = Object.create(null);
exports.delegatedEvents.onClick = TRUE;
exports.delegatedEvents.onMouseDown = TRUE;
exports.delegatedEvents.onMouseUp = TRUE;
exports.delegatedEvents.onMouseMove = TRUE;
exports.delegatedEvents.onSubmit = TRUE;
exports.delegatedEvents.onDblClick = TRUE;
exports.delegatedEvents.onKeyDown = TRUE;
exports.delegatedEvents.onKeyUp = TRUE;
exports.delegatedEvents.onKeyPress = TRUE;
Object.freeze(exports.delegatedEvents);

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = require("inferno-shared");
var isiOS = inferno_shared_1.isBrowser && !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
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
        delegatedRoots.count--;
        delegatedRoots.items.delete(dom);
        if (delegatedRoots.count === 0) {
            document.removeEventListener(normalizeEventName(name), delegatedRoots.docEvent);
            delegatedEvents.delete(name);
        }
    }
}
exports.handleEvent = handleEvent;
function dispatchEvent(event, target, items, count, dom, isClick) {
    var eventsToTrigger = items.get(target);
    if (eventsToTrigger) {
        count--;
        // linkEvent object
        dom = target;
        if (eventsToTrigger.event) {
            eventsToTrigger.event(eventsToTrigger.data, event);
        } else {
            eventsToTrigger(event);
        }
        if (event.cancelBubble) {
            return;
        }
    }
    if (count > 0) {
        var parentDom = target.parentNode;
        // Html Nodes can be nested fe: span inside button in that scenario browser does not handle disabled attribute on parent,
        // because the event listener is on document.body
        // Don't process clicks on disabled elements
        if (parentDom === null || isClick && parentDom.nodeType === 1 && parentDom.disabled) {
            return;
        }
        dispatchEvent(event, parentDom, items, count, dom, isClick);
    }
}
function normalizeEventName(name) {
    return name.substr(2).toLowerCase();
}
function stopPropagation() {
    this.cancelBubble = true;
    this.stopImmediatePropagation();
}
function attachEventToDocument(name, delegatedRoots) {
    var docEvent = function docEvent(event) {
        var count = delegatedRoots.count;
        if (count > 0) {
            event.stopPropagation = stopPropagation;
            dispatchEvent(event, event.target, delegatedRoots.items, count, document, event.type === 'click');
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

},{"inferno-shared":9}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function linkEvent(data, event) {
    return { data: data, event: event };
}
exports.default = linkEvent;

},{}],13:[function(require,module,exports){
(function (process){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = require("inferno-shared");
var options_1 = require("../core/options");
var constants_1 = require("./constants");
var mounting_1 = require("./mounting");
var patching_1 = require("./patching");
var rendering_1 = require("./rendering");
var utils_1 = require("./utils");
var processElement_1 = require("./wrappers/processElement");
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
exports.normalizeChildNodes = normalizeChildNodes;
function hydrateComponent(vNode, dom, lifecycle, context, isSVG, isClass) {
    var type = vNode.type;
    var ref = vNode.ref;
    vNode.dom = dom;
    var props = vNode.props || utils_1.EMPTY_OBJ;
    if (isClass) {
        var _isSVG = dom.namespaceURI === constants_1.svgNS;
        var instance = utils_1.createClassComponentInstance(vNode, type, props, context, _isSVG, lifecycle);
        var input = instance._lastInput;
        instance._vComponent = vNode;
        instance._vNode = vNode;
        hydrate(input, dom, lifecycle, instance._childContext, _isSVG);
        mounting_1.mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
        options_1.default.findDOMNodeEnabled && rendering_1.componentToDOMNodeMap.set(instance, dom);
        vNode.children = instance;
    } else {
        var input = utils_1.createFunctionalComponentInput(vNode, type, props, context);
        hydrate(input, dom, lifecycle, context, isSVG);
        vNode.children = input;
        vNode.dom = input.dom;
        mounting_1.mountFunctionalComponentCallbacks(ref, dom, lifecycle);
    }
    return dom;
}
function hydrateElement(vNode, dom, lifecycle, context, isSVG) {
    var children = vNode.children;
    var props = vNode.props;
    var className = vNode.className;
    var flags = vNode.flags;
    var ref = vNode.ref;
    if (isSVG || flags & 128 /* SvgElement */) {
        isSVG = true;
    }
    if (dom.nodeType !== 1 || dom.tagName.toLowerCase() !== vNode.type) {
        if (process.env.NODE_ENV !== 'production') {
            inferno_shared_1.warning('Inferno hydration: Server-side markup doesn\'t match client-side markup or Initial render target is not empty');
        }
        var newDom = mounting_1.mountElement(vNode, null, lifecycle, context, isSVG);
        vNode.dom = newDom;
        utils_1.replaceChild(dom.parentNode, newDom, dom);
        return newDom;
    }
    vNode.dom = dom;
    if (children) {
        hydrateChildren(children, dom, lifecycle, context, isSVG);
    }
    var hasControlledValue = false;
    if (!(flags & 2 /* HtmlElement */)) {
        hasControlledValue = processElement_1.default(flags, vNode, dom, false);
    }
    if (props) {
        for (var prop in props) {
            patching_1.patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue);
        }
    }
    if (inferno_shared_1.isNullOrUndef(className)) {
        dom.removeAttribute('class');
    } else {
        if (isSVG) {
            dom.setAttribute('class', className);
        } else {
            dom.className = className;
        }
    }
    if (ref) {
        mounting_1.mountRef(dom, ref, lifecycle);
    }
    return dom;
}
function hydrateChildren(children, parentDom, lifecycle, context, isSVG) {
    normalizeChildNodes(parentDom);
    var dom = parentDom.firstChild;
    if (inferno_shared_1.isArray(children)) {
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            if (!inferno_shared_1.isNull(child) && inferno_shared_1.isObject(child)) {
                if (dom) {
                    dom = hydrate(child, dom, lifecycle, context, isSVG);
                    dom = dom.nextSibling;
                } else {
                    mounting_1.mount(child, parentDom, lifecycle, context, isSVG);
                }
            }
        }
    } else if (inferno_shared_1.isStringOrNumber(children)) {
        if (dom && dom.nodeType === 3) {
            if (dom.nodeValue !== children) {
                dom.nodeValue = children;
            }
        } else if (children) {
            parentDom.textContent = children;
        }
        dom = dom.nextSibling;
    } else if (inferno_shared_1.isObject(children)) {
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
        var newDom = mounting_1.mountText(vNode, null);
        vNode.dom = newDom;
        utils_1.replaceChild(dom.parentNode, newDom, dom);
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
            inferno_shared_1.throwError("hydrate() expects a valid VNode, instead it received an object with the type \"" + (typeof vNode === "undefined" ? "undefined" : _typeof(vNode)) + "\".");
        }
        inferno_shared_1.throwError();
    }
}
function hydrateRoot(input, parentDom, lifecycle) {
    var dom = parentDom && parentDom.firstChild;
    if (dom) {
        hydrate(input, dom, lifecycle, utils_1.EMPTY_OBJ, false);
        dom = parentDom.firstChild;
        // clear any other DOM nodes, there should be only a single entry for the root
        while (dom = dom.nextSibling) {
            parentDom.removeChild(dom);
        }
        return true;
    }
    return false;
}
exports.default = hydrateRoot;

}).call(this,require('_process'))
},{"../core/options":26,"./constants":10,"./mounting":14,"./patching":15,"./rendering":17,"./utils":19,"./wrappers/processElement":23,"_process":3,"inferno-shared":9}],14:[function(require,module,exports){
(function (process){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = require("inferno-shared");
var options_1 = require("../core/options");
var VNodes_1 = require("../core/VNodes");
var patching_1 = require("./patching");
var recycling_1 = require("./recycling");
var rendering_1 = require("./rendering");
var utils_1 = require("./utils");
var processElement_1 = require("./wrappers/processElement");
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
            if ((typeof vNode === "undefined" ? "undefined" : _typeof(vNode)) === 'object') {
                inferno_shared_1.throwError("mount() received an object that's not a valid VNode, you should stringify it first. Object: \"" + JSON.stringify(vNode) + "\".");
            } else {
                inferno_shared_1.throwError("mount() expects a valid VNode, instead it received an object with the type \"" + (typeof vNode === "undefined" ? "undefined" : _typeof(vNode)) + "\".");
            }
        }
        inferno_shared_1.throwError();
    }
}
exports.mount = mount;
function mountText(vNode, parentDom) {
    var dom = document.createTextNode(vNode.children);
    vNode.dom = dom;
    if (parentDom) {
        utils_1.appendChild(parentDom, dom);
    }
    return dom;
}
exports.mountText = mountText;
function mountVoid(vNode, parentDom) {
    var dom = document.createTextNode('');
    vNode.dom = dom;
    if (parentDom) {
        utils_1.appendChild(parentDom, dom);
    }
    return dom;
}
exports.mountVoid = mountVoid;
function mountElement(vNode, parentDom, lifecycle, context, isSVG) {
    if (options_1.default.recyclingEnabled) {
        var dom_1 = recycling_1.recycleElement(vNode, lifecycle, context, isSVG);
        if (!inferno_shared_1.isNull(dom_1)) {
            if (!inferno_shared_1.isNull(parentDom)) {
                utils_1.appendChild(parentDom, dom_1);
            }
            return dom_1;
        }
    }
    var flags = vNode.flags;
    if (isSVG || flags & 128 /* SvgElement */) {
        isSVG = true;
    }
    var dom = utils_1.documentCreateElement(vNode.type, isSVG);
    var children = vNode.children;
    var props = vNode.props;
    var className = vNode.className;
    var ref = vNode.ref;
    vNode.dom = dom;
    if (!inferno_shared_1.isInvalid(children)) {
        if (inferno_shared_1.isStringOrNumber(children)) {
            utils_1.setTextContent(dom, children);
        } else if (inferno_shared_1.isArray(children)) {
            mountArrayChildren(children, dom, lifecycle, context, isSVG);
        } else if (VNodes_1.isVNode(children)) {
            mount(children, dom, lifecycle, context, isSVG);
        }
    }
    var hasControlledValue = false;
    if (!(flags & 2 /* HtmlElement */)) {
        hasControlledValue = processElement_1.default(flags, vNode, dom, true);
    }
    if (!inferno_shared_1.isNull(props)) {
        for (var prop in props) {
            // do not add a hasOwnProperty check here, it affects performance
            patching_1.patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue);
        }
    }
    if (inferno_shared_1.isNullOrUndef(className)) {
        dom.removeAttribute('class');
    } else {
        if (isSVG) {
            dom.setAttribute('class', className);
        } else {
            dom.className = className;
        }
    }
    if (!inferno_shared_1.isNull(ref)) {
        mountRef(dom, ref, lifecycle);
    }
    if (!inferno_shared_1.isNull(parentDom)) {
        utils_1.appendChild(parentDom, dom);
    }
    return dom;
}
exports.mountElement = mountElement;
function mountArrayChildren(children, dom, lifecycle, context, isSVG) {
    for (var i = 0, len = children.length; i < len; i++) {
        var child = children[i];
        // Verify can string/number be here. might cause de-opt. - Normalization takes care of it.
        if (!inferno_shared_1.isInvalid(child)) {
            if (child.dom) {
                children[i] = child = VNodes_1.directClone(child);
            }
            mount(children[i], dom, lifecycle, context, isSVG);
        }
    }
}
exports.mountArrayChildren = mountArrayChildren;
function mountComponent(vNode, parentDom, lifecycle, context, isSVG, isClass) {
    if (options_1.default.recyclingEnabled) {
        var dom_2 = recycling_1.recycleComponent(vNode, lifecycle, context, isSVG);
        if (!inferno_shared_1.isNull(dom_2)) {
            if (!inferno_shared_1.isNull(parentDom)) {
                utils_1.appendChild(parentDom, dom_2);
            }
            return dom_2;
        }
    }
    var type = vNode.type;
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var ref = vNode.ref;
    var dom;
    if (isClass) {
        var instance = utils_1.createClassComponentInstance(vNode, type, props, context, isSVG, lifecycle);
        var input = instance._lastInput;
        instance._vNode = vNode;
        vNode.dom = dom = mount(input, null, lifecycle, instance._childContext, isSVG);
        if (!inferno_shared_1.isNull(parentDom)) {
            utils_1.appendChild(parentDom, dom);
        }
        mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
        options_1.default.findDOMNodeEnabled && rendering_1.componentToDOMNodeMap.set(instance, dom);
        vNode.children = instance;
    } else {
        var input = utils_1.createFunctionalComponentInput(vNode, type, props, context);
        vNode.dom = dom = mount(input, null, lifecycle, context, isSVG);
        vNode.children = input;
        mountFunctionalComponentCallbacks(ref, dom, lifecycle);
        if (!inferno_shared_1.isNull(parentDom)) {
            utils_1.appendChild(parentDom, dom);
        }
    }
    return dom;
}
exports.mountComponent = mountComponent;
function mountClassComponentCallbacks(vNode, ref, instance, lifecycle) {
    if (ref) {
        if (inferno_shared_1.isFunction(ref)) {
            ref(instance);
        } else {
            if (process.env.NODE_ENV !== 'production') {
                if (inferno_shared_1.isStringOrNumber(ref)) {
                    inferno_shared_1.throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
                } else if (inferno_shared_1.isObject(ref) && vNode.flags & 4 /* ComponentClass */) {
                    inferno_shared_1.throwError('functional component lifecycle events are not supported on ES2015 class components.');
                } else {
                    inferno_shared_1.throwError("a bad value for \"ref\" was used on component: \"" + JSON.stringify(ref) + "\"");
                }
            }
            inferno_shared_1.throwError();
        }
    }
    var cDM = instance.componentDidMount;
    var afterMount = options_1.default.afterMount;
    if (!inferno_shared_1.isUndefined(cDM) || !inferno_shared_1.isNull(afterMount)) {
        lifecycle.addListener(function () {
            afterMount && afterMount(vNode);
            cDM && instance.componentDidMount();
        });
    }
}
exports.mountClassComponentCallbacks = mountClassComponentCallbacks;
function mountFunctionalComponentCallbacks(ref, dom, lifecycle) {
    if (ref) {
        if (!inferno_shared_1.isNullOrUndef(ref.onComponentWillMount)) {
            ref.onComponentWillMount();
        }
        if (!inferno_shared_1.isNullOrUndef(ref.onComponentDidMount)) {
            lifecycle.addListener(function () {
                return ref.onComponentDidMount(dom);
            });
        }
    }
}
exports.mountFunctionalComponentCallbacks = mountFunctionalComponentCallbacks;
function mountRef(dom, value, lifecycle) {
    if (inferno_shared_1.isFunction(value)) {
        lifecycle.addListener(function () {
            return value(dom);
        });
    } else {
        if (inferno_shared_1.isInvalid(value)) {
            return;
        }
        if (process.env.NODE_ENV !== 'production') {
            inferno_shared_1.throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
        }
        inferno_shared_1.throwError();
    }
}
exports.mountRef = mountRef;

}).call(this,require('_process'))
},{"../core/VNodes":24,"../core/options":26,"./patching":15,"./recycling":16,"./rendering":17,"./utils":19,"./wrappers/processElement":23,"_process":3,"inferno-shared":9}],15:[function(require,module,exports){
(function (process){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = require("inferno-shared");
var options_1 = require("../core/options");
var VNodes_1 = require("../core/VNodes");
var constants_1 = require("./constants");
var delegation_1 = require("./events/delegation");
var mounting_1 = require("./mounting");
var utils_1 = require("./utils");
var rendering_1 = require("./rendering");
var unmounting_1 = require("./unmounting");
var processElement_1 = require("./wrappers/processElement");
function patch(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
    if (lastVNode !== nextVNode) {
        var lastFlags = lastVNode.flags;
        var nextFlags = nextVNode.flags;
        if (nextFlags & 28 /* Component */) {
                if (lastFlags & 28 /* Component */) {
                        patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, nextFlags & 4 /* ComponentClass */, isRecycling);
                    } else {
                    utils_1.replaceVNode(parentDom, mounting_1.mountComponent(nextVNode, null, lifecycle, context, isSVG, nextFlags & 4 /* ComponentClass */), lastVNode, lifecycle, isRecycling);
                }
            } else if (nextFlags & 3970 /* Element */) {
                if (lastFlags & 3970 /* Element */) {
                        patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
                    } else {
                    utils_1.replaceVNode(parentDom, mounting_1.mountElement(nextVNode, null, lifecycle, context, isSVG), lastVNode, lifecycle, isRecycling);
                }
            } else if (nextFlags & 1 /* Text */) {
                if (lastFlags & 1 /* Text */) {
                        patchText(lastVNode, nextVNode);
                    } else {
                    utils_1.replaceVNode(parentDom, mounting_1.mountText(nextVNode, null), lastVNode, lifecycle, isRecycling);
                }
            } else if (nextFlags & 4096 /* Void */) {
                if (lastFlags & 4096 /* Void */) {
                        patchVoid(lastVNode, nextVNode);
                    } else {
                    utils_1.replaceVNode(parentDom, mounting_1.mountVoid(nextVNode, null), lastVNode, lifecycle, isRecycling);
                }
            } else {
            // Error case: mount new one replacing old one
            utils_1.replaceLastChildAndUnmount(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
        }
    }
}
exports.patch = patch;
function unmountChildren(children, dom, lifecycle, isRecycling) {
    if (VNodes_1.isVNode(children)) {
        unmounting_1.unmount(children, dom, lifecycle, true, isRecycling);
    } else if (inferno_shared_1.isArray(children)) {
        utils_1.removeAllChildren(dom, children, lifecycle, isRecycling);
    } else {
        dom.textContent = '';
    }
}
function patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
    var nextTag = nextVNode.type;
    var lastTag = lastVNode.type;
    if (lastTag !== nextTag) {
        utils_1.replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
    } else {
        var dom = lastVNode.dom;
        var lastProps = lastVNode.props;
        var nextProps = nextVNode.props;
        var lastChildren = lastVNode.children;
        var nextChildren = nextVNode.children;
        var lastFlags = lastVNode.flags;
        var nextFlags = nextVNode.flags;
        var nextRef = nextVNode.ref;
        var lastClassName = lastVNode.className;
        var nextClassName = nextVNode.className;
        nextVNode.dom = dom;
        if (isSVG || nextFlags & 128 /* SvgElement */) {
            isSVG = true;
        }
        if (lastChildren !== nextChildren) {
            patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
        var hasControlledValue = false;
        if (!(nextFlags & 2 /* HtmlElement */)) {
            hasControlledValue = processElement_1.default(nextFlags, nextVNode, dom, false);
        }
        // inlined patchProps  -- starts --
        if (lastProps !== nextProps) {
            var lastPropsOrEmpty = lastProps || utils_1.EMPTY_OBJ;
            var nextPropsOrEmpty = nextProps || utils_1.EMPTY_OBJ;
            if (nextPropsOrEmpty !== utils_1.EMPTY_OBJ) {
                for (var prop in nextPropsOrEmpty) {
                    // do not add a hasOwnProperty check here, it affects performance
                    var nextValue = nextPropsOrEmpty[prop];
                    var lastValue = lastPropsOrEmpty[prop];
                    patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue);
                }
            }
            if (lastPropsOrEmpty !== utils_1.EMPTY_OBJ) {
                for (var prop in lastPropsOrEmpty) {
                    // do not add a hasOwnProperty check here, it affects performance
                    if (inferno_shared_1.isNullOrUndef(nextPropsOrEmpty[prop])) {
                        removeProp(prop, lastPropsOrEmpty[prop], dom);
                    }
                }
            }
        }
        // inlined patchProps  -- ends --
        if (lastClassName !== nextClassName) {
            if (inferno_shared_1.isNullOrUndef(nextClassName)) {
                dom.removeAttribute('class');
            } else {
                if (isSVG) {
                    dom.setAttribute('class', nextClassName);
                } else {
                    dom.className = nextClassName;
                }
            }
        }
        if (nextRef) {
            if (lastVNode.ref !== nextRef || isRecycling) {
                mounting_1.mountRef(dom, nextRef, lifecycle);
            }
        }
    }
}
exports.patchElement = patchElement;
function patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling) {
    var patchArray = false;
    var patchKeyed = false;
    if (nextFlags & 64 /* HasNonKeyedChildren */) {
            patchArray = true;
        } else if (lastFlags & 32 /* HasKeyedChildren */ && nextFlags & 32 /* HasKeyedChildren */) {
        patchKeyed = true;
        patchArray = true;
    } else if (inferno_shared_1.isInvalid(nextChildren)) {
        unmountChildren(lastChildren, dom, lifecycle, isRecycling);
    } else if (inferno_shared_1.isInvalid(lastChildren)) {
        if (inferno_shared_1.isStringOrNumber(nextChildren)) {
            utils_1.setTextContent(dom, nextChildren);
        } else {
            if (inferno_shared_1.isArray(nextChildren)) {
                mounting_1.mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
            } else {
                mounting_1.mount(nextChildren, dom, lifecycle, context, isSVG);
            }
        }
    } else if (inferno_shared_1.isStringOrNumber(nextChildren)) {
        if (inferno_shared_1.isStringOrNumber(lastChildren)) {
            utils_1.updateTextContent(dom, nextChildren);
        } else {
            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
            utils_1.setTextContent(dom, nextChildren);
        }
    } else if (inferno_shared_1.isArray(nextChildren)) {
        if (inferno_shared_1.isArray(lastChildren)) {
            patchArray = true;
            if (utils_1.isKeyed(lastChildren, nextChildren)) {
                patchKeyed = true;
            }
        } else {
            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
            mounting_1.mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
        }
    } else if (inferno_shared_1.isArray(lastChildren)) {
        utils_1.removeAllChildren(dom, lastChildren, lifecycle, isRecycling);
        mounting_1.mount(nextChildren, dom, lifecycle, context, isSVG);
    } else if (VNodes_1.isVNode(nextChildren)) {
        if (VNodes_1.isVNode(lastChildren)) {
            patch(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        } else {
            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
            mounting_1.mount(nextChildren, dom, lifecycle, context, isSVG);
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
        utils_1.replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
        return false;
    } else {
        var nextProps = nextVNode.props || utils_1.EMPTY_OBJ;
        if (isClass) {
            var instance = lastVNode.children;
            if (instance._unmounted) {
                if (inferno_shared_1.isNull(parentDom)) {
                    return true;
                }
                utils_1.replaceChild(parentDom, mounting_1.mountComponent(nextVNode, null, lifecycle, context, isSVG, nextVNode.flags & 4 /* ComponentClass */), lastVNode.dom);
            } else {
                var lastState = instance.state;
                var nextState = instance.state;
                var lastProps = instance.props;
                var childContext = void 0;
                if (!inferno_shared_1.isUndefined(instance.getChildContext)) {
                    childContext = instance.getChildContext();
                }
                nextVNode.children = instance;
                instance._isSVG = isSVG;
                if (inferno_shared_1.isNullOrUndef(childContext)) {
                    childContext = context;
                } else {
                    childContext = inferno_shared_1.combineFrom(context, childContext);
                }
                var lastInput = instance._lastInput;
                var nextInput = instance._updateComponent(lastState, nextState, lastProps, nextProps, context, false, false);
                var didUpdate = true;
                instance._childContext = childContext;
                if (inferno_shared_1.isInvalid(nextInput)) {
                    nextInput = VNodes_1.createVoidVNode();
                } else if (nextInput === inferno_shared_1.NO_OP) {
                    nextInput = lastInput;
                    didUpdate = false;
                } else if (inferno_shared_1.isStringOrNumber(nextInput)) {
                    nextInput = VNodes_1.createTextVNode(nextInput, null);
                } else if (inferno_shared_1.isArray(nextInput)) {
                    if (process.env.NODE_ENV !== 'production') {
                        inferno_shared_1.throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
                    }
                    inferno_shared_1.throwError();
                } else if (inferno_shared_1.isObject(nextInput) && nextInput.dom) {
                    nextInput = VNodes_1.directClone(nextInput);
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
                    if (!inferno_shared_1.isUndefined(instance.componentDidUpdate)) {
                        instance.componentDidUpdate(lastProps, lastState);
                    }
                    options_1.default.afterUpdate && options_1.default.afterUpdate(nextVNode);
                    options_1.default.findDOMNodeEnabled && rendering_1.componentToDOMNodeMap.set(instance, nextInput.dom);
                }
                nextVNode.dom = nextInput.dom;
            }
        } else {
            var shouldUpdate = true;
            var lastProps = lastVNode.props;
            var nextHooks = nextVNode.ref;
            var nextHooksDefined = !inferno_shared_1.isNullOrUndef(nextHooks);
            var lastInput = lastVNode.children;
            var nextInput = lastInput;
            nextVNode.dom = lastVNode.dom;
            nextVNode.children = lastInput;
            if (lastKey !== nextKey) {
                shouldUpdate = true;
            } else {
                if (nextHooksDefined && !inferno_shared_1.isNullOrUndef(nextHooks.onComponentShouldUpdate)) {
                    shouldUpdate = nextHooks.onComponentShouldUpdate(lastProps, nextProps);
                }
            }
            if (shouldUpdate !== false) {
                if (nextHooksDefined && !inferno_shared_1.isNullOrUndef(nextHooks.onComponentWillUpdate)) {
                    nextHooks.onComponentWillUpdate(lastProps, nextProps);
                }
                nextInput = nextType(nextProps, context);
                if (inferno_shared_1.isInvalid(nextInput)) {
                    nextInput = VNodes_1.createVoidVNode();
                } else if (inferno_shared_1.isStringOrNumber(nextInput) && nextInput !== inferno_shared_1.NO_OP) {
                    nextInput = VNodes_1.createTextVNode(nextInput, null);
                } else if (inferno_shared_1.isArray(nextInput)) {
                    if (process.env.NODE_ENV !== 'production') {
                        inferno_shared_1.throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
                    }
                    inferno_shared_1.throwError();
                } else if (inferno_shared_1.isObject(nextInput) && nextInput.dom) {
                    nextInput = VNodes_1.directClone(nextInput);
                }
                if (nextInput !== inferno_shared_1.NO_OP) {
                    patch(lastInput, nextInput, parentDom, lifecycle, context, isSVG, isRecycling);
                    nextVNode.children = nextInput;
                    if (nextHooksDefined && !inferno_shared_1.isNullOrUndef(nextHooks.onComponentDidUpdate)) {
                        nextHooks.onComponentDidUpdate(lastProps, nextProps);
                    }
                    nextVNode.dom = nextInput.dom;
                }
            }
            if (nextInput.flags & 28 /* Component */) {
                    nextInput.parentVNode = nextVNode;
                } else if (lastInput.flags & 28 /* Component */) {
                    lastInput.parentVNode = nextVNode;
                }
        }
    }
    return false;
}
exports.patchComponent = patchComponent;
function patchText(lastVNode, nextVNode) {
    var nextText = nextVNode.children;
    var dom = lastVNode.dom;
    nextVNode.dom = dom;
    if (lastVNode.children !== nextText) {
        dom.nodeValue = nextText;
    }
}
exports.patchText = patchText;
function patchVoid(lastVNode, nextVNode) {
    nextVNode.dom = lastVNode.dom;
}
exports.patchVoid = patchVoid;
function patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling) {
    var lastChildrenLength = lastChildren.length;
    var nextChildrenLength = nextChildren.length;
    var commonLength = lastChildrenLength > nextChildrenLength ? nextChildrenLength : lastChildrenLength;
    var i = 0;
    for (; i < commonLength; i++) {
        var nextChild = nextChildren[i];
        if (nextChild.dom) {
            nextChild = nextChildren[i] = VNodes_1.directClone(nextChild);
        }
        patch(lastChildren[i], nextChild, dom, lifecycle, context, isSVG, isRecycling);
    }
    if (lastChildrenLength < nextChildrenLength) {
        for (i = commonLength; i < nextChildrenLength; i++) {
            var nextChild = nextChildren[i];
            if (nextChild.dom) {
                nextChild = nextChildren[i] = VNodes_1.directClone(nextChild);
            }
            utils_1.appendChild(dom, mounting_1.mount(nextChild, null, lifecycle, context, isSVG));
        }
    } else if (nextChildrenLength === 0) {
        utils_1.removeAllChildren(dom, lastChildren, lifecycle, isRecycling);
    } else if (lastChildrenLength > nextChildrenLength) {
        for (i = commonLength; i < lastChildrenLength; i++) {
            unmounting_1.unmount(lastChildren[i], dom, lifecycle, false, isRecycling);
        }
    }
}
exports.patchNonKeyedChildren = patchNonKeyedChildren;
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
            mounting_1.mountArrayChildren(b, dom, lifecycle, context, isSVG);
        }
        return;
    } else if (bLength === 0) {
        utils_1.removeAllChildren(dom, a, lifecycle, isRecycling);
        return;
    }
    var aStartNode = a[aStart];
    var bStartNode = b[bStart];
    var aEndNode = a[aEnd];
    var bEndNode = b[bEnd];
    if (bStartNode.dom) {
        b[bStart] = bStartNode = VNodes_1.directClone(bStartNode);
    }
    if (bEndNode.dom) {
        b[bEnd] = bEndNode = VNodes_1.directClone(bEndNode);
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
                b[bStart] = bStartNode = VNodes_1.directClone(bStartNode);
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
                b[bEnd] = bEndNode = VNodes_1.directClone(bEndNode);
            }
        }
        // Move and sync nodes from right to left.
        if (aEndNode.key === bStartNode.key) {
            patch(aEndNode, bStartNode, dom, lifecycle, context, isSVG, isRecycling);
            utils_1.insertOrAppend(dom, bStartNode.dom, aStartNode.dom);
            aEnd--;
            bStart++;
            aEndNode = a[aEnd];
            bStartNode = b[bStart];
            if (bStartNode.dom) {
                b[bStart] = bStartNode = VNodes_1.directClone(bStartNode);
            }
            continue;
        }
        // Move and sync nodes from left to right.
        if (aStartNode.key === bEndNode.key) {
            patch(aStartNode, bEndNode, dom, lifecycle, context, isSVG, isRecycling);
            nextPos = bEnd + 1;
            nextNode = nextPos < b.length ? b[nextPos].dom : null;
            utils_1.insertOrAppend(dom, bEndNode.dom, nextNode);
            aStart++;
            bEnd--;
            aStartNode = a[aStart];
            bEndNode = b[bEnd];
            if (bEndNode.dom) {
                b[bEnd] = bEndNode = VNodes_1.directClone(bEndNode);
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
                    b[bStart] = node = VNodes_1.directClone(node);
                }
                bStart++;
                utils_1.insertOrAppend(dom, mounting_1.mount(node, null, lifecycle, context, isSVG), nextNode);
            }
        }
    } else if (bStart > bEnd) {
        while (aStart <= aEnd) {
            unmounting_1.unmount(a[aStart++], dom, lifecycle, false, isRecycling);
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
                                b[j] = bNode = VNodes_1.directClone(bNode);
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
                    if (!inferno_shared_1.isUndefined(j)) {
                        bNode = b[j];
                        sources[j - bStart] = i;
                        if (pos > j) {
                            moved = true;
                        } else {
                            pos = j;
                        }
                        if (bNode.dom) {
                            b[j] = bNode = VNodes_1.directClone(bNode);
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
            utils_1.removeAllChildren(dom, a, lifecycle, isRecycling);
            while (bStart < bLength) {
                node = b[bStart];
                if (node.dom) {
                    b[bStart] = node = VNodes_1.directClone(node);
                }
                bStart++;
                utils_1.insertOrAppend(dom, mounting_1.mount(node, null, lifecycle, context, isSVG), null);
            }
        } else {
            i = aLength - patched;
            while (i > 0) {
                aNode = a[aStart++];
                if (!inferno_shared_1.isNull(aNode)) {
                    unmounting_1.unmount(aNode, dom, lifecycle, true, isRecycling);
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
                            b[pos] = node = VNodes_1.directClone(node);
                        }
                        nextPos = pos + 1;
                        nextNode = nextPos < b.length ? b[nextPos].dom : null;
                        utils_1.insertOrAppend(dom, mounting_1.mount(node, dom, lifecycle, context, isSVG), nextNode);
                    } else {
                        if (j < 0 || i !== seq[j]) {
                            pos = i + bStart;
                            node = b[pos];
                            nextPos = pos + 1;
                            nextNode = nextPos < b.length ? b[nextPos].dom : null;
                            utils_1.insertOrAppend(dom, node.dom, nextNode);
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
                            b[pos] = node = VNodes_1.directClone(node);
                        }
                        nextPos = pos + 1;
                        nextNode = nextPos < b.length ? b[nextPos].dom : null;
                        utils_1.insertOrAppend(dom, mounting_1.mount(node, null, lifecycle, context, isSVG), nextNode);
                    }
                }
            }
        }
    }
}
exports.patchKeyedChildren = patchKeyedChildren;
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
function isAttrAnEvent(attr) {
    return attr[0] === 'o' && attr[1] === 'n';
}
exports.isAttrAnEvent = isAttrAnEvent;
function patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue) {
    if (prop in constants_1.skipProps || hasControlledValue && prop === 'value') {
        return;
    } else if (prop in constants_1.booleanProps) {
        prop = prop === 'autoFocus' ? prop.toLowerCase() : prop;
        dom[prop] = !!nextValue;
    } else if (prop in constants_1.strictProps) {
        var value = inferno_shared_1.isNullOrUndef(nextValue) ? '' : nextValue;
        if (dom[prop] !== value) {
            dom[prop] = value;
        }
    } else if (lastValue !== nextValue) {
        if (isAttrAnEvent(prop)) {
            patchEvent(prop, lastValue, nextValue, dom);
        } else if (inferno_shared_1.isNullOrUndef(nextValue)) {
            dom.removeAttribute(prop);
        } else if (prop === 'style') {
            patchStyle(lastValue, nextValue, dom);
        } else if (prop === 'dangerouslySetInnerHTML') {
            var lastHtml = lastValue && lastValue.__html;
            var nextHtml = nextValue && nextValue.__html;
            if (lastHtml !== nextHtml) {
                if (!inferno_shared_1.isNullOrUndef(nextHtml)) {
                    dom.innerHTML = nextHtml;
                }
            }
        } else {
            var ns = isSVG ? constants_1.namespaces[prop] : false;
            if (ns) {
                dom.setAttributeNS(ns, prop, nextValue);
            } else {
                dom.setAttribute(prop, nextValue);
            }
        }
    }
}
exports.patchProp = patchProp;
function patchEvent(name, lastValue, nextValue, dom) {
    if (lastValue !== nextValue) {
        if (name in constants_1.delegatedEvents) {
            delegation_1.handleEvent(name, lastValue, nextValue, dom);
        } else {
            var nameLowerCase = name.toLowerCase();
            var domEvent = dom[nameLowerCase];
            // if the function is wrapped, that means it's been controlled by a wrapper
            if (domEvent && domEvent.wrapped) {
                return;
            }
            if (!inferno_shared_1.isFunction(nextValue) && !inferno_shared_1.isNullOrUndef(nextValue)) {
                var linkEvent_1 = nextValue.event;
                if (linkEvent_1 && inferno_shared_1.isFunction(linkEvent_1)) {
                    if (!dom._data) {
                        dom[nameLowerCase] = function (e) {
                            linkEvent_1(e.currentTarget._data, e);
                        };
                    }
                    dom._data = nextValue.data;
                } else {
                    if (process.env.NODE_ENV !== 'production') {
                        inferno_shared_1.throwError("an event on a VNode \"" + name + "\". was not a function or a valid linkEvent.");
                    }
                    inferno_shared_1.throwError();
                }
            } else {
                dom[nameLowerCase] = nextValue;
            }
        }
    }
}
exports.patchEvent = patchEvent;
// We are assuming here that we come from patchProp routine
// -nextAttrValue cannot be null or undefined
function patchStyle(lastAttrValue, nextAttrValue, dom) {
    var domStyle = dom.style;
    if (inferno_shared_1.isString(nextAttrValue)) {
        domStyle.cssText = nextAttrValue;
        return;
    }
    for (var style in nextAttrValue) {
        // do not add a hasOwnProperty check here, it affects performance
        var value = nextAttrValue[style];
        if (!inferno_shared_1.isNumber(value) || style in constants_1.isUnitlessNumber) {
            domStyle[style] = value;
        } else {
            domStyle[style] = value + 'px';
        }
    }
    if (!inferno_shared_1.isNullOrUndef(lastAttrValue)) {
        for (var style in lastAttrValue) {
            if (inferno_shared_1.isNullOrUndef(nextAttrValue[style])) {
                domStyle[style] = '';
            }
        }
    }
}
exports.patchStyle = patchStyle;
function removeProp(prop, lastValue, dom) {
    if (prop === 'value') {
        dom.value = '';
    } else if (prop === 'style') {
        dom.removeAttribute('style');
    } else if (isAttrAnEvent(prop)) {
        delegation_1.handleEvent(name, lastValue, null, dom);
    } else {
        dom.removeAttribute(prop);
    }
}

}).call(this,require('_process'))
},{"../core/VNodes":24,"../core/options":26,"./constants":10,"./events/delegation":11,"./mounting":14,"./rendering":17,"./unmounting":18,"./utils":19,"./wrappers/processElement":23,"_process":3,"inferno-shared":9}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = require("inferno-shared");
var patching_1 = require("./patching");
var componentPools = new Map();
var elementPools = new Map();
function recycleElement(vNode, lifecycle, context, isSVG) {
    var tag = vNode.type;
    var pools = elementPools.get(tag);
    if (!inferno_shared_1.isUndefined(pools)) {
        var key = vNode.key;
        var pool = key === null ? pools.nonKeyed : pools.keyed.get(key);
        if (!inferno_shared_1.isUndefined(pool)) {
            var recycledVNode = pool.pop();
            if (!inferno_shared_1.isUndefined(recycledVNode)) {
                patching_1.patchElement(recycledVNode, vNode, null, lifecycle, context, isSVG, true);
                return vNode.dom;
            }
        }
    }
    return null;
}
exports.recycleElement = recycleElement;
function poolElement(vNode) {
    var tag = vNode.type;
    var key = vNode.key;
    var pools = elementPools.get(tag);
    if (inferno_shared_1.isUndefined(pools)) {
        pools = {
            nonKeyed: [],
            keyed: new Map()
        };
        elementPools.set(tag, pools);
    }
    if (inferno_shared_1.isNull(key)) {
        pools.nonKeyed.push(vNode);
    } else {
        var pool = pools.keyed.get(key);
        if (inferno_shared_1.isUndefined(pool)) {
            pool = [];
            pools.keyed.set(key, pool);
        }
        pool.push(vNode);
    }
}
exports.poolElement = poolElement;
function recycleComponent(vNode, lifecycle, context, isSVG) {
    var type = vNode.type;
    var pools = componentPools.get(type);
    if (!inferno_shared_1.isUndefined(pools)) {
        var key = vNode.key;
        var pool = key === null ? pools.nonKeyed : pools.keyed.get(key);
        if (!inferno_shared_1.isUndefined(pool)) {
            var recycledVNode = pool.pop();
            if (!inferno_shared_1.isUndefined(recycledVNode)) {
                var flags = vNode.flags;
                var failed = patching_1.patchComponent(recycledVNode, vNode, null, lifecycle, context, isSVG, flags & 4 /* ComponentClass */, true);
                if (!failed) {
                    return vNode.dom;
                }
            }
        }
    }
    return null;
}
exports.recycleComponent = recycleComponent;
function poolComponent(vNode) {
    var hooks = vNode.ref;
    var nonRecycleHooks = hooks && (hooks.onComponentWillMount || hooks.onComponentWillUnmount || hooks.onComponentDidMount || hooks.onComponentWillUpdate || hooks.onComponentDidUpdate);
    if (nonRecycleHooks) {
        return;
    }
    var type = vNode.type;
    var key = vNode.key;
    var pools = componentPools.get(type);
    if (inferno_shared_1.isUndefined(pools)) {
        pools = {
            nonKeyed: [],
            keyed: new Map()
        };
        componentPools.set(type, pools);
    }
    if (inferno_shared_1.isNull(key)) {
        pools.nonKeyed.push(vNode);
    } else {
        var pool = pools.keyed.get(key);
        if (inferno_shared_1.isUndefined(pool)) {
            pool = [];
            pools.keyed.set(key, pool);
        }
        pool.push(vNode);
    }
}
exports.poolComponent = poolComponent;

},{"./patching":15,"inferno-shared":9}],17:[function(require,module,exports){
(function (process){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = require("inferno-shared");
var options_1 = require("../core/options");
var VNodes_1 = require("../core/VNodes");
var hydration_1 = require("./hydration");
var mounting_1 = require("./mounting");
var patching_1 = require("./patching");
var unmounting_1 = require("./unmounting");
var utils_1 = require("./utils");
// rather than use a Map, like we did before, we can use an array here
// given there shouldn't be THAT many roots on the page, the difference
// in performance is huge: https://esbench.com/bench/5802a691330ab09900a1a2da
exports.roots = [];
exports.componentToDOMNodeMap = new Map();
options_1.default.roots = exports.roots;
function findDOMNode(ref) {
    if (!options_1.default.findDOMNodeEnabled) {
        if (process.env.NODE_ENV !== 'production') {
            inferno_shared_1.throwError('findDOMNode() has been disabled, use Inferno.options.findDOMNodeEnabled = true; enabled findDOMNode(). Warning this can significantly impact performance!');
        }
        inferno_shared_1.throwError();
    }
    var dom = ref && ref.nodeType ? ref : null;
    return exports.componentToDOMNodeMap.get(ref) || dom;
}
exports.findDOMNode = findDOMNode;
function getRoot(dom) {
    for (var i = 0, len = exports.roots.length; i < len; i++) {
        var root = exports.roots[i];
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
    exports.roots.push(root);
    return root;
}
function removeRoot(root) {
    for (var i = 0, len = exports.roots.length; i < len; i++) {
        if (exports.roots[i] === root) {
            exports.roots.splice(i, 1);
            return;
        }
    }
}
if (process.env.NODE_ENV !== 'production') {
    if (inferno_shared_1.isBrowser && document.body === null) {
        inferno_shared_1.warning('Inferno warning: you cannot initialize inferno without "document.body". Wait on "DOMContentLoaded" event, add script to bottom of body, or use async/defer attributes on script tag.');
    }
}
var documentBody = inferno_shared_1.isBrowser ? document.body : null;
function render(input, parentDom) {
    if (documentBody === parentDom) {
        if (process.env.NODE_ENV !== 'production') {
            inferno_shared_1.throwError('you cannot render() to the "document.body". Use an empty element as a container instead.');
        }
        inferno_shared_1.throwError();
    }
    if (input === inferno_shared_1.NO_OP) {
        return;
    }
    var root = getRoot(parentDom);
    if (inferno_shared_1.isNull(root)) {
        var lifecycle = new inferno_shared_1.Lifecycle();
        if (!inferno_shared_1.isInvalid(input)) {
            if (input.dom) {
                input = VNodes_1.directClone(input);
            }
            if (!hydration_1.default(input, parentDom, lifecycle)) {
                mounting_1.mount(input, parentDom, lifecycle, utils_1.EMPTY_OBJ, false);
            }
            root = setRoot(parentDom, input, lifecycle);
            lifecycle.trigger();
        }
    } else {
        var lifecycle = root.lifecycle;
        lifecycle.listeners = [];
        if (inferno_shared_1.isNullOrUndef(input)) {
            unmounting_1.unmount(root.input, parentDom, lifecycle, false, false);
            removeRoot(root);
        } else {
            if (input.dom) {
                input = VNodes_1.directClone(input);
            }
            patching_1.patch(root.input, input, parentDom, lifecycle, utils_1.EMPTY_OBJ, false, false);
        }
        lifecycle.trigger();
        root.input = input;
    }
    if (root) {
        var rootInput = root.input;
        if (rootInput && rootInput.flags & 28 /* Component */) {
            return rootInput.children;
        }
    }
}
exports.render = render;
function createRenderer(parentDom) {
    return function renderer(lastInput, nextInput) {
        if (!parentDom) {
            parentDom = lastInput;
        }
        render(nextInput, parentDom);
    };
}
exports.createRenderer = createRenderer;

}).call(this,require('_process'))
},{"../core/VNodes":24,"../core/options":26,"./hydration":13,"./mounting":14,"./patching":15,"./unmounting":18,"./utils":19,"_process":3,"inferno-shared":9}],18:[function(require,module,exports){
(function (process){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = require("inferno-shared");
var options_1 = require("../core/options");
var patching_1 = require("./patching");
var recycling_1 = require("./recycling");
var rendering_1 = require("./rendering");
var utils_1 = require("./utils");
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
exports.unmount = unmount;
function unmountVoidOrText(vNode, parentDom) {
    if (parentDom) {
        utils_1.removeChild(parentDom, vNode.dom);
    }
}
function unmountComponent(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
    var instance = vNode.children;
    var flags = vNode.flags;
    var isStatefulComponent = flags & 4 /* ComponentClass */;
    var ref = vNode.ref;
    var dom = vNode.dom;
    if (!isRecycling) {
        if (isStatefulComponent) {
            if (!instance._unmounted) {
                instance._blockSetState = true;
                options_1.default.beforeUnmount && options_1.default.beforeUnmount(vNode);
                instance.componentWillUnmount && instance.componentWillUnmount();
                if (ref && !isRecycling) {
                    ref(null);
                }
                instance._unmounted = true;
                options_1.default.findDOMNodeEnabled && rendering_1.componentToDOMNodeMap.delete(instance);
                unmount(instance._lastInput, null, instance._lifecycle, false, isRecycling);
            }
        } else {
            if (!inferno_shared_1.isNullOrUndef(ref)) {
                if (!inferno_shared_1.isNullOrUndef(ref.onComponentWillUnmount)) {
                    ref.onComponentWillUnmount(dom);
                }
            }
            unmount(instance, null, lifecycle, false, isRecycling);
        }
    }
    if (parentDom) {
        var lastInput = instance._lastInput;
        if (inferno_shared_1.isNullOrUndef(lastInput)) {
            lastInput = instance;
        }
        utils_1.removeChild(parentDom, dom);
    }
    if (options_1.default.recyclingEnabled && !isStatefulComponent && (parentDom || canRecycle)) {
        recycling_1.poolComponent(vNode);
    }
}
exports.unmountComponent = unmountComponent;
function unmountElement(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
    var dom = vNode.dom;
    var ref = vNode.ref;
    var props = vNode.props;
    if (ref && !isRecycling) {
        unmountRef(ref);
    }
    var children = vNode.children;
    if (!inferno_shared_1.isNullOrUndef(children)) {
        unmountChildren(children, lifecycle, isRecycling);
    }
    if (!inferno_shared_1.isNull(props)) {
        for (var name_1 in props) {
            // do not add a hasOwnProperty check here, it affects performance
            if (props[name_1] !== null && patching_1.isAttrAnEvent(name_1)) {
                patching_1.patchEvent(name_1, props[name_1], null, dom);
                // We need to set this null, because same props otherwise come back if SCU returns false and we are recyling
                props[name_1] = null;
            }
        }
    }
    if (parentDom) {
        utils_1.removeChild(parentDom, dom);
    }
    if (options_1.default.recyclingEnabled && (parentDom || canRecycle)) {
        recycling_1.poolElement(vNode);
    }
}
exports.unmountElement = unmountElement;
function unmountChildren(children, lifecycle, isRecycling) {
    if (inferno_shared_1.isArray(children)) {
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            if (!inferno_shared_1.isInvalid(child) && inferno_shared_1.isObject(child)) {
                unmount(child, null, lifecycle, false, isRecycling);
            }
        }
    } else if (inferno_shared_1.isObject(children)) {
        unmount(children, null, lifecycle, false, isRecycling);
    }
}
function unmountRef(ref) {
    if (inferno_shared_1.isFunction(ref)) {
        ref(null);
    } else {
        if (inferno_shared_1.isInvalid(ref)) {
            return;
        }
        if (process.env.NODE_ENV !== 'production') {
            inferno_shared_1.throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
        }
        inferno_shared_1.throwError();
    }
}

}).call(this,require('_process'))
},{"../core/options":26,"./patching":15,"./recycling":16,"./rendering":17,"./utils":19,"_process":3,"inferno-shared":9}],19:[function(require,module,exports){
(function (process){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = require("inferno-shared");
var options_1 = require("../core/options");
var VNodes_1 = require("../core/VNodes");
var constants_1 = require("./constants");
var mounting_1 = require("./mounting");
var patching_1 = require("./patching");
var rendering_1 = require("./rendering");
var unmounting_1 = require("./unmounting");
// We need EMPTY_OBJ defined in one place.
// Its used for comparison so we cant inline it into shared
exports.EMPTY_OBJ = {};
if (process.env.NODE_ENV !== 'production') {
    Object.freeze(exports.EMPTY_OBJ);
}
function createClassComponentInstance(vNode, Component, props, context, isSVG, lifecycle) {
    if (inferno_shared_1.isUndefined(context)) {
        context = exports.EMPTY_OBJ; // Context should not be mutable
    }
    var instance = new Component(props, context);
    instance.context = context;
    if (instance.props === exports.EMPTY_OBJ) {
        instance.props = props;
    }
    instance._patch = patching_1.patch;
    if (options_1.default.findDOMNodeEnabled) {
        instance._componentToDOMNodeMap = rendering_1.componentToDOMNodeMap;
    }
    // setState callbacks must fire after render is done when called from componentWillReceiveProps or componentWillMount
    instance._lifecycle = lifecycle;
    instance._unmounted = false;
    instance._pendingSetState = true;
    instance._isSVG = isSVG;
    if (!inferno_shared_1.isUndefined(instance.componentWillMount)) {
        instance._blockRender = true;
        instance.componentWillMount();
        instance._blockRender = false;
    }
    var childContext;
    if (!inferno_shared_1.isUndefined(instance.getChildContext)) {
        childContext = instance.getChildContext();
    }
    if (inferno_shared_1.isNullOrUndef(childContext)) {
        instance._childContext = context;
    } else {
        instance._childContext = inferno_shared_1.combineFrom(context, childContext);
    }
    options_1.default.beforeRender && options_1.default.beforeRender(instance);
    var input = instance.render(props, instance.state, context);
    options_1.default.afterRender && options_1.default.afterRender(instance);
    if (inferno_shared_1.isArray(input)) {
        if (process.env.NODE_ENV !== 'production') {
            inferno_shared_1.throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
        }
        inferno_shared_1.throwError();
    } else if (inferno_shared_1.isInvalid(input)) {
        input = VNodes_1.createVoidVNode();
    } else if (inferno_shared_1.isStringOrNumber(input)) {
        input = VNodes_1.createTextVNode(input, null);
    } else {
        if (input.dom) {
            input = VNodes_1.directClone(input);
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
exports.createClassComponentInstance = createClassComponentInstance;
function replaceLastChildAndUnmount(lastInput, nextInput, parentDom, lifecycle, context, isSVG, isRecycling) {
    replaceVNode(parentDom, mounting_1.mount(nextInput, null, lifecycle, context, isSVG), lastInput, lifecycle, isRecycling);
}
exports.replaceLastChildAndUnmount = replaceLastChildAndUnmount;
function replaceVNode(parentDom, dom, vNode, lifecycle, isRecycling) {
    unmounting_1.unmount(vNode, null, lifecycle, false, isRecycling);
    replaceChild(parentDom, dom, vNode.dom);
}
exports.replaceVNode = replaceVNode;
function createFunctionalComponentInput(vNode, component, props, context) {
    var input = component(props, context);
    if (inferno_shared_1.isArray(input)) {
        if (process.env.NODE_ENV !== 'production') {
            inferno_shared_1.throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
        }
        inferno_shared_1.throwError();
    } else if (inferno_shared_1.isInvalid(input)) {
        input = VNodes_1.createVoidVNode();
    } else if (inferno_shared_1.isStringOrNumber(input)) {
        input = VNodes_1.createTextVNode(input, null);
    } else {
        if (input.dom) {
            input = VNodes_1.directClone(input);
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
exports.createFunctionalComponentInput = createFunctionalComponentInput;
function setTextContent(dom, text) {
    if (text !== '') {
        dom.textContent = text;
    } else {
        dom.appendChild(document.createTextNode(''));
    }
}
exports.setTextContent = setTextContent;
function updateTextContent(dom, text) {
    dom.firstChild.nodeValue = text;
}
exports.updateTextContent = updateTextContent;
function appendChild(parentDom, dom) {
    parentDom.appendChild(dom);
}
exports.appendChild = appendChild;
function insertOrAppend(parentDom, newNode, nextNode) {
    if (inferno_shared_1.isNullOrUndef(nextNode)) {
        appendChild(parentDom, newNode);
    } else {
        parentDom.insertBefore(newNode, nextNode);
    }
}
exports.insertOrAppend = insertOrAppend;
function documentCreateElement(tag, isSVG) {
    if (isSVG === true) {
        return document.createElementNS(constants_1.svgNS, tag);
    } else {
        return document.createElement(tag);
    }
}
exports.documentCreateElement = documentCreateElement;
function replaceWithNewNode(lastNode, nextNode, parentDom, lifecycle, context, isSVG, isRecycling) {
    unmounting_1.unmount(lastNode, null, lifecycle, false, isRecycling);
    var dom = mounting_1.mount(nextNode, null, lifecycle, context, isSVG);
    nextNode.dom = dom;
    replaceChild(parentDom, dom, lastNode.dom);
}
exports.replaceWithNewNode = replaceWithNewNode;
function replaceChild(parentDom, nextDom, lastDom) {
    if (!parentDom) {
        parentDom = lastDom.parentNode;
    }
    parentDom.replaceChild(nextDom, lastDom);
}
exports.replaceChild = replaceChild;
function removeChild(parentDom, dom) {
    parentDom.removeChild(dom);
}
exports.removeChild = removeChild;
function removeAllChildren(dom, children, lifecycle, isRecycling) {
    dom.textContent = '';
    if (!options_1.default.recyclingEnabled || options_1.default.recyclingEnabled && !isRecycling) {
        removeChildren(null, children, lifecycle, isRecycling);
    }
}
exports.removeAllChildren = removeAllChildren;
function removeChildren(dom, children, lifecycle, isRecycling) {
    for (var i = 0, len = children.length; i < len; i++) {
        var child = children[i];
        if (!inferno_shared_1.isInvalid(child)) {
            unmounting_1.unmount(child, dom, lifecycle, true, isRecycling);
        }
    }
}
exports.removeChildren = removeChildren;
function isKeyed(lastChildren, nextChildren) {
    return nextChildren.length && !inferno_shared_1.isNullOrUndef(nextChildren[0]) && !inferno_shared_1.isNullOrUndef(nextChildren[0].key) && lastChildren.length && !inferno_shared_1.isNullOrUndef(lastChildren[0]) && !inferno_shared_1.isNullOrUndef(lastChildren[0].key);
}
exports.isKeyed = isKeyed;

}).call(this,require('_process'))
},{"../core/VNodes":24,"../core/options":26,"./constants":10,"./mounting":14,"./patching":15,"./rendering":17,"./unmounting":18,"_process":3,"inferno-shared":9}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = require("inferno-shared");
var utils_1 = require("../utils");
function isCheckedType(type) {
    return type === 'checkbox' || type === 'radio';
}
function isControlled(props) {
    var usesChecked = isCheckedType(props.type);
    return usesChecked ? !inferno_shared_1.isNullOrUndef(props.checked) : !inferno_shared_1.isNullOrUndef(props.value);
}
function onTextInputChange(e) {
    var vNode = this;
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var dom = vNode.dom;
    var previousValue = props.value;
    if (props.onInput) {
        var event_1 = props.onInput;
        if (event_1.event) {
            event_1.event(event_1.data, e);
        } else {
            event_1(e);
        }
    } else if (props.oninput) {
        props.oninput(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this;
    var newProps = newVNode.props || utils_1.EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue(newVNode, dom);
    }
}
function wrappedOnChange(e) {
    var props = this.props || utils_1.EMPTY_OBJ;
    var event = props.onChange;
    if (event.event) {
        event.event(event.data, e);
    } else {
        event(e);
    }
}
function onCheckboxChange(e) {
    e.stopPropagation(); // This click should not propagate its for internal use
    var vNode = this;
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var dom = vNode.dom;
    var previousValue = props.value;
    if (props.onClick) {
        var event_2 = props.onClick;
        if (event_2.event) {
            event_2.event(event_2.data, e);
        } else {
            event_2(e);
        }
    } else if (props.onclick) {
        props.onclick(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this;
    var newProps = newVNode.props || utils_1.EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue(newVNode, dom);
    }
}
function processInput(vNode, dom, mounting) {
    var props = vNode.props || utils_1.EMPTY_OBJ;
    applyValue(vNode, dom);
    if (isControlled(props)) {
        if (mounting) {
            if (isCheckedType(props.type)) {
                dom.onclick = onCheckboxChange.bind(vNode);
                dom.onclick.wrapped = true;
            } else {
                dom.oninput = onTextInputChange.bind(vNode);
                dom.oninput.wrapped = true;
            }
            if (props.onChange) {
                dom.onchange = wrappedOnChange.bind(vNode);
                dom.onchange.wrapped = true;
            }
        }
        return true;
    }
    return false;
}
exports.processInput = processInput;
function applyValue(vNode, dom) {
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var type = props.type;
    var value = props.value;
    var checked = props.checked;
    var multiple = props.multiple;
    var defaultValue = props.defaultValue;
    var hasValue = !inferno_shared_1.isNullOrUndef(value);
    if (type && type !== dom.type) {
        dom.setAttribute('type', type);
    }
    if (multiple && multiple !== dom.multiple) {
        dom.multiple = multiple;
    }
    if (!inferno_shared_1.isNullOrUndef(defaultValue) && !hasValue) {
        dom.defaultValue = defaultValue + '';
    }
    if (isCheckedType(type)) {
        if (hasValue) {
            dom.value = value;
        }
        if (!inferno_shared_1.isNullOrUndef(checked)) {
            dom.checked = checked;
        }
    } else {
        if (hasValue && dom.value !== value) {
            dom.value = value;
        } else if (!inferno_shared_1.isNullOrUndef(checked)) {
            dom.checked = checked;
        }
    }
}
exports.applyValue = applyValue;

},{"../utils":19,"inferno-shared":9}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = require("inferno-shared");
var VNodes_1 = require("../../core/VNodes");
var utils_1 = require("../utils");
function isControlled(props) {
    return !inferno_shared_1.isNullOrUndef(props.value);
}
function updateChildOptionGroup(vNode, value) {
    var type = vNode.type;
    if (type === 'optgroup') {
        var children = vNode.children;
        if (inferno_shared_1.isArray(children)) {
            for (var i = 0, len = children.length; i < len; i++) {
                updateChildOption(children[i], value);
            }
        } else if (VNodes_1.isVNode(children)) {
            updateChildOption(children, value);
        }
    } else {
        updateChildOption(vNode, value);
    }
}
function updateChildOption(vNode, value) {
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var dom = vNode.dom;
    // we do this as multiple may have changed
    dom.value = props.value;
    if (inferno_shared_1.isArray(value) && value.indexOf(props.value) !== -1 || props.value === value) {
        dom.selected = true;
    } else if (!inferno_shared_1.isNullOrUndef(value) || !inferno_shared_1.isNullOrUndef(props.selected)) {
        dom.selected = props.selected || false;
    }
}
function onSelectChange(e) {
    var vNode = this;
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var dom = vNode.dom;
    if (props.onChange) {
        var event_1 = props.onChange;
        if (event_1.event) {
            event_1.event(event_1.data, e);
        } else {
            event_1(e);
        }
    } else if (props.onchange) {
        props.onchange(e);
    }
    // the user may have updated the vNode from the above onChange events
    // so we need to get it from the context of `this` again
    applyValue(this, dom, false);
}
function processSelect(vNode, dom, mounting) {
    var props = vNode.props || utils_1.EMPTY_OBJ;
    applyValue(vNode, dom, mounting);
    if (isControlled(props)) {
        if (mounting) {
            dom.onchange = onSelectChange.bind(vNode);
            dom.onchange.wrapped = true;
        }
        return true;
    }
    return false;
}
exports.processSelect = processSelect;
function applyValue(vNode, dom, mounting) {
    var props = vNode.props || utils_1.EMPTY_OBJ;
    if (props.multiple !== dom.multiple) {
        dom.multiple = props.multiple;
    }
    var children = vNode.children;
    if (!inferno_shared_1.isInvalid(children)) {
        var value = props.value;
        if (mounting && inferno_shared_1.isNullOrUndef(value)) {
            value = props.defaultValue;
        }
        if (inferno_shared_1.isArray(children)) {
            for (var i = 0, len = children.length; i < len; i++) {
                updateChildOptionGroup(children[i], value);
            }
        } else if (VNodes_1.isVNode(children)) {
            updateChildOptionGroup(children, value);
        }
    }
}
exports.applyValue = applyValue;

},{"../../core/VNodes":24,"../utils":19,"inferno-shared":9}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = require("inferno-shared");
var utils_1 = require("../utils");
function isControlled(props) {
    return !inferno_shared_1.isNullOrUndef(props.value);
}
function wrappedOnChange(e) {
    var props = this.props || utils_1.EMPTY_OBJ;
    var event = props.onChange;
    if (event.event) {
        event.event(event.data, e);
    } else {
        event(e);
    }
}
function onTextareaInputChange(e) {
    var vNode = this;
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var dom = vNode.dom;
    var previousValue = props.value;
    if (props.onInput) {
        var event_1 = props.onInput;
        if (event_1.event) {
            event_1.event(event_1.data, e);
        } else {
            event_1(e);
        }
    } else if (props.oninput) {
        props.oninput(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this;
    var newProps = newVNode.props || utils_1.EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue(newVNode, dom, false);
    }
}
function processTextarea(vNode, dom, mounting) {
    var props = vNode.props || utils_1.EMPTY_OBJ;
    applyValue(vNode, dom, mounting);
    if (isControlled(props)) {
        if (mounting) {
            dom.oninput = onTextareaInputChange.bind(vNode);
            dom.oninput.wrapped = true;
            if (props.onChange) {
                dom.onchange = wrappedOnChange.bind(vNode);
                dom.onchange.wrapped = true;
            }
        }
        return true;
    }
    return false;
}
exports.processTextarea = processTextarea;
function applyValue(vNode, dom, mounting) {
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var value = props.value;
    var domValue = dom.value;
    if (inferno_shared_1.isNullOrUndef(value)) {
        if (mounting) {
            var defaultValue = props.defaultValue;
            if (!inferno_shared_1.isNullOrUndef(defaultValue)) {
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
exports.applyValue = applyValue;

},{"../utils":19,"inferno-shared":9}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var InputWrapper_1 = require("./InputWrapper");
var SelectWrapper_1 = require("./SelectWrapper");
var TextareaWrapper_1 = require("./TextareaWrapper");
/**
 * There is currently no support for switching same input between controlled and nonControlled
 * If that ever becomes a real issue, then re design controlled elements
 * Currently user must choose either controlled or non-controlled and stick with that
 */
function processElement(flags, vNode, dom, mounting) {
    if (flags & 512 /* InputElement */) {
            return InputWrapper_1.processInput(vNode, dom, mounting);
        }
    if (flags & 2048 /* SelectElement */) {
            return SelectWrapper_1.processSelect(vNode, dom, mounting);
        }
    if (flags & 1024 /* TextareaElement */) {
            return TextareaWrapper_1.processTextarea(vNode, dom, mounting);
        }
    return false;
}
exports.default = processElement;

},{"./InputWrapper":20,"./SelectWrapper":21,"./TextareaWrapper":22}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = require("inferno-shared");
var normalization_1 = require("./normalization");
var options_1 = require("./options");
var utils_1 = require("../DOM/utils");
function createVNode(flags, type, className, children, props, key, ref, noNormalise) {
    if (flags & 16 /* ComponentUnknown */) {
            flags = inferno_shared_1.isStatefulComponent(type) ? 4 /* ComponentClass */ : 8 /* ComponentFunction */;
        }
    var vNode = {
        children: inferno_shared_1.isUndefined(children) ? null : children,
        className: className,
        dom: null,
        flags: flags,
        key: inferno_shared_1.isUndefined(key) ? null : key,
        props: props || null,
        ref: ref || null,
        type: type
    };
    if (!noNormalise) {
        normalization_1.normalize(vNode);
    }
    if (options_1.default.createVNode) {
        options_1.default.createVNode(vNode);
    }
    return vNode;
}
exports.createVNode = createVNode;
function directClone(vNodeToClone) {
    var newVNode;
    var flags = vNodeToClone.flags;
    if (flags & 28 /* Component */) {
            var props = void 0;
            var propsToClone = vNodeToClone.props;
            if (!propsToClone) {
                props = utils_1.EMPTY_OBJ;
            } else {
                props = {};
                for (var key in propsToClone) {
                    props[key] = propsToClone[key];
                }
            }
            newVNode = createVNode(flags, vNodeToClone.type, vNodeToClone.className, null, props, vNodeToClone.key, vNodeToClone.ref, true);
            var newProps = newVNode.props;
            if (newProps) {
                var newChildren = newProps.children;
                // we need to also clone component children that are in props
                // as the children may also have been hoisted
                if (newChildren) {
                    if (inferno_shared_1.isArray(newChildren)) {
                        var len = newChildren.length;
                        if (len > 0) {
                            var tmpArray = [];
                            for (var i = 0; i < len; i++) {
                                var child = newChildren[i];
                                if (inferno_shared_1.isStringOrNumber(child)) {
                                    tmpArray.push(child);
                                } else if (!inferno_shared_1.isInvalid(child) && isVNode(child)) {
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
            var props = void 0;
            var propsToClone = vNodeToClone.props;
            if (!propsToClone) {
                props = utils_1.EMPTY_OBJ;
            } else {
                props = {};
                for (var key in propsToClone) {
                    props[key] = propsToClone[key];
                }
            }
            newVNode = createVNode(flags, vNodeToClone.type, vNodeToClone.className, children, props, vNodeToClone.key, vNodeToClone.ref, !children);
        } else if (flags & 1 /* Text */) {
            newVNode = createTextVNode(vNodeToClone.children, vNodeToClone.key);
        }
    return newVNode;
}
exports.directClone = directClone;
/*
 directClone is preferred over cloneVNode and used internally also.
 This function makes Inferno backwards compatible.
 And can be tree-shaked by modern bundlers

 Would be nice to combine this with directClone but could not do it without breaking change
 */
function cloneVNode(vNodeToClone, props) {
    var _children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        _children[_i - 2] = arguments[_i];
    }
    var children = _children;
    var childrenLen = _children.length;
    if (childrenLen > 0 && !inferno_shared_1.isUndefined(_children[0])) {
        if (!props) {
            props = {};
        }
        if (childrenLen === 1) {
            children = _children[0];
        }
        if (!inferno_shared_1.isUndefined(children)) {
            props.children = children;
        }
    }
    var newVNode;
    if (inferno_shared_1.isArray(vNodeToClone)) {
        var tmpArray = [];
        for (var i = 0, len = vNodeToClone.length; i < len; i++) {
            tmpArray.push(directClone(vNodeToClone[i]));
        }
        newVNode = tmpArray;
    } else {
        var flags = vNodeToClone.flags;
        var className = vNodeToClone.className || props && props.className || null;
        var key = !inferno_shared_1.isNullOrUndef(vNodeToClone.key) ? vNodeToClone.key : props ? props.key : null;
        var ref = vNodeToClone.ref || (props ? props.ref : null);
        if (flags & 28 /* Component */) {
                newVNode = createVNode(flags, vNodeToClone.type, className, null, !vNodeToClone.props && !props ? utils_1.EMPTY_OBJ : inferno_shared_1.combineFrom(vNodeToClone.props, props), key, ref, true);
                var newProps = newVNode.props;
                if (newProps) {
                    var newChildren = newProps.children;
                    // we need to also clone component children that are in props
                    // as the children may also have been hoisted
                    if (newChildren) {
                        if (inferno_shared_1.isArray(newChildren)) {
                            var len = newChildren.length;
                            if (len > 0) {
                                var tmpArray = [];
                                for (var i = 0; i < len; i++) {
                                    var child = newChildren[i];
                                    if (inferno_shared_1.isStringOrNumber(child)) {
                                        tmpArray.push(child);
                                    } else if (!inferno_shared_1.isInvalid(child) && isVNode(child)) {
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
                children = props && !inferno_shared_1.isUndefined(props.children) ? props.children : vNodeToClone.children;
                newVNode = createVNode(flags, vNodeToClone.type, className, children, !vNodeToClone.props && !props ? utils_1.EMPTY_OBJ : inferno_shared_1.combineFrom(vNodeToClone.props, props), key, ref, !children);
            } else if (flags & 1 /* Text */) {
                newVNode = createTextVNode(vNodeToClone.children, key);
            }
    }
    return newVNode;
}
exports.cloneVNode = cloneVNode;
function createVoidVNode() {
    return createVNode(4096 /* Void */);
}
exports.createVoidVNode = createVoidVNode;
function createTextVNode(text, key) {
    return createVNode(1 /* Text */, null, null, text, null, key);
}
exports.createTextVNode = createTextVNode;
function isVNode(o) {
    return !!o.flags;
}
exports.isVNode = isVNode;

},{"../DOM/utils":19,"./normalization":25,"./options":26,"inferno-shared":9}],25:[function(require,module,exports){
(function (process){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = require("inferno-shared");
var VNodes_1 = require("./VNodes");
function applyKey(key, vNode) {
    vNode.key = key;
    return vNode;
}
function applyKeyIfMissing(key, vNode) {
    if (inferno_shared_1.isNumber(key)) {
        key = "." + key;
    }
    if (inferno_shared_1.isNull(vNode.key) || vNode.key[0] === '.') {
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
        if (!inferno_shared_1.isInvalid(n)) {
            if (inferno_shared_1.isArray(n)) {
                _normalizeVNodes(n, result, 0, key);
            } else {
                if (inferno_shared_1.isStringOrNumber(n)) {
                    n = VNodes_1.createTextVNode(n, null);
                } else if (VNodes_1.isVNode(n) && n.dom || n.key && n.key[0] === '.') {
                    n = VNodes_1.directClone(n);
                }
                if (inferno_shared_1.isNull(n.key) || n.key[0] === '.') {
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
        if (inferno_shared_1.isInvalid(n) || inferno_shared_1.isArray(n)) {
            var result = (newNodes || nodes).slice(0, i);
            _normalizeVNodes(nodes, result, i, "");
            return result;
        } else if (inferno_shared_1.isStringOrNumber(n)) {
            if (!newNodes) {
                newNodes = nodes.slice(0, i);
            }
            newNodes.push(applyKeyIfMissing(i, VNodes_1.createTextVNode(n, null)));
        } else if (VNodes_1.isVNode(n) && n.dom || inferno_shared_1.isNull(n.key) && !(n.flags & 64 /* HasNonKeyedChildren */)) {
            if (!newNodes) {
                newNodes = nodes.slice(0, i);
            }
            newNodes.push(applyKeyIfMissing(i, VNodes_1.directClone(n)));
        } else if (newNodes) {
            newNodes.push(applyKeyIfMissing(i, VNodes_1.directClone(n)));
        }
    }
    return newNodes || nodes;
}
exports.normalizeVNodes = normalizeVNodes;
function normalizeChildren(children) {
    if (inferno_shared_1.isArray(children)) {
        return normalizeVNodes(children);
    } else if (VNodes_1.isVNode(children) && children.dom) {
        return VNodes_1.directClone(children);
    }
    return children;
}
function normalizeProps(vNode, props, children) {
    if (!(vNode.flags & 28 /* Component */)) {
        if (inferno_shared_1.isNullOrUndef(children) && !inferno_shared_1.isNullOrUndef(props.children)) {
            vNode.children = props.children;
        }
        if (props.className) {
            vNode.className = props.className;
            delete props.className;
        }
    }
    if (props.ref) {
        vNode.ref = props.ref;
        delete props.ref;
    }
    if (!inferno_shared_1.isNullOrUndef(props.key)) {
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
            if (!inferno_shared_1.isNullOrUndef(defaultProps)) {
                if (!props) {
                    props = vNode.props = defaultProps; // Create new object if only defaultProps given
                } else {
                    for (var prop in defaultProps) {
                        if (inferno_shared_1.isUndefined(props[prop])) {
                            props[prop] = defaultProps[prop];
                        }
                    }
                }
            }
            if (inferno_shared_1.isString(type)) {
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
    if (!inferno_shared_1.isInvalid(children)) {
        vNode.children = normalizeChildren(children);
    }
    if (props && !inferno_shared_1.isInvalid(props.children)) {
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
                    inferno_shared_1.warning('Inferno normalisation(...): Encountered two children with same key, all keys must be unique within its siblings. Duplicated key is:' + item);
                }
                return hasDuplicate;
            });
        };
        if (vNode.children && Array.isArray(vNode.children)) {
            verifyKeys(vNode.children);
        }
    }
}
exports.normalize = normalize;

}).call(this,require('_process'))
},{"./VNodes":24,"_process":3,"inferno-shared":9}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
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

},{}],27:[function(require,module,exports){
(function (process){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = require("inferno-shared");
exports.NO_OP = inferno_shared_1.NO_OP;
var VNodes_1 = require("./core/VNodes");
exports.createVNode = VNodes_1.createVNode;
exports.cloneVNode = VNodes_1.cloneVNode;
var linkEvent_1 = require("./DOM/events/linkEvent");
exports.linkEvent = linkEvent_1.default;
var options_1 = require("./core/options");
exports.options = options_1.default;
var rendering_1 = require("./DOM/rendering");
exports.render = rendering_1.render;
exports.findDOMNode = rendering_1.findDOMNode;
exports.createRenderer = rendering_1.createRenderer;
var utils_1 = require("./DOM/utils");
exports.EMPTY_OBJ = utils_1.EMPTY_OBJ;
if (process.env.NODE_ENV !== 'production') {
    var testFunc = function testFn() {};
    if ((testFunc.name || testFunc.toString()).indexOf('testFn') === -1) {
        inferno_shared_1.warning('It looks like you\'re using a minified copy of the development build ' + 'of Inferno. When deploying Inferno apps to production, make sure to use ' + 'the production build which skips development warnings and is faster. ' + 'See http://infernojs.org for more details.');
    }
}
// This will be replaced by rollup
exports.version = '1.5.6';
// we duplicate it so it plays nicely with different module loading systems
exports.default = {
    linkEvent: linkEvent_1.default,
    // core shapes
    createVNode: VNodes_1.createVNode,
    // cloning
    cloneVNode: VNodes_1.cloneVNode,
    // used to shared common items between Inferno libs
    NO_OP: inferno_shared_1.NO_OP,
    EMPTY_OBJ: utils_1.EMPTY_OBJ,
    // DOM
    render: rendering_1.render,
    findDOMNode: rendering_1.findDOMNode,
    createRenderer: rendering_1.createRenderer,
    options: options_1.default,
    version: exports.version
};
// Internal stuff that only core inferno-* packages use
var constants_1 = require("./DOM/constants");
exports.internal_isUnitlessNumber = constants_1.isUnitlessNumber;
// Mainly for testing
var normalization_1 = require("./core/normalization");
exports.internal_normalize = normalization_1.normalize;

}).call(this,require('_process'))
},{"./DOM/constants":10,"./DOM/events/linkEvent":12,"./DOM/rendering":17,"./DOM/utils":19,"./core/VNodes":24,"./core/normalization":25,"./core/options":26,"_process":3,"inferno-shared":9}],28:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"./dist":27,"dup":7}],29:[function(require,module,exports){
'use strict';

var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function RFC1738(value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function RFC3986(value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};

},{}],30:[function(require,module,exports){
'use strict';

var stringify = require('./stringify');
var parse = require('./parse');
var formats = require('./formats');

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};

},{"./formats":29,"./parse":31,"./stringify":32}],31:[function(require,module,exports){
'use strict';

var utils = require('./utils');

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    parameterLimit: 1000,
    plainObjects: false,
    strictNullHandling: false
};

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];
        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos));
            val = options.decoder(part.slice(pos + 1));
        }
        if (has.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function parseObjectRecursive(chain, val, options) {
    if (!chain.length) {
        return val;
    }

    var root = chain.shift();

    var obj;
    if (root === '[]') {
        obj = [];
        obj = obj.concat(parseObject(chain, val, options));
    } else {
        obj = options.plainObjects ? Object.create(null) : {};
        var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
        var index = parseInt(cleanRoot, 10);
        if (!isNaN(index) && root !== cleanRoot && String(index) === cleanRoot && index >= 0 && options.parseArrays && index <= options.arrayLimit) {
            obj = [];
            obj[index] = parseObject(chain, val, options);
        } else {
            obj[cleanRoot] = parseObject(chain, val, options);
        }
    }

    return obj;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys
        // that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

module.exports = function (str, opts) {
    var options = opts || {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};

},{"./utils":33}],32:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var utils = require('./utils');
var formats = require('./formats');

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) {
        // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    indices: function indices(prefix, key) {
        // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) {
        // eslint-disable-line func-name-matching
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    serializeDate: function serializeDate(date) {
        // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix);
            return [formatter(keyValue) + '=' + formatter(encoder(obj))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(obj[key], generateArrayPrefix(prefix, key), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly));
        } else {
            values = values.concat(stringify(obj[key], prefix + (allowDots ? '.' + key : '[' + key + ']'), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts || {};

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
    if (typeof options.format === 'undefined') {
        options.format = formats.default;
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(obj[key], key, generateArrayPrefix, strictNullHandling, skipNulls, encode ? encoder : null, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly));
    }

    return keys.join(delimiter);
};

},{"./formats":29,"./utils":33}],33:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var has = Object.prototype.hasOwnProperty;

var hexTable = function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}();

exports.arrayToObject = function (source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

exports.merge = function (target, source, options) {
    if (!source) {
        return target;
    }

    if ((typeof source === 'undefined' ? 'undefined' : _typeof(source)) !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object') {
            if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = exports.arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && _typeof(target[i]) === 'object') {
                    target[i] = exports.merge(target[i], item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (Object.prototype.hasOwnProperty.call(acc, key)) {
            acc[key] = exports.merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

exports.decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

exports.encode = function (str) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (c === 0x2D || // -
        c === 0x2E || // .
        c === 0x5F || // _
        c === 0x7E || // ~
        c >= 0x30 && c <= 0x39 || // 0-9
        c >= 0x41 && c <= 0x5A || // a-z
        c >= 0x61 && c <= 0x7A // A-Z
        ) {
                out += string.charAt(i);
                continue;
            }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | c >> 6] + hexTable[0x80 | c & 0x3F]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | c >> 12] + hexTable[0x80 | c >> 6 & 0x3F] + hexTable[0x80 | c & 0x3F]);
            continue;
        }

        i += 1;
        c = 0x10000 + ((c & 0x3FF) << 10 | string.charCodeAt(i) & 0x3FF);
        out += hexTable[0xF0 | c >> 18] + hexTable[0x80 | c >> 12 & 0x3F] + hexTable[0x80 | c >> 6 & 0x3F] + hexTable[0x80 | c & 0x3F]; // eslint-disable-line max-len
    }

    return out;
};

exports.compact = function (obj, references) {
    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj === null) {
        return obj;
    }

    var refs = references || [];
    var lookup = refs.indexOf(obj);
    if (lookup !== -1) {
        return refs[lookup];
    }

    refs.push(obj);

    if (Array.isArray(obj)) {
        var compacted = [];

        for (var i = 0; i < obj.length; ++i) {
            if (obj[i] && _typeof(obj[i]) === 'object') {
                compacted.push(exports.compact(obj[i], refs));
            } else if (typeof obj[i] !== 'undefined') {
                compacted.push(obj[i]);
            }
        }

        return compacted;
    }

    var keys = Object.keys(obj);
    keys.forEach(function (key) {
        obj[key] = exports.compact(obj[key], refs);
    });

    return obj;
};

exports.isRegExp = function (obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

exports.isBuffer = function (obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

},{}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
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

},{"./qs":36,"assert":2,"global/window":4}],36:[function(require,module,exports){
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

},{"global/window":4}],37:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
function onStateChange(plugins, state, prev, actions) {
    return plugins.map(function (plugin) {
        if (typeof plugin === 'function') {
            plugin(state, prev, actions);
        } else if ((typeof plugin === "undefined" ? "undefined" : _typeof(plugin)) === 'object' && plugin.onStateChange) {
            plugin.onStateChange(state, prev, actions);
        }
    });
}
exports.onStateChange = onStateChange;
function onReducerCalled(plugins, state, prev, name, args) {
    return plugins.map(function (plugin) {
        if ((typeof plugin === "undefined" ? "undefined" : _typeof(plugin)) === 'object' && plugin.onReducerCalled) {
            plugin.onReducerCalled.apply(null, [state, prev, name].concat(args));
        }
    });
}
exports.onReducerCalled = onReducerCalled;
function onEffectCalled(plugins, prev, name, args) {
    return plugins.map(function (plugin) {
        if ((typeof plugin === "undefined" ? "undefined" : _typeof(plugin)) === 'object' && plugin.onEffectCalled) {
            plugin.onEffectCalled.apply(null, [prev, name].concat(args));
        }
    });
}
exports.onEffectCalled = onEffectCalled;
function twine(opts) {
    if (!opts) {
        opts = noop;
    }
    var plugins = (typeof opts === "undefined" ? "undefined" : _typeof(opts)) === 'object' && Array.isArray(opts) ? opts : [opts];
    return function output(model) {
        var state = createState(model);
        var actions = createActions(model, []);
        function decorateActions(reducers, effects, path) {
            var decoratedReducers = Object.keys(reducers || {}).map(function (key) {
                return _defineProperty({}, key, function () {
                    var reducer = reducers[key];
                    var nestedModel = retrieveNestedModel(model, path);
                    var oldState = Object.assign({}, state);
                    var localState = path.length ? getNestedObjFromPath(state, path) : state;
                    var reducerArgs = [localState].concat(Array.prototype.slice.call(arguments));
                    var reducerResponse = reducer.apply(null, reducerArgs);
                    var newState = Object.assign({}, localState, reducerResponse);
                    var args = Array.prototype.slice.call(arguments);
                    state = path.length ? updateStateAtPath(state, path, newState) : newState;
                    onReducerCalled(plugins, state, oldState, reducer.name, args);
                    onStateChange(plugins, state, oldState, actions);
                    return path.length && nestedModel.scoped ? reducerResponse : state;
                });
            });
            var decoratedEffects = Object.keys(effects || {}).map(function (key) {
                return _defineProperty({}, key, function () {
                    var effect = effects[key];
                    if (path.length) {
                        var nestedModel = retrieveNestedModel(model, path);
                        var effectState = nestedModel.scoped ? getNestedObjFromPath(state, path) : state;
                        var effectActions = nestedModel.scoped ? getNestedObjFromPath(actions, path) : actions;
                        var _args = Array.prototype.slice.call(arguments);
                        var _effectArgs = [effectState, effectActions].concat(_args);
                        onEffectCalled(plugins, state, effect.name, _args);
                        return effects[key].apply(null, _effectArgs);
                    }
                    var args = Array.prototype.slice.call(arguments);
                    var effectArgs = [state, actions].concat(args);
                    onEffectCalled(plugins, state, effect.name, args);
                    return effects[key].apply(null, effectArgs);
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

},{}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    onReducerCalled: function onReducerCalled(state, prev, name) {
        console.groupCollapsed("\uD83D\uDE80 Reducer: " + name);
        console.log('📦 prev:         ', prev);

        for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
            args[_key - 3] = arguments[_key];
        }

        console.log.apply(this, ['⚡️ arguments:    '].concat(args));
        console.log('📦 state:        ', state);
        console.groupEnd();
    },
    onEffectCalled: function onEffectCalled(state, name) {
        console.groupCollapsed("\uD83D\uDE80 Effect:  " + name);
        console.log('📦 state:         ', state);

        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = arguments[_key2];
        }

        console.log.apply(this, ['⚡️ arguments:    '].concat(args));
        console.groupEnd();
    }
};

},{}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function isBuffer(arg) {
  return arg && (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
};

},{}],41:[function(require,module,exports){
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
},{"./support/isBuffer":40,"_process":3,"inherits":39}]},{},[1]);
