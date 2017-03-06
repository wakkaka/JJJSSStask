/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __weex_template__ = __webpack_require__(1)
	var __weex_style__ = __webpack_require__(2)
	var __weex_script__ = __webpack_require__(3)

	__weex_define__('@weex-component/3b5422367f53c4cbd76a15d400db362f', [], function(__weex_require__, __weex_exports__, __weex_module__) {

	    __weex_script__(__weex_module__, __weex_exports__, __weex_require__)
	    if (__weex_exports__.__esModule && __weex_exports__.default) {
	      __weex_module__.exports = __weex_exports__.default
	    }

	    __weex_module__.exports.template = __weex_template__

	    __weex_module__.exports.style = __weex_style__

	})

	__weex_bootstrap__('@weex-component/3b5422367f53c4cbd76a15d400db362f',undefined,undefined)

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = {
	  "type": "div",
	  "classList": [
	    "wrapper"
	  ],
	  "children": [
	    {
	      "type": "div",
	      "classList": [
	        "inner"
	      ],
	      "children": [
	        {
	          "type": "div",
	          "classList": [
	            "water"
	          ],
	          "children": [
	            {
	              "type": "image",
	              "classList": [
	                "img"
	              ],
	              "attr": {
	                "src": "../../water.png"
	              }
	            },
	            {
	              "type": "text",
	              "attr": {
	                "value": "记点滴"
	              }
	            }
	          ]
	        },
	        {
	          "type": "div",
	          "classList": [
	            "diary"
	          ],
	          "children": [
	            {
	              "type": "image",
	              "classList": [
	                "img"
	              ],
	              "attr": {
	                "src": "../../logo.png"
	              }
	            },
	            {
	              "type": "text",
	              "attr": {
	                "value": "写日记"
	              }
	            }
	          ]
	        },
	        {
	          "type": "div",
	          "classList": [
	            "sum"
	          ],
	          "children": [
	            {
	              "type": "div",
	              "classList": [
	                "sumDiv"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "sumCont"
	                  ],
	                  "attr": {
	                    "value": "1"
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "sumCont"
	                  ],
	                  "attr": {
	                    "value": "点滴"
	                  }
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "classList": [
	                "sumDiv"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "sumCont"
	                  ],
	                  "attr": {
	                    "value": "0"
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "sumCont"
	                  ],
	                  "attr": {
	                    "value": "日记"
	                  }
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "classList": [
	                "sumDiv"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "sumCont"
	                  ],
	                  "attr": {
	                    "value": "1"
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "sumCont"
	                  ],
	                  "attr": {
	                    "value": "本月"
	                  }
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "classList": [
	                "sumDiv"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "sumCont"
	                  ],
	                  "attr": {
	                    "value": "1"
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "sumCont"
	                  ],
	                  "attr": {
	                    "value": "今天"
	                  }
	                }
	              ]
	            }
	          ]
	        }
	      ]
	    },
	    {
	      "type": "scroller",
	      "classList": [
	        "oRoller"
	      ],
	      "children": [
	        {
	          "type": "div",
	          "classList": [
	            "item"
	          ],
	          "repeat": {
	            "expression": function () {return this.items},
	            "value": "item"
	          },
	          "id": function () {return 'item-' + (this.$index)},
	          "children": [
	            {
	              "type": "div",
	              "classList": [
	                "item-content"
	              ],
	              "children": [
	                {
	                  "type": "div",
	                  "classList": [
	                    "item-imgbox"
	                  ],
	                  "children": [
	                    {
	                      "type": "image",
	                      "classList": [
	                        "item-img"
	                      ],
	                      "attr": {
	                        "src": function () {return this.item.img},
	                        "alt": ""
	                      }
	                    }
	                  ]
	                },
	                {
	                  "type": "div",
	                  "classList": [
	                    "item-info"
	                  ],
	                  "children": [
	                    {
	                      "type": "div",
	                      "classList": [
	                        "item-info-detail"
	                      ],
	                      "children": [
	                        {
	                          "type": "text",
	                          "classList": [
	                            "title"
	                          ],
	                          "attr": {
	                            "value": function () {return this.item.title}
	                          }
	                        },
	                        {
	                          "type": "div",
	                          "classList": [
	                            "detail-info"
	                          ],
	                          "children": [
	                            {
	                              "type": "text",
	                              "classList": [
	                                "desc"
	                              ],
	                              "attr": {
	                                "value": function () {return this.item.desc}
	                              }
	                            }
	                          ]
	                        }
	                      ]
	                    }
	                  ]
	                },
	                {
	                  "type": "div",
	                  "classList": [
	                    "item-rightbox"
	                  ],
	                  "children": [
	                    {
	                      "type": "image",
	                      "classList": [
	                        "item-right"
	                      ],
	                      "attr": {
	                        "src": function () {return this.item.right},
	                        "alt": ""
	                      }
	                    }
	                  ]
	                }
	              ]
	            }
	          ]
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "classList": [
	        "up"
	      ],
	      "events": {
	        "click": "goToTop"
	      },
	      "children": [
	        {
	          "type": "image",
	          "classList": [
	            "img"
	          ],
	          "attr": {
	            "src": ""
	          }
	        }
	      ]
	    }
	  ]
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {
	  "header": {
	    "padding": 25,
	    "backgroundColor": "#37c7e0",
	    "borderBottomColor": "#37c7e0",
	    "borderBottomWidth": 2,
	    "borderBottomStyle": "solid"
	  },
	  "oRoller": {
	    "display": "flex"
	  },
	  "item": {
	    "padding": 20,
	    "flex": 1,
	    "borderBottomWidth": 1,
	    "borderBottomStyle": "solid",
	    "borderBottomColor": "#37c7e0"
	  },
	  "item-content": {
	    "flexDirection": "row",
	    "backgroundColor": "#ffffff"
	  },
	  "item-imgbox": {
	    "height": 70,
	    "width": 70,
	    "marginRight": 20,
	    "marginTop": 30
	  },
	  "item-img": {
	    "width": 70,
	    "height": 70
	  },
	  "item-rightbox": {
	    "height": 50,
	    "width": 50,
	    "marginLeft": 40,
	    "marginTop": 30
	  },
	  "item-right": {
	    "width": 50,
	    "height": 50
	  },
	  "item-info": {
	    "height": 130,
	    "width": 510,
	    "justifyContent": "center",
	    "position": "relative"
	  },
	  "item-info-detail": {
	    "position": "relative",
	    "color": "#A2A2A2"
	  },
	  "desc": {
	    "lines": 4,
	    "textOverflow": "ellipsis",
	    "fontSize": 26,
	    "lineHeight": 30,
	    "color": "#44818c"
	  },
	  "title": {
	    "lines": 1,
	    "textOverflow": "ellipsis",
	    "fontSize": 32,
	    "color": "#44818c",
	    "lineHeight": 40
	  },
	  "detail-info": {
	    "marginTop": 15
	  },
	  "inner": {
	    "padding": 30,
	    "paddingBottom": 10,
	    "paddingTop": 100,
	    "backgroundColor": "#37c7e0",
	    "color": "#ffffff"
	  },
	  "water": {
	    "paddingRight": 120,
	    "paddingBottom": 25,
	    "position": "absolute",
	    "left": 150,
	    "borderRightColor": "#cccccc",
	    "borderRightWidth": 1,
	    "borderRightStyle": "solid"
	  },
	  "diary": {
	    "paddingBottom": 25,
	    "left": 450
	  },
	  "sum": {
	    "display": "flex",
	    "flexDirection": "row",
	    "justifyContent": "space-between",
	    "paddingLeft": 30,
	    "paddingRight": 30,
	    "marginTop": 50
	  },
	  "sumDiv": {
	    "textAlign": "center"
	  },
	  "sumCont": {
	    "fontSize": 25
	  },
	  "wrapper": {
	    "position": "absolute",
	    "top": 0,
	    "right": 0,
	    "bottom": 0,
	    "left": 0
	  },
	  "up": {
	    "width": 70,
	    "height": 70,
	    "position": "fixed",
	    "right": 20,
	    "bottom": 20
	  },
	  "img": {
	    "width": 95,
	    "height": 95
	  }
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function(module, exports, __weex_require__){'use strict';

	var dom = __weex_require__('@weex-module/dom') || {};

	module.exports = {
	  data: function () {return {
	    items: [{
	      img: '../../timeline.png',
	      title: '时间轴',
	      desc: '轻轻拨动时间轴线，重温珍藏的记忆',
	      right: '../../arrow.png'
	    }, {
	      img: '../../camera.png',
	      title: '相册',
	      desc: '感动瞬间常在，让记忆不再泛黄',
	      right: '../../arrow.png'
	    }, {
	      img: '../../calendar.png',
	      title: '日历与十年今日',
	      desc: '你过去的每一天，都记录在这里',
	      right: '../../arrow.png'
	    }, {
	      img: '../../collection.png',
	      title: '日记集',
	      desc: '人生，只有一次，日记是你岁月的保险柜',
	      right: '../../arrow.png'
	    }, {
	      img: '../../search.png',
	      title: '搜索与标签',
	      desc: '给记录分类，让回忆变得更清晰',
	      right: '../../arrow.png'
	    }, {
	      img: '../../star.png',
	      title: '纪念日',
	      desc: '人生短暂，纪念每一个重要的日子',
	      right: '../../arrow.png'
	    }, {
	      img: '../../setting.png',
	      title: '设置',
	      right: '../../arrow.png'
	    }]
	  }},
	  created: function created() {},
	  methods: {
	    goToTop: function goToTop(e) {
	      dom.scrollToElement(this.$el('item-0'), {
	        offset: -100
	      });
	    }
	  }
	};}
	/* generated by weex-loader */


/***/ }
/******/ ]);