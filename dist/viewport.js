(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Viewport = factory());
}(this, (function () { 'use strict';

var add = function add(fns) {
  return function () {
    for (var _len = arguments.length, f = Array(_len), _key = 0; _key < _len; _key++) {
      f[_key] = arguments[_key];
    }

    f.map(function (fn, index) {
      return dedupe(fns, fn, index);
    });
    fns.push.apply(fns, f);
  };
};

var dedupe = function dedupe(fns, fn, index) {
  return fns.indexOf(fn) !== -1 ? delete f[index] : void 0;
};

var remove = function remove(fns) {
  return function () {
    for (var _len2 = arguments.length, f = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      f[_key2] = arguments[_key2];
    }

    return f.map(function (fn) {
      return delete fns[fns.indexOf(fn)];
    });
  };
};

var run = function run(fns) {
  return function () {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    fns.map(function (fn) {
      if (fn && {}.toString.call(fn) === '[object Function]') {
        fn.apply(undefined, args);
      }
    });
  };
};

function main() {
  var fns = [];
  add(fns).apply(undefined, arguments);
  return {
    add: add(fns),
    remove: remove(fns),
    run: run(fns)
  };
}

var timer = void 0;
var started = false;
var _delay = 400;
var startFns = void 0;
var endFns = void 0;
var visibleFns = void 0;
var hiddenFns = void 0;

reset();

function reset() {
  startFns = main();
  endFns = main();
  visibleFns = main();
  hiddenFns = main();
}

var onResizeStart = startFns.add;
onResizeStart.remove = startFns.remove;
onResizeStart.reset = function () {
  return startFns = main();
};

var onResizeEnd = endFns.add;
onResizeEnd.remove = endFns.remove;
onResizeEnd.reset = function () {
  return endFns = main();
};

var onShow = visibleFns.add;
onShow.remove = visibleFns.remove;
onShow.reset = function () {
  return visibleFns = main();
};

var onHide = hiddenFns.add;
onHide.remove = hiddenFns.remove;
onHide.reset = function () {
  return hiddenFns = main();
};

function setDelay(duration) {
  if (/^[0-9][0-9]*$/.test(duration.toString())) {
    _delay = duration;
  }
}

function sizeChange() {
  if (!started) {
    startFns.run();
    started = true;
  }
  clearTimeout(timer);
  _delay > 0 ? timer = setTimeout(runEndFns, _delay) : runEndFns();
}

function runEndFns() {
  endFns.run();
  started = false;
}

function visibilityChange() {
  document.hidden ? hiddenFns.run() : visibleFns.run();
}

function listen() {
  document.addEventListener('visibilitychange', visibilityChange);
  window.addEventListener('resize', sizeChange);
  window.addEventListener('orientationchange', sizeChange);
}

// expose stuff for testing
var _tests = {
  delay: function delay() {
    return _delay;
  },
  startFns: startFns,
  endFns: endFns,
  visibleFns: visibleFns,
  hiddenFns: hiddenFns
};

var viewport = {
  onResizeStart: onResizeStart,
  onResizeEnd: onResizeEnd,
  onShow: onShow,
  onHide: onHide,
  setDelay: setDelay,
  listen: listen,
  reset: reset,
  _tests: _tests
};

return viewport;

})));
