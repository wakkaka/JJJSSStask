/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function Sum()
{
	this.initialize.apply(this, arguments)
	console.log(this.doSum())
}

Sum.prototype = {
	initialize : function(items)
	{
		var tem = items.split('|').slice(11)
		this.items = items.split('|').slice(0,10)

		this.items = this.items.concat(tem) //最终得分的数组
		console.log( this.items )
	},

	trans : function(i,flag)
	{
	    var oFlag = flag || false //是否只返回第一位数

		if( this.items[i].indexOf('X') > -1) {
				//strike
				if(oFlag) {
					if(this.items[i].substring(1) == '-') {
						return 0
					} else {
						return parseInt(this.items[i].substring(1))
					}
				} else {
					return 10	
				}			
			} else if (this.items[i].indexOf('/') > -1) {
				//spare
				if(oFlag) {
					return parseInt(this.items[i].substring(0,1))
				} else {
					return 10
				}
			} else if (this.items[i].indexOf('-') > -1) {
				//miss
				if(oFlag) {
					return this.items[i].indexOf('-') == 0 ? 0 : parseInt(this.items[i].substring(0,1))
				} else {
					return this.items[i].indexOf('-') == 0 ? parseInt(this.items[i].substring(1)) : parseInt(this.items[i].substring(0,1))
				}
			} else {
				if(oFlag) {
					return parseInt(this.items[i].substring(0,1))
				} else {
					return (parseInt(this.items[i].substring(0,1)) + parseInt(this.items[i].substring(1)) )
				}
				
			}
	},

	doSum : function()
	{
		var sum = 0,
			i

		for(i=0;i<9;i++) {
			if( this.items[i].indexOf('X') > -1) {
				//strike
				sum += 10
				if(this.items[i+1].indexOf('X') > -1) {
					//第二位也是 X
					sum += 10
					if(this.items[i+2].indexOf('X')>-1) {
						//第三位也是 X
						sum += 10
					} else {
						//第三位是其他
						sum += this.trans( i+2, true )
					}
				} else {
					//第二位是其他
					sum += this.trans( i+1 )
				}
 
			} else if (this.items[i].indexOf('/') > -1) {
				//spare
				sum += 10
				if(this.items[i+1].indexOf('X')>-1) {
					//下一位是 X
					sum += 10
				} else {
					//下一位是其他
					sum += this.trans( i+1, true )
				}
				
			} else{
				//miss or normal
				sum += this.trans(i)
			}
		}

		if(this.items[9] == 'X') {
			//最后一次为 strike
			sum += 10
			if(this.items[10].substring(0,1) == 'X') {
				//额外机会为 X_
				sum += 10
				if(this.items[10].substring(1) == 'X') {
					//额外机会为 XX
					sum += 10
				} else {
					//额外机会为 X?
					sum += this.trans( 10, true )
				}
			} else {
				//额外机会为 __				
				if(this.items[10].substring(1) == 'X') {
					//额外机会为 _X
					sum += parseInt(this.items[10].substring(0,1))
					sum += 10
				} else {
					//额外机会为 _?
					sum += this.trans( 10 )
				}
			}
		} else if (this.items[9].indexOf('/') > -1) {
			//最后一次为spare
			sum += 10
			sum += this.trans( 10, true )
			
		} else {
			//normal
			sum += this.trans(9)
			
		}

		return sum
	}

}

/* harmony default export */ __webpack_exports__["a"] = (Sum);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sum_js__ = __webpack_require__(0);


var sumTest = new __WEBPACK_IMPORTED_MODULE_0__sum_js__["a" /* default */]('5/|5/|5/|5/|5/|5/|5/|5/|5/|5/||5')

/***/ })
/******/ ]);