(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.hashjump = factory());
})(this, (function () { 'use strict';

  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: true,
      configurable: true,
      writable: true
    }) : e[r] = t, e;
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r);
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  /*!
    HashJump v0.1.0 (https://hashjump.js.org)
    by Five Fifteen (https://fivefifteen.com)
  */

  var _hashjump = function hashjump(targetHashes, opts) {
    var _hashjump$opts;
    var onLoadHash = window.location.hash.replace('#', '');
    if (_typeof(targetHashes) === 'object') {
      opts = targetHashes;
      targetHashes = null;
    } else if (typeof targetHashes === 'string') {
      targetHashes = targetHashes.split(/[\s,]+/);
    }
    opts = Object.assign({}, _hashjump.defaultOpts, opts !== null && opts !== void 0 ? opts : {});
    if (opts.hashjumpOnLoad && onLoadHash && (!targetHashes && !Object.keys((_hashjump$opts = _hashjump.opts) !== null && _hashjump$opts !== void 0 ? _hashjump$opts : {}).includes(onLoadHash) || targetHashes && targetHashes.includes(onLoadHash))) {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
      if (opts.hideUrlHash || opts.ignoreEmptyHashes && !onLoadHash) {
        history.replaceState(null, null, window.location.pathname);
      }
      if (!opts.ignoreEmptyHashes || onLoadHash) {
        window.addEventListener('load', function () {
          _hashjump.to(onLoadHash, Object.assign({
            isOnLoad: true
          }, opts));
        });
      }
    }
    if (opts.hashjumpLinks) {
      var query;
      if (targetHashes) {
        query = targetHashes.map(function (hash) {
          return 'a[href="#' + hash + '"]';
        }).join(',');
      } else {
        var _hashjump$opts2;
        query = 'a[href^="#"]' + Object.keys((_hashjump$opts2 = _hashjump.opts) !== null && _hashjump$opts2 !== void 0 ? _hashjump$opts2 : {}).map(function (hash) {
          return ':not([href="#' + hash + '"])';
        }).join('');
      }
      var hashLinks = document.querySelectorAll(query);
      hashLinks.forEach(function (link) {
        opts.hashjumpLinkEvents.forEach(function (eventType) {
          link.addEventListener(eventType, function (e) {
            var linkHash = link.getAttribute('href').replace('#', '');
            if (opts.hideUrlHash || opts.ignoreEmptyHashes && !linkHash) {
              e.preventDefault();
              history.replaceState(null, null, window.location.pathname);
            }
            if (!opts.ignoreEmptyHashes || linkHash) {
              _hashjump.to(linkHash, Object.assign({
                isOnClick: true
              }, opts));
            }
          });
        });
      });
    }
    if (targetHashes) {
      var _hashjump$opts3;
      _hashjump.opts = Object.assign((_hashjump$opts3 = _hashjump.opts) !== null && _hashjump$opts3 !== void 0 ? _hashjump$opts3 : {}, targetHashes.reduce(function (a, v) {
        return _objectSpread2(_objectSpread2({}, a), {}, _defineProperty({}, v, opts));
      }, {}));
    } else {
      _hashjump.baseOpts = opts;
    }
  };
  _hashjump.to = function (target, opts) {
    var _ref, _ref2, _opts$scrollOffsetX, _opts$scrollOffsetY, _ref3, _ref4;
    var element;
    if (_typeof(target) === 'object' && !(target instanceof HTMLElement)) {
      opts = target;
      target = null;
    }
    if (!target) {
      element = document.documentElement;
    } else if (target instanceof HTMLElement) {
      element = target;
    } else if (typeof target === 'string') {
      element = document.getElementById(target);
    } else {
      console.error('[hashjump] invalid target:', target);
      return;
    }
    if (!element) {
      if (opts.action) {
        element = document.documentElement;
      } else {
        console.warn('[hashjump] could not find element:', target);
        return;
      }
    }
    var id = typeof target === 'string' ? target : element.id;
    opts = Object.assign({}, (_ref = (_ref2 = _hashjump.opts ? _hashjump.opts[id] : null) !== null && _ref2 !== void 0 ? _ref2 : _hashjump.baseOpts) !== null && _ref !== void 0 ? _ref : _hashjump.defaultOpts, opts !== null && opts !== void 0 ? opts : {});
    var viewWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    var viewHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    var pageWidth = document.documentElement.scrollWidth;
    var pageHeight = document.documentElement.scrollHeight;
    var maxScrollX = pageWidth - viewWidth;
    var maxScrollY = pageHeight - viewHeight;
    var elementPosX = element.offsetLeft;
    var elementPosY = element.offsetTop;
    var elementWidth = element.offsetWidth;
    var elementHeight = element.offsetHeight;
    var scrollOffsetX = (_opts$scrollOffsetX = opts.scrollOffsetX) !== null && _opts$scrollOffsetX !== void 0 ? _opts$scrollOffsetX : opts.scrollOffset;
    var scrollOffsetY = (_opts$scrollOffsetY = opts.scrollOffsetY) !== null && _opts$scrollOffsetY !== void 0 ? _opts$scrollOffsetY : opts.scrollOffset;
    if (typeof scrollOffsetX === 'string') {
      if (scrollOffsetX.startsWith('inner-')) {
        if (scrollOffsetX.charAt(scrollOffsetX.length - 1) === '%') {
          scrollOffsetX = Number(scrollOffsetX.slice(6, -1)) / 100 * (viewWidth - elementWidth);
        } else {
          scrollOffsetX = -Number(scrollOffsetX.slice(6));
        }
      } else if (scrollOffsetX.charAt(scrollOffsetX.length - 1) === '%') {
        scrollOffsetX = Number(scrollOffsetX.slice(0, -1)) / 100 * viewWidth;
      } else {
        scrollOffsetX = Number(scrollOffsetX);
      }
    }
    if (typeof scrollOffsetY === 'string') {
      if (scrollOffsetY.startsWith('inner-')) {
        if (scrollOffsetY.charAt(scrollOffsetY.length - 1) === '%') {
          scrollOffsetY = Number(scrollOffsetY.slice(6, -1)) / 100 * (viewHeight - elementHeight);
        } else {
          scrollOffsetY = -Number(scrollOffsetY.slice(6));
        }
      } else if (scrollOffsetY.charAt(scrollOffsetY.length - 1) === '%') {
        scrollOffsetY = Number(scrollOffsetY.slice(0, -1)) / 100 * viewHeight;
      } else {
        scrollOffsetY = Number(scrollOffsetY);
      }
    }
    var scrollPointX = elementPosX - scrollOffsetX;
    var scrollPointY = elementPosY - scrollOffsetY;
    if (scrollPointX < 0) {
      scrollPointX = 0;
    } else if (scrollPointX > maxScrollX) {
      scrollPointX = maxScrollX;
    }
    if (scrollPointY < 0) {
      scrollPointY = 0;
    } else if (scrollPointY > maxScrollY) {
      scrollPointY = maxScrollY;
    }
    var scrollStartX = window.scrollX || window.pageXOffset;
    var scrollStartY = window.scrollY || window.pageYOffset;
    var duration = (_ref3 = opts.isOnLoad ? opts.scrollDurationOnLoad : opts.scrollDurationOnClick) !== null && _ref3 !== void 0 ? _ref3 : opts.scrollDuration;
    var easeFunc = (_ref4 = typeof opts.easingFunction === 'string' ? _hashjump.easingFunctions[opts.easingFunction] : opts.easingFunction) !== null && _ref4 !== void 0 ? _ref4 : _hashjump.easingFunctions.linear;
    var time = Date.now();
    var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
    var focusElement = function focusElement() {
      if (opts.focusElement && (opts.focusElement === true || typeof opts.focusElement === 'string' && element.matches(opts.focusElement) || typeof opts.focusElement === 'function' && opts.focusElement(element))) {
        element.focus();
      }
    };
    var _step = function step() {
      var t = Math.min(1, (Date.now() - time) / duration);
      var ease = easeFunc(t);
      var posX = scrollStartX + (scrollPointX - scrollStartX) * ease;
      var posY = scrollStartY + (scrollPointY - scrollStartY) * ease;
      window.scrollTo(posX, posY);
      if (t < 1) {
        requestAnimationFrame(_step);
      } else {
        focusElement();
        if (opts.actionAfter) {
          opts.actionAfter(actionInfo);
        }
      }
    };
    var actionInfo = {
      target: target,
      opts: opts,
      element: element,
      viewWidth: viewWidth,
      viewHeight: viewHeight,
      pageWidth: pageWidth,
      pageHeight: pageHeight,
      maxScrollX: maxScrollX,
      maxScrollY: maxScrollY,
      elementPosX: elementPosX,
      elementPosY: elementPosY,
      elementWidth: elementWidth,
      elementHeight: elementHeight,
      scrollOffsetX: scrollOffsetX,
      scrollOffsetY: scrollOffsetY,
      scrollPointX: scrollPointX,
      scrollPointY: scrollPointY,
      scrollStartX: scrollStartX,
      scrollStartY: scrollStartY,
      duration: duration,
      easeFunc: easeFunc,
      time: time,
      requestAnimationFrame: requestAnimationFrame,
      step: _step,
      focusElement: focusElement
    };
    var actionBeforeResults;
    if (opts.actionBefore) {
      actionBeforeResults = opts.actionBefore(actionInfo);
    }
    if (opts.action) {
      if (actionBeforeResults !== false) {
        opts.action(actionInfo);
        if (opts.actionAfter) {
          opts.actionAfter(actionInfo);
        }
      }
    } else {
      if (actionBeforeResults !== false) {
        if (duration) {
          requestAnimationFrame(_step);
        } else {
          window.scrollTo(scrollPointX, scrollPointY);
          focusElement();
          if (opts.actionAfter) {
            opts.actionAfter(actionInfo);
          }
        }
      }
    }
  };
  _hashjump.defaultOpts = {
    action: null,
    actionAfter: null,
    actionBefore: null,
    focusElement: 'input, select, button, textarea',
    hashjumpLinks: true,
    hashjumpLinkEvents: ['click', 'keypress'],
    hashjumpOnLoad: true,
    hideUrlHash: false,
    ignoreEmptyHashes: true,
    scrollOffset: '25%',
    scrollOffsetX: null,
    scrollOffsetY: null,
    scrollDuration: 200,
    scrollDurationOnLoad: null,
    scrollDurationOnClick: null,
    easingFunction: 'linear'
  };
  _hashjump.easingFunctions = {
    linear: function linear(t) {
      return t;
    },
    easeInQuad: function easeInQuad(t) {
      return t * t;
    },
    easeOutQuad: function easeOutQuad(t) {
      return t * (2 - t);
    },
    easeInOutQuad: function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    easeInCubic: function easeInCubic(t) {
      return t * t * t;
    },
    easeOutCubic: function easeOutCubic(t) {
      return --t * t * t + 1;
    },
    easeInOutCubic: function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    easeInQuart: function easeInQuart(t) {
      return t * t * t * t;
    },
    easeOutQuart: function easeOutQuart(t) {
      return 1 - --t * t * t * t;
    },
    easeInOutQuart: function easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    },
    easeInQuint: function easeInQuint(t) {
      return t * t * t * t * t;
    },
    easeOutQuint: function easeOutQuint(t) {
      return 1 + --t * t * t * t * t;
    },
    easeInOutQuint: function easeInOutQuint(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
    }
  };

  return _hashjump;

}));
//# sourceMappingURL=hashjump.js.map
