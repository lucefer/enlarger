(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["enlarger"] = factory();
	else
		root["enlarger"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.enlarger = undefined;
	
	var _enlarger = __webpack_require__(1);
	
	exports.enlarger = _enlarger.enlarger;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.enlarger = undefined;
	
	var _helper = __webpack_require__(2);
	
	var helper = _interopRequireWildcard(_helper);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	//elements related
	var mask = document.createElement('div'),
	    wrapper = document.createElement('div'),
	    targetEle,
	    targetInsteadHolder,
	    parentEle,
	    browserPrefix = 'webkitAppearance' in document.style ? '-webkit-' : '';
	//state
	var shown = false,
	    locked = false,
	    oldStyle;
	var viewBox;
	
	var options = {
		bgColor: '#FFF',
		transitionDuration: '0.5s',
		transitionTimingFunction: 'cubic-bezier(0.5,0,0,1)',
		zoomWidth: 300,
		zoomHeight: 300,
		beforeOpened: null,
		beforeClosed: null,
		afterOpened: null,
		afterClosed: null
	};
	
	var transitionPrefix = helper.getTrans(),
	    transitionProp = transitionPrefix.transition,
	    transformProp = transitionPrefix.transform,
	    transEndEvent = transitionPrefix.transEnd;
	
	var maskStyle = {
		position: 'fixed',
		display: 'none',
		zIndex: '99000',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		opacity: 0,
		backgroundColor: options.bgColor
	
	};
	helper.setStyle(mask, maskStyle);
	
	var stylesCausedReflow = ['position', 'display', 'float', 'left', 'right', 'top', 'bottom', 'font', 'line-height', 'vertical-align', 'margin-top', 'margin-right', 'margin-left', 'margin-right'];
	
	var enlarger = {
		config: function config(opts) {
			for (var key in opts) {
				options[key] = opts[key];
			}
	
			helper.setStyle(mask, {
				backgroundColor: options.bgColor,
				transition: 'opacity ' + transitionDuration + ' ' + transitionTimingFunction
	
			});
	
			return this;
		},
	
		show: function show(el, cb) {
			if (shown || locked) return;
	
			target = typeof el === 'string' ? document.querySelector(el) : el;
	
			if (options.beforeOpened) options.beforeOpened(target);
	
			shown = locked = true;
	
			parentEle = target.parentNode;
	
			var box = target.getBoundingClientRect();
	
			viewBox = document.documentElement.getBoundingClientRect();
	
			var holder = helper.copyStyles(stylesCausedReflow, target, box);
	
			oldStyle = helper.setStyle(target, {
				position: 'absolute',
				top: 0,
				left: 0,
				right: '',
				bottom: '',
				marginTop: -box.height / 2 + "px",
				marginLeft: -box.width / 2 + "px",
				cursor: browserPrefix + "zoom-out",
				transform: 'translate(' + (box.left - (viewBox.width - box.width) / 2) + 'px,' + (box.top - (viewBox.height - box.height) / 2) + 'px)',
				transition: ''
	
			}, true);
	
			wrapper.appendChild(target);
	
			parentEle.insertBefore(holder, target);
			parentEle.appendChild(mask);
			parentEle.appendChild(wrapper);
			wrapper.appendChild(target);
	
			target.offsetWidth;
			mask.style.opacity = options.opacity;
			helper.setStyle(target, {
				transform: 'scale(' + options.maxWidth / box.width + ')',
				transition: transformProp + ' ' + transitionDuration + ' ' + transitionTimingFunction
			});
	
			traget.addEventListener(transEndEvent, function end() {
				target.removeEventListener(transEndEvent, end);
				cb = cb || options.afterOpened;
				if (cb) {
					cb(target);
				}
				locked = false;
			});
			return this;
		},
		close: function close(cb) {
			if (!shown || locked) return;
			locked = true;
	
			if (options.beforeClosed) options.beforeClosed(target);
	
			var pBox = holder.getBoundingClientRect(),
			    dx = pBox.left - (viewBox.width - pBox.width) / 2,
			    dy = pBox.top - (viewBox.height - pBox.height) / 2;
	
			mask.style.opacity = 0;
			helper.setStyle(target, {
				transform: 'translate(' + dx + 'px,' + dy + 'px)'
			});
	
			target.addEventListener(transEndEvent, function end() {
				target.removeEventListener(transEndEvent, end);
	
				helper.setStyle(target, helper.extendStyle(oldStyle, { transform: 'none' }));
	
				parentEle.insertBefore(target, holder);
				parentEle.removeChild(holder);
				parentEle.removeChild(wrapper);
				parentEle.removeChild(mask);
	
				mask.style.display = "none";
				holder = null;
	
				shown = locked = false, cb = cb || option.afterClosed;
				if (cb) cb(target);
			});
			return this;
		},
		watch: function watch(el) {
			if (typeof el === 'string') {
				var elArr = document.querySelectorAll(el),
				    l = elArr.length;
	
				while (l--) {
					this.watch(elArr[l]);
				}
				return;
			}
	
			setStyle(el, {
				'cursor': browserPrefix + 'zoom-in'
			});
	
			el.addEventListener("click", function (e) {
				e.stopPropagation();
				if (shown) {
					enlarger.close();
				} else {
					enlarger.open();
				}
			});
			return this;
		}
	
	};
	
	mask.addEventListener("click", enlarger.close);
	wrapper.addEventListener("click", enlarger.close);
	
	exports.enlarger = enlarger;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getTrans = getTrans;
	exports.setStyle = setStyle;
	exports.extendStyle = extendStyle;
	exports.copyStyle = copyStyle;
	function getTrans() {
	    var ret = {},
	        trans = ['webkitTransition', 'transition', 'MozTransition'],
	        tform = ['webkitTransform', 'transform', 'MozTransform'],
	        end = {
	        'transition': 'transitionend',
	        'MozTransition': 'transitionend',
	        'webkitTransition': 'webkitTransitionEnd'
	    },
	        checkedStyle = document.body.style;
	
	    trans.some(function (prop) {
	        if (checkedStyle[prop] !== undefined) {
	            ret.transition = prop;
	            ret.transEnd = end[prop];
	            return true;
	        }
	    });
	    tform.some(function (prop) {
	        if (checkedStyle[prop] !== undefined) {
	            ret.transform = prop;
	            return true;
	        }
	    });
	    return ret;
	}
	function checkTrans(transitionPrefix, styles) {
	    if (styles.transition) {
	        styles[transitionPrefix.transition] = styles.transition;
	    }
	    if (styles.transform) {
	        styles[transitionPrefix.transform] = styles.transform;
	    }
	}
	function setStyle(el, styles, remember) {
	    checkTrans(styles);
	    var s = el.style,
	        original = {};
	    for (var key in styles) {
	        if (remember) {
	            original[key] = s[key] || '';
	        }
	        s[key] = styles[key];
	    }
	    return original;
	}
	function extendStyle(originalstyle, targetStyle) {
	    for (var i in targetStyle) {
	        originalstyle[i] = targetStyle[i];
	    }
	    return originalstyle;
	}
	function copyStyle(styles, targetEle, rect) {
	
	    var holder = document.createElement('div'),
	        targetStyles = getComputedStyle(targetEle),
	        l = styles.length,
	        key;
	
	    while (l--) {
	        key = styles[l];
	        holder[key] = targetStyles[key];
	    }
	
	    setStyle(holder, {
	        visiblity: 'hidden',
	        width: rect.width + 'px',
	        height: rect.height + 'px',
	        display: targetStyles.display === 'inline' ? 'inline-block' : targetStyles.display
	
	    });
	
	    return holder;
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=enlarger.js.map