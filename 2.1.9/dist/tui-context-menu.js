/*!
 * TOAST UI Context Menu
 * @version 2.1.9
 * @author NHN Cloud FE Development Lab <dl_javascript@nhn.com>
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ContextMenu"] = factory();
	else
		root["tui"] = root["tui"] || {}, root["tui"]["ContextMenu"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable complexity */
/**
 * @fileoverview Returns the first index at which a given element can be found in the array.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var isArray = __webpack_require__(4);

/**
 * @module array
 */

/**
 * Returns the first index at which a given element can be found in the array
 * from start index(default 0), or -1 if it is not present.
 * It compares searchElement to elements of the Array using strict equality
 * (the same method used by the ===, or triple-equals, operator).
 * @param {*} searchElement Element to locate in the array
 * @param {Array} array Array that will be traversed.
 * @param {number} startIndex Start index in array for searching (default 0)
 * @returns {number} the First index at which a given element, or -1 if it is not present
 * @memberof module:array
 * @example
 * var inArray = require('tui-code-snippet/array/inArray'); // node, commonjs
 *
 * var arr = ['one', 'two', 'three', 'four'];
 * var idx1 = inArray('one', arr, 3); // -1
 * var idx2 = inArray('one', arr); // 0
 */
function inArray(searchElement, array, startIndex) {
  var i;
  var length;
  startIndex = startIndex || 0;

  if (!isArray(array)) {
    return -1;
  }

  if (Array.prototype.indexOf) {
    return Array.prototype.indexOf.call(array, searchElement, startIndex);
  }

  length = array.length;
  for (i = startIndex; startIndex >= 0 && i < length; i += 1) {
    if (array[i] === searchElement) {
      return i;
    }
  }

  return -1;
}

module.exports = inArray;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Execute the provided callback once for each element present in the array(or Array-like object) in ascending order.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Execute the provided callback once for each element present
 * in the array(or Array-like object) in ascending order.
 * If the callback function returns false, the loop will be stopped.
 * Callback function(iteratee) is invoked with three arguments:
 *  1) The value of the element
 *  2) The index of the element
 *  3) The array(or Array-like object) being traversed
 * @param {Array|Arguments|NodeList} arr The array(or Array-like object) that will be traversed
 * @param {function} iteratee Callback function
 * @param {Object} [context] Context(this) of callback function
 * @memberof module:collection
 * @example
 * var forEachArray = require('tui-code-snippet/collection/forEachArray'); // node, commonjs
 *
 * var sum = 0;
 *
 * forEachArray([1,2,3], function(value){
 *     sum += value;
 * });
 * alert(sum); // 6
 */
function forEachArray(arr, iteratee, context) {
  var index = 0;
  var len = arr.length;

  context = context || null;

  for (; index < len; index += 1) {
    if (iteratee.call(context, arr[index], index, arr) === false) {
      break;
    }
  }
}

module.exports = forEachArray;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Execute the provided callback once for each property of object(or element of array) which actually exist.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var isArray = __webpack_require__(4);
var forEachArray = __webpack_require__(1);
var forEachOwnProperties = __webpack_require__(6);

/**
 * @module collection
 */

/**
 * Execute the provided callback once for each property of object(or element of array) which actually exist.
 * If the object is Array-like object(ex-arguments object), It needs to transform to Array.(see 'ex2' of example).
 * If the callback function returns false, the loop will be stopped.
 * Callback function(iteratee) is invoked with three arguments:
 *  1) The value of the property(or The value of the element)
 *  2) The name of the property(or The index of the element)
 *  3) The object being traversed
 * @param {Object} obj The object that will be traversed
 * @param {function} iteratee Callback function
 * @param {Object} [context] Context(this) of callback function
 * @memberof module:collection
 * @example
 * var forEach = require('tui-code-snippet/collection/forEach'); // node, commonjs
 *
 * var sum = 0;
 *
 * forEach([1,2,3], function(value){
 *     sum += value;
 * });
 * alert(sum); // 6
 *
 * // In case of Array-like object
 * var array = Array.prototype.slice.call(arrayLike); // change to array
 * forEach(array, function(value){
 *     sum += value;
 * });
 */
function forEach(obj, iteratee, context) {
  if (isArray(obj)) {
    forEachArray(obj, iteratee, context);
  } else {
    forEachOwnProperties(obj, iteratee, context);
  }
}

module.exports = forEach;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Check whether the given variable is a string or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Check whether the given variable is a string or not.
 * If the given variable is a string, return true.
 * @param {*} obj - Target for checking
 * @returns {boolean} Is string?
 * @memberof module:type
 */
function isString(obj) {
  return typeof obj === 'string' || obj instanceof String;
}

module.exports = isString;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Check whether the given variable is an instance of Array or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Check whether the given variable is an instance of Array or not.
 * If the given variable is an instance of Array, return true.
 * @param {*} obj - Target for checking
 * @returns {boolean} Is array instance?
 * @memberof module:type
 */
function isArray(obj) {
  return obj instanceof Array;
}

module.exports = isArray;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Check whether the given variable is undefined or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Check whether the given variable is undefined or not.
 * If the given variable is undefined, returns true.
 * @param {*} obj - Target for checking
 * @returns {boolean} Is undefined?
 * @memberof module:type
 */
function isUndefined(obj) {
  return obj === undefined; // eslint-disable-line no-undefined
}

module.exports = isUndefined;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Execute the provided callback once for each property of object which actually exist.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Execute the provided callback once for each property of object which actually exist.
 * If the callback function returns false, the loop will be stopped.
 * Callback function(iteratee) is invoked with three arguments:
 *  1) The value of the property
 *  2) The name of the property
 *  3) The object being traversed
 * @param {Object} obj The object that will be traversed
 * @param {function} iteratee  Callback function
 * @param {Object} [context] Context(this) of callback function
 * @memberof module:collection
 * @example
 * var forEachOwnProperties = require('tui-code-snippet/collection/forEachOwnProperties'); // node, commonjs
 *
 * var sum = 0;
 *
 * forEachOwnProperties({a:1,b:2,c:3}, function(value){
 *     sum += value;
 * });
 * alert(sum); // 6
 */
function forEachOwnProperties(obj, iteratee, context) {
  var key;

  context = context || null;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (iteratee.call(context, obj[key], key, obj) === false) {
        break;
      }
    }
  }
}

module.exports = forEachOwnProperties;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Get HTML element's design classes.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var isUndefined = __webpack_require__(5);

/**
 * Get HTML element's design classes.
 * @param {(HTMLElement|SVGElement)} element target element
 * @returns {string} element css class name
 * @memberof module:domUtil
 */
function getClass(element) {
  if (!element || !element.className) {
    return '';
  }

  if (isUndefined(element.className.baseVal)) {
    return element.className;
  }

  return element.className.baseVal;
}

module.exports = getClass;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Extend the target object from other objects.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * @module object
 */

/**
 * Extend the target object from other objects.
 * @param {object} target - Object that will be extended
 * @param {...object} objects - Objects as sources
 * @returns {object} Extended object
 * @memberof module:object
 */
function extend(target, objects) { // eslint-disable-line no-unused-vars
  var hasOwnProp = Object.prototype.hasOwnProperty;
  var source, prop, i, len;

  for (i = 1, len = arguments.length; i < len; i += 1) {
    source = arguments[i];
    for (prop in source) {
      if (hasOwnProp.call(source, prop)) {
        target[prop] = source[prop];
      }
    }
  }

  return target;
}

module.exports = extend;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Get event collection for specific HTML element
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var EVENT_KEY = '_feEventKey';

/**
 * Get event collection for specific HTML element
 * @param {HTMLElement} element - HTML element
 * @param {string} type - event type
 * @returns {array}
 * @private
 */
function safeEvent(element, type) {
  var events = element[EVENT_KEY];
  var handlers;

  if (!events) {
    events = element[EVENT_KEY] = {};
  }

  handlers = events[type];
  if (!handlers) {
    handlers = events[type] = [];
  }

  return handlers;
}

module.exports = safeEvent;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Add css class to element
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var forEach = __webpack_require__(2);
var inArray = __webpack_require__(0);
var getClass = __webpack_require__(7);
var setClassName = __webpack_require__(11);

/**
 * domUtil module
 * @module domUtil
 */

/**
 * Add css class to element
 * @param {(HTMLElement|SVGElement)} element - target element
 * @param {...string} cssClass - css classes to add
 * @memberof module:domUtil
 */
function addClass(element) {
  var cssClass = Array.prototype.slice.call(arguments, 1);
  var classList = element.classList;
  var newClass = [];
  var origin;

  if (classList) {
    forEach(cssClass, function(name) {
      element.classList.add(name);
    });

    return;
  }

  origin = getClass(element);

  if (origin) {
    cssClass = [].concat(origin.split(/\s+/), cssClass);
  }

  forEach(cssClass, function(cls) {
    if (inArray(cls, newClass) < 0) {
      newClass.push(cls);
    }
  });

  setClassName(element, newClass);
}

module.exports = addClass;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Set className value
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var isArray = __webpack_require__(4);
var isUndefined = __webpack_require__(5);

/**
 * Set className value
 * @param {(HTMLElement|SVGElement)} element - target element
 * @param {(string|string[])} cssClass - class names
 * @private
 */
function setClassName(element, cssClass) {
  cssClass = isArray(cssClass) ? cssClass.join(' ') : cssClass;

  cssClass = cssClass.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

  if (isUndefined(element.className.baseVal)) {
    element.className = cssClass;

    return;
  }

  element.className.baseVal = cssClass;
}

module.exports = setClassName;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Setting element style
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var isString = __webpack_require__(3);
var forEach = __webpack_require__(2);

/**
 * Setting element style
 * @param {(HTMLElement|SVGElement)} element - element to setting style
 * @param {(string|object)} key - style prop name or {prop: value} pair object
 * @param {string} [value] - style value
 * @memberof module:domUtil
 */
function css(element, key, value) {
  var style = element.style;

  if (isString(key)) {
    style[key] = value;

    return;
  }

  forEach(key, function(v, k) {
    style[k] = v;
  });
}

module.exports = css;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(14);

var _contextmenu = _interopRequireDefault(__webpack_require__(15));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @fileoverview
 */
module.exports = _contextmenu["default"];

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _forEachArray = _interopRequireDefault(__webpack_require__(1));

var _off = _interopRequireDefault(__webpack_require__(16));

var _on = _interopRequireDefault(__webpack_require__(17));

var _preventDefault = _interopRequireDefault(__webpack_require__(18));

var _addClass = _interopRequireDefault(__webpack_require__(10));

var _closest = _interopRequireDefault(__webpack_require__(19));

var _css = _interopRequireDefault(__webpack_require__(12));

var _getData = _interopRequireDefault(__webpack_require__(22));

var _hasClass = _interopRequireDefault(__webpack_require__(24));

var _removeClass = _interopRequireDefault(__webpack_require__(25));

var _extend = _interopRequireDefault(__webpack_require__(8));

var _debounce = _interopRequireDefault(__webpack_require__(26));

var _floatingLayer = _interopRequireDefault(__webpack_require__(27));

var _Map = _interopRequireDefault(__webpack_require__(32));

var _util = __webpack_require__(33);

var _contextmenu = _interopRequireDefault(__webpack_require__(36));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @fileoverview Context menu component
 */
var DEFAULT_ZINDEX = 999;
/**
 * @typedef {object} MenuItem
 * @property {string} title - title of menu item
 * @property {string} [command] - string for alternative of using title to command
 * @property {boolean} [separator=false] - set true then this menu will use separator
 * @property {boolean} [disable=false] - set true then this menu will be disabled
 * @property {MenuItem[]} [menu] - you can define submenu recursivly
 */

/**
 * tui-context-menu creates a menu when the right mouse button is clicked.
 * To register a context menu, please refer to {@link ContextMenu#register}.
 * @class ContextMenu
 * @param {HTMLElement} container - container for placing context menu floating layers
 * @param {object} options - options for context menu
 *   @param {number} [options.delay=130] - delay for displaying submenu
 *   @param {boolean} [options.usageStatistics=true] Send the hostname to google analytics.
 *     If you do not want to send the hostname, this option set to false.
 * @example
 * //-- #1. Get Module --//
 * //ES6
 * import ContextMenu from 'tui-context-menu';
 * 
 * // CommonJS
 * const ContextMenu = require('tui-context-menu'); 
 * 
 * // Browser
 * const ContextMenu = tui.ContextMenu;
 *
 * //-- #2. Use property --//
 * const container = document.getElementById('context-menu');
 * const contextMenu = new ContextMenu(container);
 */

var ContextMenu =
/*#__PURE__*/
function () {
  function ContextMenu(container) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      delay: 130,
      usageStatistics: true
    };

    /**
     * @type {object}
     * @private
     */
    this.options = (0, _extend["default"])({}, options);
    /**
     * @type {HTMLElement}
     * @private
     */

    this.container = container;
    /**
     * @type {Map}
     * @private
     */

    this.layerMap = new _Map["default"]();
    /**
     * @type {FloatingLayer}
     * @private
     */

    this.activeLayer = null;
    /**
     * @type {boolean}
     * @private
     */

    this.pageScrolled = false;
    /**
     * @type {HTMLElement}
     * @private
     */

    this.prevElement = null;
    /**
     * @type {function}
     * @private
     */

    this.cloneMouseMoveEvent = null;
    /**
     * floating layer z-index
     * @type {number}
     */

    this.zIndex = DEFAULT_ZINDEX;
    (0, _on["default"])(document, 'contextmenu', this._onContextMenu, this);

    if (this.options.usageStatistics) {
      (0, _util.sendHostName)();
    }
  }
  /**
   * Destructor
   */


  var _proto = ContextMenu.prototype;

  _proto.destroy = function destroy() {
    (0, _off["default"])(document, 'contextmenu', this._onContextMenu, this);

    this._hideContextMenu();

    this.container = this.layerMap = this.activeLayer = this.pageScolled = this.cloneMouseMoveEvent = null;
  }
  /**
   * Hide activated context menu and unbind related DOM events
   * @private
   */
  ;

  _proto._hideContextMenu = function _hideContextMenu() {
    var layer = this.activeLayer;

    if (!layer) {
      return;
    }

    (0, _off["default"])(layer.container, 'mousemove', this.cloneMouseMoveEvent, this);
    (0, _off["default"])(document, 'mousedown', this._onMouseDown, this);
    (0, _off["default"])(document, 'click', this._onMouseClick, this);
    (0, _off["default"])(document, 'scroll', this._onPageScroll, this);
    layer.hide();

    var hideElement = function hideElement(menu) {
      (0, _css["default"])(menu, {
        display: 'none',
        marginTop: ''
      });
    };

    (0, _forEachArray["default"])(layer.container.querySelectorAll('.tui-contextmenu-root'), hideElement);
    (0, _forEachArray["default"])(layer.container.querySelectorAll('.tui-contextmenu-submenu'), hideElement);
    (0, _forEachArray["default"])(layer.container.querySelectorAll('.tui-contextmenu-selected'), function (highlightMenu) {
      return (0, _removeClass["default"])(highlightMenu, 'tui-contextmenu-selected');
    });
    this.pageScrolled = false;
    this.activeLayer = this.cloneMouseMoveEvent = null;
  }
  /**
   * Mouse down event handler for close context menu
   * @param {MouseEvent} mouseDownEvent - mouseDown event object
   * @private
   */
  ;

  _proto._onMouseDown = function _onMouseDown(mouseDownEvent) {
    var target = mouseDownEvent.target || mouseDownEvent.srcElement;

    if (!(0, _closest["default"])(target, '.tui-contextmenu-root')) {
      this._hideContextMenu();
    }
  }
  /**
   * Mouse click event handler for invoking callback when click menu item
   * @param {MouseEvent} clickEvent - click MouseEvent object
   * @private
   */

  /* eslint-disable complexity */
  ;

  _proto._onMouseClick = function _onMouseClick(clickEvent) {
    var _this = this;

    var target = clickEvent.target || clickEvent.srcElement;
    var title = target.textContent.trim();
    var command = (0, _getData["default"])(target, 'command');
    var container = (0, _closest["default"])(target, '.floating-layer');
    var isMenuButton = (0, _hasClass["default"])(target, 'tui-contextmenu-button');
    var isSeparator = (0, _hasClass["default"])(target, 'tui-contextmenu-separator');
    var hasSubmenu = (0, _hasClass["default"])(target, 'tui-contextmenu-has-submenu');
    var isDisableButton = (0, _hasClass["default"])(target, 'tui-contextmenu-disable');

    if (isDisableButton) {
      this._hideContextMenu();

      return;
    }

    if (!(container && isMenuButton) || isSeparator || hasSubmenu) {
      return;
    }

    this.layerMap.forEach(function (layer) {
      if (container === layer.container) {
        layer.callback(clickEvent, command || title);

        _this._hideContextMenu();
      }
    }, this);
  }
  /**
   * Show menu element without veil browser viewport
   * @param {HTMLElement} element - menu element
   * @param {object} [strategy] - methods for handle situations that
   *  menu veil by browser viewports
   * @param {object} [initialStyle] - initial style before
   *  calculating new bound
   * @private
   */
  ;

  _proto._showWithoutOverflow = function _showWithoutOverflow(element) {
    var strategy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      rightOverflow: function rightOverflow() {},
      bottomOverflow: function bottomOverflow() {}
    };
    var initialStyle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      marginTop: '',
      marginLeft: ''
    };
    (0, _css["default"])(element, 'visibility', 'hidden');
    (0, _css["default"])(element, initialStyle);
    (0, _css["default"])(element, 'display', 'block');

    var _element$getBoundingC = element.getBoundingClientRect(),
        menuRight = _element$getBoundingC.right,
        menuBottom = _element$getBoundingC.bottom;

    var menuDoc = (element.document || element.ownerDocument).documentElement;
    var viewportWidth = menuDoc.clientWidth,
        viewportHeight = menuDoc.clientHeight;
    var isRightOverflowed = menuRight > viewportWidth;
    var isBottomOverflowed = menuBottom > viewportHeight;

    if (isRightOverflowed) {
      strategy.rightOverflow(element, menuRight, viewportWidth);
    }

    if (isBottomOverflowed) {
      strategy.bottomOverflow(element, menuBottom, viewportHeight);
    }

    (0, _css["default"])(element, 'visibility', '');
  }
  /**
   * Show root menu element
   * @param {number} left - left pixel position
   * @param {number} top - top pixel position
   * @private
   */
  ;

  _proto._showRootMenu = function _showRootMenu(left, top) {
    var layer = this.activeLayer;

    if (!layer) {
      return;
    }

    var rootMenuElement = layer.container.querySelector('.tui-contextmenu-root');
    layer.setBound({
      left: left,
      top: top
    });
    layer.show();

    this._showWithoutOverflow(rootMenuElement, {
      rightOverflow: function rightOverflow(el, right, viewportWidth) {
        (0, _css["default"])(el, 'marginLeft', "".concat(viewportWidth - right, "px"));
      },
      bottomOverflow: function bottomOverflow(el, bottom, viewportHeight) {
        (0, _css["default"])(el, 'marginTop', "".concat(viewportHeight - bottom, "px"));
      }
    });
  }
  /**
   * Show sub menu element
   * @param {HTMLElement} element - submenu root element
   * @private
   */
  ;

  _proto._showSubMenu = function _showSubMenu(element) {
    this._showWithoutOverflow(element, {
      rightOverflow: function rightOverflow(el, right, viewportWidth) {
        (0, _css["default"])(el, 'marginLeft', "".concat(viewportWidth - right + el.clientWidth, "px"));
      },
      bottomOverflow: function bottomOverflow(el, bottom, viewportHeight) {
        (0, _css["default"])(el, 'marginTop', "".concat(viewportHeight - bottom, "px"));
      }
    }, {
      marginTop: '',
      marginLeft: '100%'
    });
  }
  /**
   * Refresh all submenu element
   *
   * Hide elements that no related with mouse event and show others
   * @param {HTMLElement} layerOnCursor - layer element on cursor
   * @private
   */
  ;

  _proto._refreshMenuDisplay = function _refreshMenuDisplay(layerOnCursor) {
    var _this2 = this;

    var container = this.activeLayer.container;
    var allSubmenus = container.querySelectorAll('.tui-contextmenu-submenu');
    var layersUntilRoot = [];

    while (layerOnCursor && container !== layerOnCursor) {
      if ((0, _hasClass["default"])(layerOnCursor, 'tui-contextmenu-submenu')) {
        layersUntilRoot.push(layerOnCursor);
      }

      layerOnCursor = layerOnCursor.parentNode;
    }

    (0, _forEachArray["default"])(allSubmenus, function (menuElement) {
      if (layersUntilRoot.indexOf(menuElement) < 0) {
        (0, _css["default"])(menuElement, 'display', 'none');
      }
    });
    (0, _forEachArray["default"])(layersUntilRoot, function (elem) {
      return _this2._showSubMenu(elem);
    });
  }
  /**
   * Mouse move event handler for reveal context menus
   * @param {MouseEvent} mouseMoveEvent - mouse move event object
   * @private
   */
  ;

  _proto._onMouseMove = function _onMouseMove(mouseMoveEvent) {
    if (this.pageScrolled) {
      this.pageScrolled = false;
      return;
    }

    var target = mouseMoveEvent.target || mouseMoveEvent.srcElement;
    var activeLayer = this.activeLayer;

    if (this.prevElement) {
      (0, _removeClass["default"])(this.prevElement, 'tui-contextmenu-selected');
    }

    if (!(activeLayer && (0, _closest["default"])(target, '.tui-contextmenu-root'))) {
      return;
    }

    var layerOnCursor;

    if ((0, _hasClass["default"])(target, 'tui-contextmenu-has-submenu')) {
      layerOnCursor = target.parentNode.querySelector('.tui-contextmenu-submenu');
    } else {
      layerOnCursor = (0, _closest["default"])(target, '.tui-contextmenu-submenu');
    }

    this._refreshMenuDisplay(layerOnCursor);

    this._highlightMenuHasSubmenu(layerOnCursor);
  }
  /**
   * Select
   * @param {HTMLElement} layer - current layer located mouse pointer
   * @private
   */
  ;

  _proto._highlightMenuHasSubmenu = function _highlightMenuHasSubmenu(layer) {
    if (!layer) {
      this.prevElement = null;
      return;
    }

    var selectedMenu = layer.parentNode.querySelector('.tui-contextmenu-button');
    (0, _addClass["default"])(selectedMenu, 'tui-contextmenu-selected');
    this.prevElement = selectedMenu;
  }
  /**
   * Scroll handle for prevent break position after scrolling
   * @private
   */
  ;

  _proto._onPageScroll = function _onPageScroll() {
    this.pageScrolled = true;
  }
  /**
   * Event handler
   * @param {MouseEvent} clickEvent - mouse event object
   * @private
   */
  ;

  _proto._onContextMenu = function _onContextMenu(clickEvent) {
    var _this3 = this;

    var opt = this.options;
    var target = clickEvent.target || clickEvent.srcElement;
    var relatedLayer;

    while (target.parentNode) {
      var findElement = this.layerMap.get(target);

      if (findElement) {
        relatedLayer = findElement;
        break;
      }

      target = target.parentNode;
    }

    if (!relatedLayer) {
      return;
    }

    (0, _preventDefault["default"])(clickEvent);
    this.activeLayer = relatedLayer;

    var _getMousePosition = (0, _util.getMousePosition)(clickEvent, this.activeLayer.container),
        left = _getMousePosition.left,
        top = _getMousePosition.top;

    var debouncedMouseMove = (0, _debounce["default"])(function (mouseMoveEvent) {
      return _this3._onMouseMove(mouseMoveEvent);
    }, opt.delay);

    this.cloneMouseMoveEvent = function (mouseMoveEvent) {
      var virtualMouseEvent = {
        target: mouseMoveEvent.target || mouseMoveEvent.srcElement
      };
      debouncedMouseMove(virtualMouseEvent);
    };

    this._showRootMenu(left, top);

    (0, _on["default"])(relatedLayer.container, 'mousemove', this.cloneMouseMoveEvent, this);
    (0, _on["default"])(document, 'mousedown', this._onMouseDown, this);
    (0, _on["default"])(document, 'click', this._onMouseClick, this);
    (0, _on["default"])(document, 'scroll', this._onPageScroll, this);
  }
  /**
   * Register context menu
   * @param {string} selector - css selector for displaying contextmenu at secondary mouse button click
   * @param {function} callback - callback for each menu item clicked
   * @param {MenuItem[]} menuItems - {@link MenuItem} schema
   * @example
   * const contextMenu = new ContextMenu(document.getElementById('context-menu'));
   * 
   * function onClick(ev, cmd) {
   *   console.log(`${ev.type}ed ${cmd}.`);
   * }
   * 
   * contextMenu.register('#folder', [
   *   {title: 'Open'},
   *   {
   *     title: 'Create',
   *     menu: [
   *       {title: 'a File', cmd: 'Create a file'},
   *       {title: 'a Folder', cmd: 'Create a folder'}
   *     ]
   *   }
   * ]);
   * 
   * // When click 'a File': "Create a file"
   */
  ;

  _proto.register = function register(selector, callback, menuItems) {
    var target = document.querySelector(selector);

    if (!target) {
      return;
    }

    var layer = new _floatingLayer["default"](this.container);
    layer.callback = callback;
    layer.setBound({
      width: 'auto',
      height: 'auto'
    });
    layer.setContent((0, _contextmenu["default"])({
      root: true,
      menuItems: menuItems,
      tmpl: function tmpl(menu) {
        return (0, _contextmenu["default"])({
          menuItems: menu,
          tmpl: _contextmenu["default"]
        });
      }
    }));
    this.layerMap.set(target, layer);
  }
  /**
   * Unregister context menu
   * @param {string} selector - css selector used for register context menu
   * @returns {boolean} whether unregister is successful?
   */
  ;

  _proto.unregister = function unregister(selector) {
    var layerMap = this.layerMap;
    var target = document.querySelector(selector);

    if (!target) {
      return false;
    }

    var layer = layerMap.get(target);

    if (!layer) {
      return false;
    }

    layer.destroy();
    layerMap["delete"](target);
    return true;
  };

  return ContextMenu;
}();

var _default = ContextMenu;
exports["default"] = _default;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Unbind DOM events
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var isString = __webpack_require__(3);
var forEach = __webpack_require__(2);

var safeEvent = __webpack_require__(9);

/**
 * Unbind DOM events
 * If a handler function is not passed, remove all events of that type.
 * @param {HTMLElement} element - element to unbind events
 * @param {(string|object)} types - Space splitted events names or eventName:handler object
 * @param {function} [handler] - handler function
 * @memberof module:domEvent
 * @example
 * // Following the example of domEvent#on
 * 
 * // Unbind one event from an element.
 * off(div, 'click', toggle);
 * 
 * // Unbind multiple events with a same handler from multiple elements at once.
 * // Use event names splitted by a space.
 * off(element, 'mouseenter mouseleave', changeColor);
 * 
 * // Unbind multiple events with different handlers from an element at once.
 * // Use an object which of key is an event name and value is a handler function.
 * off(div, {
 *   keydown: highlight,
 *   keyup: dehighlight
 * });
 * 
 * // Unbind events without handlers.
 * off(div, 'drag');
 */
function off(element, types, handler) {
  if (isString(types)) {
    forEach(types.split(/\s+/g), function(type) {
      unbindEvent(element, type, handler);
    });

    return;
  }

  forEach(types, function(func, type) {
    unbindEvent(element, type, func);
  });
}

/**
 * Unbind DOM events
 * If a handler function is not passed, remove all events of that type.
 * @param {HTMLElement} element - element to unbind events
 * @param {string} type - events name
 * @param {function} [handler] - handler function
 * @private
 */
function unbindEvent(element, type, handler) {
  var events = safeEvent(element, type);
  var index;

  if (!handler) {
    forEach(events, function(item) {
      removeHandler(element, type, item.wrappedHandler);
    });
    events.splice(0, events.length);
  } else {
    forEach(events, function(item, idx) {
      if (handler === item.handler) {
        removeHandler(element, type, item.wrappedHandler);
        index = idx;

        return false;
      }

      return true;
    });
    events.splice(index, 1);
  }
}

/**
 * Remove an event handler
 * @param {HTMLElement} element - An element to remove an event
 * @param {string} type - event type
 * @param {function} handler - event handler
 * @private
 */
function removeHandler(element, type, handler) {
  if ('removeEventListener' in element) {
    element.removeEventListener(type, handler);
  } else if ('detachEvent' in element) {
    element.detachEvent('on' + type, handler);
  }
}

module.exports = off;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Bind DOM events
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var isString = __webpack_require__(3);
var forEach = __webpack_require__(2);

var safeEvent = __webpack_require__(9);

/**
 * Bind DOM events.
 * @param {HTMLElement} element - element to bind events
 * @param {(string|object)} types - Space splitted events names or eventName:handler object
 * @param {(function|object)} handler - handler function or context for handler method
 * @param {object} [context] context - context for handler method.
 * @memberof module:domEvent
 * @example
 * var div = document.querySelector('div');
 * 
 * // Bind one event to an element.
 * on(div, 'click', toggle);
 * 
 * // Bind multiple events with a same handler to multiple elements at once.
 * // Use event names splitted by a space.
 * on(div, 'mouseenter mouseleave', changeColor);
 * 
 * // Bind multiple events with different handlers to an element at once.
 * // Use an object which of key is an event name and value is a handler function.
 * on(div, {
 *   keydown: highlight,
 *   keyup: dehighlight
 * });
 * 
 * // Set a context for handler method.
 * var name = 'global';
 * var repository = {name: 'CodeSnippet'};
 * on(div, 'drag', function() {
 *  console.log(this.name);
 * }, repository);
 * // Result when you drag a div: "CodeSnippet"
 */
function on(element, types, handler, context) {
  if (isString(types)) {
    forEach(types.split(/\s+/g), function(type) {
      bindEvent(element, type, handler, context);
    });

    return;
  }

  forEach(types, function(func, type) {
    bindEvent(element, type, func, handler);
  });
}

/**
 * Bind DOM events
 * @param {HTMLElement} element - element to bind events
 * @param {string} type - events name
 * @param {function} handler - handler function or context for handler method
 * @param {object} [context] context - context for handler method.
 * @private
 */
function bindEvent(element, type, handler, context) {
  /**
     * Event handler
     * @param {Event} e - event object
     */
  function eventHandler(e) {
    handler.call(context || element, e || window.event);
  }

  if ('addEventListener' in element) {
    element.addEventListener(type, eventHandler);
  } else if ('attachEvent' in element) {
    element.attachEvent('on' + type, eventHandler);
  }
  memorizeHandler(element, type, handler, eventHandler);
}

/**
 * Memorize DOM event handler for unbinding.
 * @param {HTMLElement} element - element to bind events
 * @param {string} type - events name
 * @param {function} handler - handler function that user passed at on() use
 * @param {function} wrappedHandler - handler function that wrapped by domevent for implementing some features
 * @private
 */
function memorizeHandler(element, type, handler, wrappedHandler) {
  var events = safeEvent(element, type);
  var existInEvents = false;

  forEach(events, function(obj) {
    if (obj.handler === handler) {
      existInEvents = true;

      return false;
    }

    return true;
  });

  if (!existInEvents) {
    events.push({
      handler: handler,
      wrappedHandler: wrappedHandler
    });
  }
}

module.exports = on;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent default action
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Prevent default action
 * @param {Event} e - event object
 * @memberof module:domEvent
 */
function preventDefault(e) {
  if (e.preventDefault) {
    e.preventDefault();

    return;
  }

  e.returnValue = false;
}

module.exports = preventDefault;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Find parent element recursively
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var matches = __webpack_require__(20);

/**
 * Find parent element recursively
 * @param {HTMLElement} element - base element to start find
 * @param {string} selector - selector string for find
 * @returns {HTMLElement} - element finded or null
 * @memberof module:domUtil
 */
function closest(element, selector) {
  var parent = element.parentNode;

  if (matches(element, selector)) {
    return element;
  }

  while (parent && parent !== document) {
    if (matches(parent, selector)) {
      return parent;
    }

    parent = parent.parentNode;
  }

  return null;
}

module.exports = closest;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Check element match selector
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var inArray = __webpack_require__(0);
var toArray = __webpack_require__(21);

var elProto = Element.prototype;
var matchSelector = elProto.matches ||
    elProto.webkitMatchesSelector ||
    elProto.mozMatchesSelector ||
    elProto.msMatchesSelector ||
    function(selector) {
      var doc = this.document || this.ownerDocument;

      return inArray(this, toArray(doc.querySelectorAll(selector))) > -1;
    };

/**
 * Check element match selector
 * @param {HTMLElement} element - element to check
 * @param {string} selector - selector to check
 * @returns {boolean} is selector matched to element?
 * @memberof module:domUtil
 */
function matches(element, selector) {
  return matchSelector.call(element, selector);
}

module.exports = matches;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Transform the Array-like object to Array.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var forEachArray = __webpack_require__(1);

/**
 * Transform the Array-like object to Array.
 * In low IE (below 8), Array.prototype.slice.call is not perfect. So, try-catch statement is used.
 * @param {*} arrayLike Array-like object
 * @returns {Array} Array
 * @memberof module:collection
 * @example
 * var toArray = require('tui-code-snippet/collection/toArray'); // node, commonjs
 *
 * var arrayLike = {
 *     0: 'one',
 *     1: 'two',
 *     2: 'three',
 *     3: 'four',
 *     length: 4
 * };
 * var result = toArray(arrayLike);
 *
 * alert(result instanceof Array); // true
 * alert(result); // one,two,three,four
 */
function toArray(arrayLike) {
  var arr;
  try {
    arr = Array.prototype.slice.call(arrayLike);
  } catch (e) {
    arr = [];
    forEachArray(arrayLike, function(value) {
      arr.push(value);
    });
  }

  return arr;
}

module.exports = toArray;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Get data value from data-attribute
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var convertToKebabCase = __webpack_require__(23);

/**
 * Get data value from data-attribute
 * @param {HTMLElement} element - target element
 * @param {string} key - key
 * @returns {string} value
 * @memberof module:domUtil
 */
function getData(element, key) {
  if (element.dataset) {
    return element.dataset[key];
  }

  return element.getAttribute('data-' + convertToKebabCase(key));
}

module.exports = getData;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Convert kebab-case
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Convert kebab-case
 * @param {string} key - string to be converted to Kebab-case
 * @private
 */
function convertToKebabCase(key) {
  return key.replace(/([A-Z])/g, function(match) {
    return '-' + match.toLowerCase();
  });
}

module.exports = convertToKebabCase;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Check element has specific css class
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var inArray = __webpack_require__(0);
var getClass = __webpack_require__(7);

/**
 * Check element has specific css class
 * @param {(HTMLElement|SVGElement)} element - target element
 * @param {string} cssClass - css class
 * @returns {boolean}
 * @memberof module:domUtil
 */
function hasClass(element, cssClass) {
  var origin;

  if (element.classList) {
    return element.classList.contains(cssClass);
  }

  origin = getClass(element).split(/\s+/);

  return inArray(cssClass, origin) > -1;
}

module.exports = hasClass;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Remove css class from element
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var forEachArray = __webpack_require__(1);
var inArray = __webpack_require__(0);
var getClass = __webpack_require__(7);
var setClassName = __webpack_require__(11);

/**
 * Remove css class from element
 * @param {(HTMLElement|SVGElement)} element - target element
 * @param {...string} cssClass - css classes to remove
 * @memberof module:domUtil
 */
function removeClass(element) {
  var cssClass = Array.prototype.slice.call(arguments, 1);
  var classList = element.classList;
  var origin, newClass;

  if (classList) {
    forEachArray(cssClass, function(name) {
      classList.remove(name);
    });

    return;
  }

  origin = getClass(element).split(/\s+/);
  newClass = [];
  forEachArray(origin, function(name) {
    if (inArray(name, cssClass) < 0) {
      newClass.push(name);
    }
  });

  setClassName(element, newClass);
}

module.exports = removeClass;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Creates a debounced function that delays invoking fn until after delay milliseconds has elapsed since the last time the debouced function was invoked.
 * @author NHN FE Development Lab <dl_javascript.nhn.com>
 */



/**
 * @module tricks
 */

/**
 * Creates a debounced function that delays invoking fn until after delay milliseconds has elapsed
 * since the last time the debouced function was invoked.
 * @param {function} fn The function to debounce.
 * @param {number} [delay=0] The number of milliseconds to delay
 * @returns {function} debounced function.
 * @memberof module:tricks
 * @example
 * var debounce = require('tui-code-snippet/tricks/debounce'); // node, commonjs
 *
 * function someMethodToInvokeDebounced() {}
 *
 * var debounced = debounce(someMethodToInvokeDebounced, 300);
 *
 * // invoke repeatedly
 * debounced();
 * debounced();
 * debounced();
 * debounced();
 * debounced();
 * debounced();    // last invoke of debounced()
 *
 * // invoke someMethodToInvokeDebounced() after 300 milliseconds.
 */
function debounce(fn, delay) {
  var timer, args;

  /* istanbul ignore next */
  delay = delay || 0;

  function debounced() { // eslint-disable-line require-jsdoc
    args = Array.prototype.slice.call(arguments);

    window.clearTimeout(timer);
    timer = window.setTimeout(function() {
      fn.apply(null, args);
    }, delay);
  }

  return debounced;
}

module.exports = debounce;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _forEachOwnProperties = _interopRequireDefault(__webpack_require__(6));

var _addClass = _interopRequireDefault(__webpack_require__(10));

var _css = _interopRequireDefault(__webpack_require__(12));

var _removeElement = _interopRequireDefault(__webpack_require__(28));

var _extend = _interopRequireDefault(__webpack_require__(8));

var _isExisty = _interopRequireDefault(__webpack_require__(29));

var _isNumber = _interopRequireDefault(__webpack_require__(31));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @class
 * @private
 * @classdesc Class representing floating layer of context menu
 */
var FloatingLayer =
/*#__PURE__*/
function () {
  /**
   * Create a floating layer
   * @constructor
   * @param {HTMLElement} manager - parent element contains floating layer
   */
  function FloatingLayer(manager) {
    /**
     * Base container element for each view instance
     * @type {HTMLElement}
     */
    this.container = document.createElement('div');
    this.initializeContainer(manager);
  }

  var _proto = FloatingLayer.prototype;

  _proto.initializeContainer = function initializeContainer(manager) {
    manager.appendChild(this.container);
    (0, _css["default"])(this.container, {
      display: 'none',
      position: 'absolute',
      'z-index': manager.zIndex
    });
    (0, _addClass["default"])(this.container, 'floating-layer');
  }
  /**
   * Destroy view instance
   */
  ;

  _proto.destroy = function destroy() {
    (0, _removeElement["default"])(this.container);
    this.container = null;
  }
  /**
   * Set layer content
   * @param {string} html - html string
   */
  ;

  _proto.setContent = function setContent(html) {
    this.container.innerHTML = html;
  }
  /**
   * Set container's size and position
   * @param {object} bound - bound rect
   *   @param {number} [options.top] - top pixel
   *   @param {number} [options.right] - right pixel
   *   @param {number} [options.bottom] - bottom pixel
   *   @param {number} [options.left] - left pixel
   *   @param {number} [options.width] - width pixel
   *   @param {number} [options.height] - height pixel
   */
  ;

  _proto.setBound = function setBound(bound) {
    var newBound = {};
    (0, _forEachOwnProperties["default"])(bound, function (value, prop) {
      if ((0, _isExisty["default"])(value)) {
        newBound[prop] = (0, _isNumber["default"])(value) ? "".concat(value, "px") : value;
      }
    });
    (0, _extend["default"])(this.container.style, newBound);
  }
  /**
   * Show layer
   */
  ;

  _proto.show = function show() {
    (0, _css["default"])(this.container, 'display', 'block');
  }
  /**
   * Hide layer
   */
  ;

  _proto.hide = function hide() {
    (0, _css["default"])(this.container, 'display', 'none');
  };

  return FloatingLayer;
}();

var _default = FloatingLayer;
exports["default"] = _default;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Remove element from parent node.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Remove element from parent node.
 * @param {HTMLElement} element - element to remove.
 * @memberof module:domUtil
 */
function removeElement(element) {
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
}

module.exports = removeElement;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Check whether the given variable is existing or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var isUndefined = __webpack_require__(5);
var isNull = __webpack_require__(30);

/**
 * Check whether the given variable is existing or not.
 * If the given variable is not null and not undefined, returns true.
 * @param {*} param - Target for checking
 * @returns {boolean} Is existy?
 * @memberof module:type
 * @example
 * var isExisty = require('tui-code-snippet/type/isExisty'); // node, commonjs
 *
 * isExisty(''); //true
 * isExisty(0); //true
 * isExisty([]); //true
 * isExisty({}); //true
 * isExisty(null); //false
 * isExisty(undefined); //false
*/
function isExisty(param) {
  return !isUndefined(param) && !isNull(param);
}

module.exports = isExisty;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Check whether the given variable is null or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Check whether the given variable is null or not.
 * If the given variable(arguments[0]) is null, returns true.
 * @param {*} obj - Target for checking
 * @returns {boolean} Is null?
 * @memberof module:type
 */
function isNull(obj) {
  return obj === null;
}

module.exports = isNull;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Check whether the given variable is a number or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Check whether the given variable is a number or not.
 * If the given variable is a number, return true.
 * @param {*} obj - Target for checking
 * @returns {boolean} Is number?
 * @memberof module:type
 */
function isNumber(obj) {
  return typeof obj === 'number' || obj instanceof Number;
}

module.exports = isNumber;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _inArray = _interopRequireDefault(__webpack_require__(0));

var _forEachArray = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @class
 * @ignore
 * @classdesc ES6 Map
 */
var Map =
/*#__PURE__*/
function () {
  function Map() {
    this._keys = [];
    this._values = [];
  }

  var _proto = Map.prototype;

  _proto._getKeyIndex = function _getKeyIndex(key) {
    return (0, _inArray["default"])(key, this._keys);
  };

  _proto.get = function get(key) {
    return this._values[this._getKeyIndex(key)];
  };

  _proto.set = function set(key, value) {
    var keyIndex = this._getKeyIndex(key);

    if (keyIndex > -1) {
      this._values[keyIndex] = value;
    } else {
      this._keys.push(key);

      this._values.push(value);
    }
  };

  _proto.has = function has(key) {
    return this._getKeyIndex(key) > -1;
  };

  _proto["delete"] = function _delete(key) {
    var keyIndex = this._getKeyIndex(key);

    if (keyIndex > -1) {
      this._keys.splice(keyIndex, 1);

      this._values.splice(keyIndex, 1);
    }
  };

  _proto.forEach = function forEach(callback) {
    var _this = this;

    var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
    (0, _forEachArray["default"])(this._values, function (value, index) {
      callback.call(thisArg, value, _this._keys[index], _this);
    });
  };

  return Map;
}();

var _default = Map;
exports["default"] = _default;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getMousePosition = exports.sendHostName = void 0;

var _sendHostname = _interopRequireDefault(__webpack_require__(34));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @fileoverview Utils for ContextMenu component
 */

/**
 * Send hostname for GA
 * @ignore
 */
var sendHostName = function sendHostName() {
  (0, _sendHostname["default"])('context-menu', 'UA-129987462-1');
};
/**
   * Get mouse postion
   * @param {MouseEvent} clickEvent - mouse event object
   * @returns {Object} object of mouse position contains left and top
   * @private
   */


exports.sendHostName = sendHostName;

var getMousePosition = function getMousePosition(clickEvent) {
  var left = clickEvent.pageX,
      top = clickEvent.pageY;
  return {
    left: left,
    top: top
  };
};

exports.getMousePosition = getMousePosition;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Send hostname on DOMContentLoaded.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var isUndefined = __webpack_require__(5);
var imagePing = __webpack_require__(35);

var ms7days = 7 * 24 * 60 * 60 * 1000;

/**
 * Check if the date has passed 7 days
 * @param {number} date - milliseconds
 * @returns {boolean}
 * @private
 */
function isExpired(date) {
  var now = new Date().getTime();

  return now - date > ms7days;
}

/**
 * Send hostname on DOMContentLoaded.
 * To prevent hostname set tui.usageStatistics to false.
 * @param {string} appName - application name
 * @param {string} trackingId - GA tracking ID
 * @ignore
 */
function sendHostname(appName, trackingId) {
  var url = 'https://www.google-analytics.com/collect';
  var hostname = location.hostname;
  var hitType = 'event';
  var eventCategory = 'use';
  var applicationKeyForStorage = 'TOAST UI ' + appName + ' for ' + hostname + ': Statistics';
  var date = window.localStorage.getItem(applicationKeyForStorage);

  // skip if the flag is defined and is set to false explicitly
  if (!isUndefined(window.tui) && window.tui.usageStatistics === false) {
    return;
  }

  // skip if not pass seven days old
  if (date && !isExpired(date)) {
    return;
  }

  window.localStorage.setItem(applicationKeyForStorage, new Date().getTime());

  setTimeout(function() {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      imagePing(url, {
        v: 1,
        t: hitType,
        tid: trackingId,
        cid: hostname,
        dp: hostname,
        dh: appName,
        el: appName,
        ec: eventCategory
      });
    }
  }, 1000);
}

module.exports = sendHostname;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Request image ping.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var forEachOwnProperties = __webpack_require__(6);

/**
 * @module request
 */

/**
 * Request image ping.
 * @param {String} url url for ping request
 * @param {Object} trackingInfo infos for make query string
 * @returns {HTMLElement}
 * @memberof module:request
 * @example
 * var imagePing = require('tui-code-snippet/request/imagePing'); // node, commonjs
 *
 * imagePing('https://www.google-analytics.com/collect', {
 *     v: 1,
 *     t: 'event',
 *     tid: 'trackingid',
 *     cid: 'cid',
 *     dp: 'dp',
 *     dh: 'dh'
 * });
 */
function imagePing(url, trackingInfo) {
  var trackingElement = document.createElement('img');
  var queryString = '';
  forEachOwnProperties(trackingInfo, function(value, key) {
    queryString += '&' + key + '=' + value;
  });
  queryString = queryString.substring(1);

  trackingElement.src = url + '?' + queryString;

  trackingElement.style.display = 'none';
  document.body.appendChild(trackingElement);
  document.body.removeChild(trackingElement);

  return trackingElement;
}

module.exports = imagePing;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = _default;

var _template = _interopRequireDefault(__webpack_require__(37));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable max-len */
function _default(context) {
  var source = "\n  {{if root}}\n  <div class=\"tui-contextmenu tui-contextmenu-root\">\n  {{/if}}\n    <ul class=\"tui-contextmenu-wrap\">\n      {{each menuItems}}\n        {{if @this[\"separator\"]}}\n        <li class=\"tui-contextmenu-separator\">\n        {{else}}\n        <li class=\"tui-contextmenu-item\">\n          {{if @this[\"menu\"]}}\n            {{if @this[\"disable\"]}}\n              <button type=\"button\" class=\"tui-contextmenu-button tui-contextmenu-has-submenu tui-contextmenu-disable\" data-command=\"{{@this[\"command\"]}}\">{{@this[\"title\"]}}</button>\n            {{else}}\n              <button type=\"button\" class=\"tui-contextmenu-button tui-contextmenu-has-submenu\" data-command=\"{{@this[\"command\"]}}\">{{@this[\"title\"]}}</button>\n              <div class=\"tui-contextmenu tui-contextmenu-submenu\" style=\"display:none\">\n                  {{tmpl @this[\"menu\"]}}\n              </div>\n              {{/if}}\n          {{else}}\n            {{if @this[\"disable\"]}}\n              <button type=\"button\" class=\"tui-contextmenu-button tui-contextmenu-disable\" data-command=\"{{@this[\"command\"]}}\">{{@this[\"title\"]}}</button>\n            {{else}}\n              <button type=\"button\" class=\"tui-contextmenu-button\" data-command=\"{{@this[\"command\"]}}\">{{@this[\"title\"]}}</button>\n            {{/if}}\n          {{/if}}\n        </li>\n        {{/if}}\n      {{/each}}\n    </ul>\n  {{if root}}\n  </div>\n  {{/if}}";
  return (0, _template["default"])(source, context);
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Convert text by binding expressions with context.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var inArray = __webpack_require__(0);
var forEach = __webpack_require__(2);
var isArray = __webpack_require__(4);
var isString = __webpack_require__(3);
var extend = __webpack_require__(8);

// IE8 does not support capture groups.
var EXPRESSION_REGEXP = /{{\s?|\s?}}/g;
var BRACKET_NOTATION_REGEXP = /^[a-zA-Z0-9_@]+\[[a-zA-Z0-9_@"']+\]$/;
var BRACKET_REGEXP = /\[\s?|\s?\]/;
var DOT_NOTATION_REGEXP = /^[a-zA-Z_]+\.[a-zA-Z_]+$/;
var DOT_REGEXP = /\./;
var STRING_NOTATION_REGEXP = /^["']\w+["']$/;
var STRING_REGEXP = /"|'/g;
var NUMBER_REGEXP = /^-?\d+\.?\d*$/;

var EXPRESSION_INTERVAL = 2;

var BLOCK_HELPERS = {
  'if': handleIf,
  'each': handleEach,
  'with': handleWith
};

var isValidSplit = 'a'.split(/a/).length === 3;

/**
 * Split by RegExp. (Polyfill for IE8)
 * @param {string} text - text to be splitted\
 * @param {RegExp} regexp - regular expression
 * @returns {Array.<string>}
 */
var splitByRegExp = (function() {
  if (isValidSplit) {
    return function(text, regexp) {
      return text.split(regexp);
    };
  }

  return function(text, regexp) {
    var result = [];
    var prevIndex = 0;
    var match, index;

    if (!regexp.global) {
      regexp = new RegExp(regexp, 'g');
    }

    match = regexp.exec(text);
    while (match !== null) {
      index = match.index;
      result.push(text.slice(prevIndex, index));

      prevIndex = index + match[0].length;
      match = regexp.exec(text);
    }
    result.push(text.slice(prevIndex));

    return result;
  };
})();

/**
 * Find value in the context by an expression.
 * @param {string} exp - an expression
 * @param {object} context - context
 * @returns {*}
 * @private
 */
// eslint-disable-next-line complexity
function getValueFromContext(exp, context) {
  var splitedExps;
  var value = context[exp];

  if (exp === 'true') {
    value = true;
  } else if (exp === 'false') {
    value = false;
  } else if (STRING_NOTATION_REGEXP.test(exp)) {
    value = exp.replace(STRING_REGEXP, '');
  } else if (BRACKET_NOTATION_REGEXP.test(exp)) {
    splitedExps = exp.split(BRACKET_REGEXP);
    value = getValueFromContext(splitedExps[0], context)[getValueFromContext(splitedExps[1], context)];
  } else if (DOT_NOTATION_REGEXP.test(exp)) {
    splitedExps = exp.split(DOT_REGEXP);
    value = getValueFromContext(splitedExps[0], context)[splitedExps[1]];
  } else if (NUMBER_REGEXP.test(exp)) {
    value = parseFloat(exp);
  }

  return value;
}

/**
 * Extract elseif and else expressions.
 * @param {Array.<string>} ifExps - args of if expression
 * @param {Array.<string>} sourcesInsideBlock - sources inside if block
 * @returns {object} - exps: expressions of if, elseif, and else / sourcesInsideIf: sources inside if, elseif, and else block.
 * @private
 */
function extractElseif(ifExps, sourcesInsideBlock) {
  var exps = [ifExps];
  var sourcesInsideIf = [];
  var otherIfCount = 0;
  var start = 0;

  // eslint-disable-next-line complexity
  forEach(sourcesInsideBlock, function(source, index) {
    if (source.indexOf('if') === 0) {
      otherIfCount += 1;
    } else if (source === '/if') {
      otherIfCount -= 1;
    } else if (!otherIfCount && (source.indexOf('elseif') === 0 || source === 'else')) {
      exps.push(source === 'else' ? ['true'] : source.split(' ').slice(1));
      sourcesInsideIf.push(sourcesInsideBlock.slice(start, index));
      start = index + 1;
    }
  });

  sourcesInsideIf.push(sourcesInsideBlock.slice(start));

  return {
    exps: exps,
    sourcesInsideIf: sourcesInsideIf
  };
}

/**
 * Helper function for "if". 
 * @param {Array.<string>} exps - array of expressions split by spaces
 * @param {Array.<string>} sourcesInsideBlock - array of sources inside the if block
 * @param {object} context - context
 * @returns {string}
 * @private
 */
function handleIf(exps, sourcesInsideBlock, context) {
  var analyzed = extractElseif(exps, sourcesInsideBlock);
  var result = false;
  var compiledSource = '';

  forEach(analyzed.exps, function(exp, index) {
    result = handleExpression(exp, context);
    if (result) {
      compiledSource = compile(analyzed.sourcesInsideIf[index], context);
    }

    return !result;
  });

  return compiledSource;
}

/**
 * Helper function for "each".
 * @param {Array.<string>} exps - array of expressions split by spaces
 * @param {Array.<string>} sourcesInsideBlock - array of sources inside the each block
 * @param {object} context - context
 * @returns {string}
 * @private
 */
function handleEach(exps, sourcesInsideBlock, context) {
  var collection = handleExpression(exps, context);
  var additionalKey = isArray(collection) ? '@index' : '@key';
  var additionalContext = {};
  var result = '';

  forEach(collection, function(item, key) {
    additionalContext[additionalKey] = key;
    additionalContext['@this'] = item;
    extend(context, additionalContext);

    result += compile(sourcesInsideBlock.slice(), context);
  });

  return result;
}

/**
 * Helper function for "with ... as"
 * @param {Array.<string>} exps - array of expressions split by spaces
 * @param {Array.<string>} sourcesInsideBlock - array of sources inside the with block
 * @param {object} context - context
 * @returns {string}
 * @private
 */
function handleWith(exps, sourcesInsideBlock, context) {
  var asIndex = inArray('as', exps);
  var alias = exps[asIndex + 1];
  var result = handleExpression(exps.slice(0, asIndex), context);

  var additionalContext = {};
  additionalContext[alias] = result;

  return compile(sourcesInsideBlock, extend(context, additionalContext)) || '';
}

/**
 * Extract sources inside block in place.
 * @param {Array.<string>} sources - array of sources
 * @param {number} start - index of start block
 * @param {number} end - index of end block
 * @returns {Array.<string>}
 * @private
 */
function extractSourcesInsideBlock(sources, start, end) {
  var sourcesInsideBlock = sources.splice(start + 1, end - start);
  sourcesInsideBlock.pop();

  return sourcesInsideBlock;
}

/**
 * Handle block helper function
 * @param {string} helperKeyword - helper keyword (ex. if, each, with)
 * @param {Array.<string>} sourcesToEnd - array of sources after the starting block
 * @param {object} context - context
 * @returns {Array.<string>}
 * @private
 */
function handleBlockHelper(helperKeyword, sourcesToEnd, context) {
  var executeBlockHelper = BLOCK_HELPERS[helperKeyword];
  var helperCount = 1;
  var startBlockIndex = 0;
  var endBlockIndex;
  var index = startBlockIndex + EXPRESSION_INTERVAL;
  var expression = sourcesToEnd[index];

  while (helperCount && isString(expression)) {
    if (expression.indexOf(helperKeyword) === 0) {
      helperCount += 1;
    } else if (expression.indexOf('/' + helperKeyword) === 0) {
      helperCount -= 1;
      endBlockIndex = index;
    }

    index += EXPRESSION_INTERVAL;
    expression = sourcesToEnd[index];
  }

  if (helperCount) {
    throw Error(helperKeyword + ' needs {{/' + helperKeyword + '}} expression.');
  }

  sourcesToEnd[startBlockIndex] = executeBlockHelper(
    sourcesToEnd[startBlockIndex].split(' ').slice(1),
    extractSourcesInsideBlock(sourcesToEnd, startBlockIndex, endBlockIndex),
    context
  );

  return sourcesToEnd;
}

/**
 * Helper function for "custom helper".
 * If helper is not a function, return helper itself.
 * @param {Array.<string>} exps - array of expressions split by spaces (first element: helper)
 * @param {object} context - context
 * @returns {string}
 * @private
 */
function handleExpression(exps, context) {
  var result = getValueFromContext(exps[0], context);

  if (result instanceof Function) {
    return executeFunction(result, exps.slice(1), context);
  }

  return result;
}

/**
 * Execute a helper function.
 * @param {Function} helper - helper function
 * @param {Array.<string>} argExps - expressions of arguments
 * @param {object} context - context
 * @returns {string} - result of executing the function with arguments
 * @private
 */
function executeFunction(helper, argExps, context) {
  var args = [];
  forEach(argExps, function(exp) {
    args.push(getValueFromContext(exp, context));
  });

  return helper.apply(null, args);
}

/**
 * Get a result of compiling an expression with the context.
 * @param {Array.<string>} sources - array of sources split by regexp of expression.
 * @param {object} context - context
 * @returns {Array.<string>} - array of sources that bind with its context
 * @private
 */
function compile(sources, context) {
  var index = 1;
  var expression = sources[index];
  var exps, firstExp, result;

  while (isString(expression)) {
    exps = expression.split(' ');
    firstExp = exps[0];

    if (BLOCK_HELPERS[firstExp]) {
      result = handleBlockHelper(firstExp, sources.splice(index, sources.length - index), context);
      sources = sources.concat(result);
    } else {
      sources[index] = handleExpression(exps, context);
    }

    index += EXPRESSION_INTERVAL;
    expression = sources[index];
  }

  return sources.join('');
}

/**
 * Convert text by binding expressions with context.
 * <br>
 * If expression exists in the context, it will be replaced.
 * ex) '{{title}}' with context {title: 'Hello!'} is converted to 'Hello!'.
 * An array or object can be accessed using bracket and dot notation.
 * ex) '{{odds\[2\]}}' with context {odds: \[1, 3, 5\]} is converted to '5'.
 * ex) '{{evens\[first\]}}' with context {evens: \[2, 4\], first: 0} is converted to '2'.
 * ex) '{{project\["name"\]}}' and '{{project.name}}' with context {project: {name: 'CodeSnippet'}} is converted to 'CodeSnippet'.
 * <br>
 * If replaced expression is a function, next expressions will be arguments of the function.
 * ex) '{{add 1 2}}' with context {add: function(a, b) {return a + b;}} is converted to '3'.
 * <br>
 * It has 3 predefined block helpers '{{helper ...}} ... {{/helper}}': 'if', 'each', 'with ... as ...'.
 * 1) 'if' evaluates conditional statements. It can use with 'elseif' and 'else'.
 * 2) 'each' iterates an array or object. It provides '@index'(array), '@key'(object), and '@this'(current element).
 * 3) 'with ... as ...' provides an alias.
 * @param {string} text - text with expressions
 * @param {object} context - context
 * @returns {string} - text that bind with its context
 * @memberof module:domUtil
 * @example
 * var template = require('tui-code-snippet/domUtil/template');
 * 
 * var source = 
 *     '<h1>'
 *   +   '{{if isValidNumber title}}'
 *   +     '{{title}}th'
 *   +   '{{elseif isValidDate title}}'
 *   +     'Date: {{title}}'
 *   +   '{{/if}}'
 *   + '</h1>'
 *   + '{{each list}}'
 *   +   '{{with addOne @index as idx}}'
 *   +     '<p>{{idx}}: {{@this}}</p>'
 *   +   '{{/with}}'
 *   + '{{/each}}';
 * 
 * var context = {
 *   isValidDate: function(text) {
 *     return /^\d{4}-(0|1)\d-(0|1|2|3)\d$/.test(text);
 *   },
 *   isValidNumber: function(text) {
 *     return /^\d+$/.test(text);
 *   }
 *   title: '2019-11-25',
 *   list: ['Clean the room', 'Wash the dishes'],
 *   addOne: function(num) {
 *     return num + 1;
 *   }
 * };
 * 
 * var result = template(source, context);
 * console.log(result); // <h1>Date: 2019-11-25</h1><p>1: Clean the room</p><p>2: Wash the dishes</p>
 */
function template(text, context) {
  return compile(splitByRegExp(text, EXPRESSION_REGEXP), context);
}

module.exports = template;


/***/ })
/******/ ]);
});