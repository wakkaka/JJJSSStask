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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

//通用功能
var utility = {};

'use strict';
//通过选择器获得元素
utility.qs = function (selector, scope) {
	return (scope || document).querySelector(selector);
};
utility.qsa = function (selector, scope) {
	return (scope || document).querySelectorAll(selector);
};

//绑定事件
utility.$on = function (target, type, callback, useCapture) {
	target.addEventListener(type, callback, !!useCapture);
};
//给符合选择器的元素绑定事件
utility.$delegate = function (target, selector, type, handler) {
	function dispatchEvent(event) {
		var targetElement = event.target;
		var potentialElements = utility.qsa(selector, target);
		var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;
		if (hasMatch) {
			handler.call(targetElement, event);
		}
	}
	var useCapture = type === 'blur' || type === 'focus';
	utility.$on(target, type, dispatchEvent, useCapture);
};

//找到给定标签名的父节点
utility.$parent = function (element, tagName) {
	if (!element.parentNode) {
		return;
	}
	//console.log(element.parentNode);
	if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
		return element.parentNode;
	}
	return utility.$parent(element.parentNode, tagName);
};
//找到给定标签名的子节点
utility.$child = function (element, tagName) {
	if (!element.childNodes) {
		return;
	}
	//console.log(element.childNodes);
	for (var i = 0, len = element.childNodes.length; i < len; i++) {
		var this_childNode = element.childNodes[i];
		//console.log('tagName' in this_childNode);
		if ('tagName' in this_childNode) {
			//console.log(this_childNode);
			if (this_childNode.tagName.toLowerCase() === tagName.toLowerCase()) {
				return this_childNode;
			}
		}
	}
};
//获取当前的时间,eg:2017-3-17
utility.date = function () {
	var time = new Date();
	var month = time.getMonth() + 1;
	var t = time.getFullYear() + '-' + month + '-' + time.getDate();
	return t;
};

module.exports = utility;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var utility = __webpack_require__(0);
var Store = {};

//在客户端新建一个存储对象，并新建一个 data
Store.store = function (name, callback) {
	callback = callback || function () {};

	window._dbName = name;

	if (!localStorage[name]) {
		var data = {
			todos: [],
			class_1: [],
			class_2: []
		};

		data.class_1[0] = '默认分类';
		data.class_2[0] = null;
		localStorage[name] = JSON.stringify(data);
	}

	callback.call(this, JSON.parse(localStorage[name]));
};

//更新客户端存储对象
Store.save = function (updateData, callback, id) {
	var data = JSON.parse(localStorage[window._dbName]); //JSON.parse()  JSON-->JS
	var todos = data.todos;
	//console.log(todos);

	callback = callback || function () {};

	// 如果id存在，则更新id的数据
	if (id) {
		//console.log(id);
		//console.log(updateData);
		for (var i = 0; i < todos.length; i++) {
			if (todos[i].id == id) {
				//console.log("find it!");
				for (var key in updateData) {
					todos[i][key] = updateData[key];
				}
				//console.log(todos);
				break;
			}
		}

		localStorage[window._dbName] = JSON.stringify(data);
		callback.call(this, todos);
	} else {
		// 如果id不存在，则创建一个新id
		updateData.id = new Date().getTime();

		todos.push(updateData);
		localStorage[window._dbName] = JSON.stringify(data);
		utility.qs('.todo_title_span').id = updateData.id;
		callback.call(this, [updateData]);
	}
};

Store.remove = function (id) {
	var data = JSON.parse(localStorage[window._dbName]);
	var todos = data.todos;

	for (var i = 0; i < todos.length; i++) {
		if (todos[i].id == id) {
			todos.splice(i, 1); //splice()直接对数组进行修改，slice()则不会
			break;
		}
	}
	localStorage[window._dbName] = JSON.stringify(data); //将数据转成JSON格式	
};

module.exports = Store;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(4)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/.0.27.2@css-loader/index.js!./style.css", function() {
			var newContent = require("!!../node_modules/.0.27.2@css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var utility = __webpack_require__(0);
var Store = __webpack_require__(1);
var List = {};

List.id = "";

//新建一个localstorage
Store.store("newtodos");
console.log(localStorage[window._dbName]);
console.log(JSON.parse(localStorage[window._dbName]).todos);

//新建分类，在当前选中的目录下新建分类
List.addNewTypeList = function () {
	var add_class_name = prompt('请输入新建分类的名称');
	//获取当前所点击的类级
	var now_click = utility.qs('.list_item_select');

	//获取localstorage中的class
	var data = JSON.parse(localStorage[window._dbName]);
	var class_1 = data.class_1;
	var class_2 = data.class_2;

	if (now_click.className.indexOf('allClass') >= 0) {
		//新建一个一级类
		if (add_class_name != null) {
			var add_to_location = utility.$child(utility.$parent(utility.qs('.list_item_select'), 'ul'), 'ul');
			//console.log(add_to_location);
			var new_class_list = document.createElement('li');
			new_class_list.innerHTML = "<i class='type_file_icon'></i><span  class='" + "_" + add_class_name + " 1stClass" + "'>" + add_class_name + "</span><i class='delete_icon'></i>";
			add_to_location.appendChild(new_class_list);
			new_class_list = document.createElement('ul');
			new_class_list.className = 'type_item';
			utility.qs('.type_list_all').appendChild(new_class_list);

			class_1[class_1.length] = add_class_name;
			class_2[class_1.length - 1] = null;
			localStorage[window._dbName] = JSON.stringify(data);
			console.log(localStorage[window._dbName]);
		}
	} else {
		//新建一个二级类
		if (add_class_name != null) {
			var add_to_location = utility.$parent(utility.qs('.list_item_select'), 'li').nextSibling;
			console.log(add_to_location);
			var new_class_list = document.createElement('li');
			new_class_list.innerHTML = "<i class='type_item_icon'></i><span class='" + "_" + add_class_name + " 2ndClass" + "'>" + add_class_name + "</span><i class='delete_icon'></i>";
			add_to_location.appendChild(new_class_list);

			var this_class = now_click.innerHTML;
			for (var i = 0, len = class_1.length; i < len; i++) {
				if (class_1[i] == this_class) {
					//该一级分类下没有二级分类
					if (class_2[i] == null) {
						class_2[i] = [];
						class_2[i][0] = add_class_name;
						localStorage[window._dbName] = JSON.stringify(data);
						console.log(localStorage[window._dbName]);
					} else {
						//该一级分类下已有二级分类
						class_2[i][class_2[i].length] = add_class_name;
						localStorage[window._dbName] = JSON.stringify(data);
						console.log(localStorage[window._dbName]);
					}
				}
			}
		}
	}
};

//是否显示 新建分类 和 新建任务
List.showAddIcon = function () {
	var now_click = utility.qs('.list_item_select');
	//console.log(now_click);
	utility.qs('.add_list').style = "display:none";
	utility.qs('.add_item').style = "display:none";
	//console.log(now_click.className.indexOf('allClass')/* || now_click.className.indexOf('1stClass')*/);
	if (now_click.className.indexOf('allClass') >= 0 || now_click.className.indexOf('1stClass') >= 0) {
		utility.qs('.add_list').style = "display:inline";
	}

	if (now_click.className.indexOf('1stClass') >= 0 || now_click.className.indexOf('2ndClass') >= 0 || now_click.className.indexOf('allItem') >= 0) {
		utility.qs('.add_item').style = "display:inline";
	}
};

//刷新或者启动时左侧栏分类的显示
List.showListClass = function () {

	//获取当前localstorage存储的分类
	var data = JSON.parse(localStorage[window._dbName]);
	var class_1 = data.class_1;
	var class_2 = data.class_2;

	for (var i = 0, len = class_1.length; i < len; i++) {
		if (class_1[i] != null) {
			if (class_1[i] != '默认分类') {
				//当前不是默认分类时，新建一级分类的显示
				var this_class_name_1 = class_1[i];
				var add_to_location = utility.qs('.type_list_all');
				//console.log(add_to_location);
				var new_class_list = document.createElement('li');
				var temp_1 = '<i class="type_file_icon"></i>' + '<span class="_"{{className}}" 1stClass">"{{className}}"</span>' + '<i class="delete_icon"></i>';

				var replace_reg = new RegExp('"{{className}}"', 'g'); //replace()第一次参数传入字符串时，默认只替换第一个，若传入是正则，可用/g
				temp_1 = temp_1.replace(replace_reg, this_class_name_1);
				//console.log(this_class_name_1);
				new_class_list.innerHTML = temp_1;
				add_to_location.appendChild(new_class_list);
				new_class_list = document.createElement('ul');
				new_class_list.className = 'type_item';
				add_to_location.appendChild(new_class_list);
			}
			if (class_2[i] != null) {
				//一级分类下有二级分类时，新建二级分类的显示
				for (var j = 0, len2 = class_2[i].length; j < len2; j++) {
					var this_class_name_2 = class_2[i][j];
					var add_to_location_2;

					if (class_1[i] == '默认分类') {
						//当前是默认分类时
						add_to_location_2 = utility.$parent(utility.qs('.' + class_1[i]), 'li').nextSibling;
					} else {
						//不是默认分类时
						add_to_location_2 = utility.$parent(utility.qs('._' + class_1[i]), 'li').nextSibling;
					}

					//console.log(utility.$parent(utility.qs('.' + class_1[i]),'li'));
					var new_class_list_2 = document.createElement('li');
					var temp_2 = '<i class="type_item_icon"></i>' + '<span class="_"{{className}}" 2ndClass">"{{className}}"</span>' + '<i class="delete_icon"></i>';
					var replace_reg_2 = new RegExp('"{{className}}"', 'g'); //replace()默认只执行一次，若第一个参数是正则，可以使用/g
					temp_2 = temp_2.replace(replace_reg_2, this_class_name_2);
					new_class_list_2.innerHTML = temp_2;
					add_to_location_2.appendChild(new_class_list_2);
				}
			}
		}
	}
};

//新建任务后右侧栏的显示,在当前目录下新建任务
List.addNewTodo = function () {
	List.id = "";
	//console.log(List.id);
	var right_header = utility.qs(".right_header");
	var right_date = utility.qs(".right_date");
	var right_content = utility.qs(".right_content");

	utility.qs(".todo_title").value = "";
	utility.qs(".todo_date").value = "";
	utility.qs(".todo_textarea").value = "";

	utility.qs(".todo_title_div").style = "display:inline";
	utility.qs(".todo_title_display", right_header).style = "display:none";
	utility.qs(".todo_save").style = "display:inline";
	utility.qs(".todo_cancel").style = "display:inline";
	utility.qs(".todo_date_div").style = "display:inline";

	utility.qs(".todo_date").value = utility.date();

	utility.qs(".todo_date_display", right_date).style = "display:none";
	utility.qs(".todo_textarea").style = "display:inline";
	utility.qs("div", right_content).style = "display:none";
};

//编辑事件，显示2个input和textarea，并将编辑后的内容写回页面
List.editItem = function () {
	//全局id,用于识别该任务是否已经存在
	List.id = utility.qs('.todo_title_span').id.split('').slice(1).join('');
	//console.log(List.id);
	var right_header = utility.$parent(event.target, 'div');
	var right = utility.$parent(right_header, 'div');
	var right_date = utility.qs('.right_date', right);
	var right_content = utility.qs('.right_content', right);
	//console.log(utility.qs('span',right_header).innerHTML.split("").slice(5).join(""));
	//任务标题
	if (utility.qs('.todo_title_span', right_header).innerHTML != "") {
		utility.qs('input', right_header).value = utility.qs('.todo_title_span', right_header).innerHTML;
	};
	//任务时间
	if (utility.qs('.todo_date_span', right_date).innerHTML != "") {
		utility.qs('input', right_date).value = utility.qs('.todo_date_span', right_date).innerHTML;
	};
	//任务内容
	if (utility.qs('div', right_content).innerHTML != "") {
		utility.qs('textarea', right_content).value = utility.qs('div', right_content).innerHTML;
	};
	utility.qs('.todo_title_display', right_header).style = "display: none";
	//console.log(utility.qs('.todo_title_div',right_header));
	utility.qs('.todo_title_div', right_header).style = "display:inline";
	utility.qs('.todo_save', right_header).style = "display:inline";
	utility.qs(".todo_cancel").style = "display:inline";
	utility.qs('.todo_date_display', right_date).style = "display:none";
	utility.qs('.todo_date_div', right_date).style = "display:inline";
	utility.qs('div', right_content).style = "display:none";
	utility.qs('textarea', right_content).style = "display:inline";
	utility.qs('input', right_header).focus();
};

//保存事件 ,保存右侧任务编辑区域的修改
List.saveTodo = function () {
	//console.log(List.id);
	var updateData = {};
	var right_header = utility.$parent(event.target, 'div');
	var right = utility.$parent(right_header, 'div');
	var right_date = utility.qs('.right_date', right);
	var right_content = utility.qs('.right_content', right);
	//console.log(utility.qs('span',right_header).innerHTML.split("").splice(0,4).join(""));

	//如果当前任务不是新任务，则更新修改
	if (List.id) {
		//任务标题
		if (utility.qs('input', right_header).value != "") {
			utility.qs('.todo_title_span', right_header).innerHTML = utility.qs('input', right_header).value;
			//utility.qs('input',right_header).value = "";
			updateData.title = utility.qs('input', right_header).value;
		} else {
			updateData.title = utility.qs('.todo_title_span', right_header).innerHTML;
		};
		utility.qs(".todo_save").style = "display:none";
		utility.qs('.todo_title_div', right_header).style = "display:none";
		utility.qs('.todo_title_display', right_header).style = "display:inline";
		utility.qs(".todo_cancel").style = "display:none";

		//任务时间
		if (utility.qs('input', right_date).value != "") {
			utility.qs('.todo_date_span', right_date).innerHTML = utility.qs('input', right_date).value;
			//utility.qs('input',right_header).value = "";
			updateData.date = utility.qs('input', right_date).value;
		} else {
			updateData.date = utility.qs('.todo_date_span', right_date).innerHTML;
		};
		utility.qs('.todo_date_display', right_date).style = "display:inline";
		utility.qs('.todo_date_div', right_date).style = "display:none";

		//任务内容
		utility.qs('div', right_content).innerHTML = utility.qs('textarea', right_content).value;
		//console.log(utility.qs('textarea',right_content).value);
		utility.qs('div', right_content).style = "display:inline";
		utility.qs('textarea', right_content).style = "display:none";
		updateData.content = utility.qs('textarea', right_content).value;

		//console.log(updateData);
		utility.qs('.todo_done_icon').style = "display:inline";
		utility.qs('.todo_edit_icon').style = "display:inline";
		Store.save(updateData, function () {}, List.id);

		//点击保存后，还原中间栏的状态
		var now_click_class = utility.qs('.list_item_select').innerHTML;
		var is_1st_class;
		//console.log(now_click_class);
		if (utility.qs('.list_item_select').className.indexOf('1stClass') >= 0) {
			//一级分类
			is_1st_class = true;
		} else {
			//二级分类
			is_1st_class = false;
		}
		List.listDisplay(now_click_class, is_1st_class);
	} else {
		//新任务，创建新任务
		//任务标题
		updateData.title = utility.qs('input', right_header).value;

		//任务时间
		updateData.date = utility.qs('input', right_date).value;

		//任务内容
		updateData.content = utility.qs('textarea', right_content).value;

		//将新创建的任务写回至右侧页面，并显示
		utility.qs('.todo_title_span', right_header).innerHTML = utility.qs('input', right_header).value;
		utility.qs('.todo_date_span', right_date).innerHTML = utility.qs('input', right_date).value;
		utility.qs('div', right_content).innerHTML = utility.qs('textarea', right_content).value;
		utility.qs(".todo_save").style = "display:none";
		utility.qs(".todo_cancel").style = "display:none";
		utility.qs('.todo_title_div', right_header).style = "display:none";
		utility.qs('.todo_title_display', right_header).style = "display:inline";
		utility.qs('.todo_date_display', right_date).style = "display:inline";
		utility.qs('.todo_date_div', right_date).style = "display:none";
		utility.qs('div', right_content).style = "display:inline";
		utility.qs('textarea', right_content).style = "display:none";
		utility.qs('.todo_done_icon').style = "display:inline";
		utility.qs('.todo_edit_icon').style = "display:inline";

		//任务完成选项
		updateData.complete = 'false';

		//任务所属分类
		var now_click = utility.qs('.list_item_select');
		if (now_click.className.indexOf('1stClass') >= 0) {
			//只有一级分类
			updateData.class_1 = now_click.innerHTML;
		} else if (now_click.className.indexOf('allItem') >= 0) {
			//默认分类
			updateData.class_1 = '默认分类';
		} else {
			//有两级分类
			updateData.class_2 = now_click.innerHTML;
			var previousBro = utility.$parent(now_click, 'ul').previousSibling;
			updateData.class_1 = utility.qs('span', previousBro).innerHTML;
		}
		Store.save(updateData);

		//点击保存后，还原中间栏的状态
		var now_click_class = utility.qs('.list_item_select').innerHTML;
		var is_1st_class;
		//console.log(now_click_class);
		if (utility.qs('.list_item_select').className.indexOf('1stClass') >= 0) {
			//一级分类
			is_1st_class = true;
		} else {
			//二级分类
			is_1st_class = false;
		}
		List.listDisplay(now_click_class, is_1st_class);

		//中间栏选择新创建的任务标题
		var this_mid_list = utility.qs('.mid_main_list');
		var this_mid_list_li = utility.qsa('li', this_mid_list);
		var this_newtodo_id = '#_' + utility.qs('.todo_title_span').id;
		//console.log(this_mid_list_li);
		for (var i = 0, len = this_mid_list_li.length; i < len; i++) {
			this_mid_list_li[i].className = this_mid_list_li[i].className.replace('_titleSelect', '');
			//console.log(this_mid_list_li[i].className);
		}
		var this_newtodo = utility.$parent(utility.qs(this_newtodo_id, this_mid_list), 'li');
		//console.log(this_newtodo_id,this_newtodo);
		this_newtodo.className = ' _titleSelect';
	}
};

//取消事件
List.todoCancel = function () {

	//清空标题、日期、内容的输入
	utility.qs('.todo_title').value = '';
	utility.qs('.todo_date').value = '';
	utility.qs('.todo_textarea').value = '';

	//显示
	utility.qs(".todo_save").style = "display:none";
	utility.qs(".todo_cancel").style = "display:none";
	utility.qs('.todo_title_div').style = "display:none";
	utility.qs('.todo_title_display').style = "display:inline";
	utility.qs('.todo_date_display').style = "display:inline";
	utility.qs('.todo_date_div').style = "display:none";
	utility.qs('.todo_content_div').style = "display:inline";
	utility.qs('.todo_textarea').style = "display:none";
	utility.qs('.todo_done_icon').style = "display:inline";
	utility.qs('.todo_edit_icon').style = "display:inline";
};

//click中间任务标题后，右侧内容的显示
List.showListItem = function () {
	//获取当前选中的中间栏的任务
	//console.log(now_mid_select);
	var targetId = event.target.id;
	var targetLi = utility.$parent(event.target, 'li');
	var thisTitleList = utility.qsa('.this_title');
	var todos = JSON.parse(localStorage[window._dbName]).todos;
	var temp_list = {};
	var todo_done_icon = utility.qs('.todo_done_icon');
	var todo_done_icon_done = utility.qs('.todo_done_icon_done');

	//清空任务完成图标
	todo_done_icon.style.display = 'none';
	todo_done_icon_done.style.display = 'none';

	for (var i = 0, len = todos.length; i < len; i++) {
		if ('_' + todos[i].id == targetId) {
			temp_list.title = todos[i].title;
			temp_list.date = todos[i].date;
			temp_list.content = todos[i].content;
			temp_list.complete = todos[i].complete;
		}
	}
	//console.log(temp_list);
	//console.log(targetId);
	//console.log(thisTitleList);

	//右侧显示标题、日期、内容
	utility.qs('.todo_title_span').innerHTML = temp_list.title;
	utility.qs('.todo_date_span').innerHTML = temp_list.date;
	utility.qs('.todo_content_div').innerHTML = temp_list.content;

	//显示目前任务是否已完成并显示正确的图标
	if (temp_list.complete == 'false') {
		//未完成图标
		//console.log(todo_done_icon.style.display);
		todo_done_icon.style.display = 'inline';
	} else {
		//已完成图标
		//console.log(todo_done_icon_done.display);
		todo_done_icon_done.style.display = 'inline';
	}

	utility.qs('.todo_title_span').id = targetId;
	for (var i = 0, len = thisTitleList.length; i < len; i++) {
		thisTitleList[i].className = 'this_title';
		//console.log(thisTitleList[i].className);
	}
	targetLi.className += " _titleSelect";
	utility.qs('.todo_edit_icon').style = "display:inline";
};

//click左侧分类后，中间任务标题的显示
List.showTodoTitle = function () {
	var now_click_class = utility.qs('.list_item_select').innerHTML;
	var is_1st_class;
	//console.log(now_click_class);
	if (utility.qs('.list_item_select').className.indexOf('1stClass') >= 0) {
		//一级分类
		is_1st_class = true;
	} else {
		//二级分类
		is_1st_class = false;
	}
	//console.log(now_click_class);

	List.listDisplay(now_click_class, is_1st_class);
	//List.listDisplay(class,boolean);  (类名,是否是一级分类)理论上应该写成的样子
};

//删除给定id的任务项目
List.deleteListItem = function () {
	var targetId = utility.qs('span', utility.$parent(event.target, 'li')).id;
	targetId = targetId.split("").slice(1).join('');
	//console.log(targetId);
	var thisdelete = confirm("确定要删除该任务吗？");
	if (thisdelete) {
		Store.remove(targetId);
		var now_click_class = utility.qs('.list_item_select').innerHTML;
		var is_1st_class;
		//console.log(now_click_class);
		if (utility.qs('.list_item_select').className.indexOf('1stClass') >= 0) {
			//一级分类
			is_1st_class = true;
		} else {
			//二级分类
			is_1st_class = false;
		}
		//console.log(now_click_class);

		List.listDisplay(now_click_class, is_1st_class);
	}
};

//左侧栏点击类名的事件
List.leftClass = function (className) {

	className = className || ""; //如果不传参数的话传入的是一个event事件。。
	//thisListSpan一定要放在绑定里面，以保证每次绑定的时候加入新加入的类
	var thisListSpan = utility.qsa('span', utility.qs('.type_list'));

	//选中事件,改变样式
	//console.log(className.type);
	if (className.type == "click") {
		//className为空，即不指定要选中某一特定类
		for (var i = 0, len = thisListSpan.length; i < len; i++) {
			thisListSpan[i].className = thisListSpan[i].className.replace("list_item_select", "");
			//console.log('clear!');
		}
		this.className += ' list_item_select';
	} else {
		//className指定选中某一特定类
		for (var i = 0, len = thisListSpan.length; i < len; i++) {
			thisListSpan[i].className = thisListSpan[i].className.replace("list_item_select", "");
			//console.log('clear!');
		}
		utility.qs('._' + className).className += ' list_item_select';
	}

	//左侧栏上侧两个新建标签的显示
	List.showAddIcon();
	//中间栏任务标题的显示
	List.showTodoTitle();
};

//给所有元素绑定click事件
List.listAddClickEvent = function () {
	//疑问：为什么下面这两个变量不能放在函数外面（放在外面的话是[],null）
	var thisList = utility.qs('.type_list');
	//console.log(thisList);

	//给分类绑定事件
	utility.$delegate(thisList, 'span', 'click', List.leftClass);

	//给左侧栏删除类绑定事件
	utility.$delegate(thisList, '.delete_icon', 'click', List.deleteClass);

	//给编辑项中的任务日期加入提示文字，显示当前时间
	var this_date = utility.date();
	utility.qs('.todo_date').placeholder = this_date;

	//给右侧的编辑按钮绑定事件
	var edit_icon = utility.qs('.todo_edit_icon');
	utility.$on(edit_icon, 'click', List.editItem);

	//给右侧的保存按钮绑定事件
	var save_icon = utility.qs(".todo_save");
	utility.$on(save_icon, "click", List.saveTodo);

	//给新建分类绑定事件
	utility.$on(utility.qs('.add_list'), 'click', List.addNewTypeList);

	//给新建任务绑定事件
	utility.$on(utility.qs('.add_item'), 'click', List.addNewTodo);

	//给中间栏任务title绑定显示事件
	var title_List = utility.qs('.mid_main_list');
	utility.$delegate(title_List, 'span', 'click', List.showListItem);

	//给中间栏的删除图标绑定删除事件
	var delete_icon = utility.qs('.delete_icon_2');
	utility.$delegate(title_List, '.delete_icon_2', 'click', List.deleteListItem);

	//给完成任务图标绑定改变完成状态事件
	var todo_done_icon = utility.qs('.todo_done_icon');
	var todo_done_icon_done = utility.qs('.todo_done_icon_done');
	utility.$on(todo_done_icon, 'click', List.completeTodo);
	utility.$on(todo_done_icon_done, 'click', List.completeTodo);

	//给中间栏头部的选项绑定事件
	utility.$on(utility.qs('.item_all'), 'click', List.midHeader);
	utility.$on(utility.qs('.item_todo'), 'click', List.midHeader);
	utility.$on(utility.qs('.item_done'), 'click', List.midHeader);

	//给取消图标绑定事件
	utility.$on(utility.qs('.todo_cancel'), 'click', List.todoCancel);
};

//发生改变时，中间栏任务标题的显示
List.listDisplay = function (thisClass, boolean, view) {

	thisClass = thisClass || "";
	boolean = boolean || "";
	view = view || "";

	//获取当前中间栏选择的任务的id
	var now_mid_select = utility.qs('._titleSelect');
	var now_mid_select_id;
	if (now_mid_select != null) {
		now_mid_select_id = utility.qs('span', now_mid_select).id;
		//console.log(now_mid_select_id);
	}

	//清空中间栏
	utility.qs('.mid_main_list').innerHTML = "";
	var date = JSON.parse(localStorage[window._dbName]);
	var todos = date.todos;

	//第一次筛选，判断显示全部任务，还是显示左侧类别栏指定的任务
	if (thisClass == "" || thisClass == '所有任务' || thisClass == '分类列表') {
		//thisClass参数为空，代表中间栏列出所有任务
		todos = date.todos;
	} else {
		//有thisClass参数，代表只显示thisClass下的任务
		if (boolean == true) {
			//要显示的thisClass是一个一级分类
			var temp_todos = [];
			for (var i = 0, len = todos.length; i < len; i++) {
				if (todos[i].class_1 == thisClass) {
					temp_todos.push(todos[i]);
				}
			}
			//console.log(temp_todos);
			todos = temp_todos;
		} else {
			//要显示的thisClass是一个二级分类
			var temp_todos_2 = [];
			for (var i = 0, len = todos.length; i < len; i++) {

				if (todos[i].class_2 != null) {
					if (todos[i].class_2 == thisClass) {
						temp_todos_2.push(todos[i]);
					}
				}
			}
			//console.log(temp_todos_2);
			todos = temp_todos_2;
		}
	}

	//第二次筛选，按照所有、未完成、已完成显示任务
	if (view !== '') {
		if (view == 'false') {
			//未完成
			var temp_todo_view = [];
			//console.log(todos.length);
			for (var i = 0, len = todos.length; i < len; i++) {
				if (todos[i].complete == 'false') {
					temp_todo_view.push(todos[i]);
				}
			}
			//console.log(temp_todo_view);
			todos = temp_todo_view;
		} else if (view == 'true') {
			//已完成
			var temp_todo_view = [];
			for (var i = 0, len = todos.length; i < len; i++) {
				if (todos[i].complete == 'true') {
					temp_todo_view.push(todos[i]);
				}
			}
			//console.log(temp_todo_view);
			todos = temp_todo_view;
		} else {
			//所有
		}
	}

	//console.log(todos);

	/*//字典排序测试
 test = [{date:"2017-3-12"},{date:"2017-3-12"},{date:"2017-3-15"},{date:"2017-3-5"}];
 console.log(new Date(test[0].date.replace(/-/g,'/')));
 for(var i=0,len=test.length;i<len;i++){
 	test[i].sortDate = new Date(test[i].date.replace(/-/g,'/'));
 }
 console.log(test[0].date);
 test.sort(function(a,b){
 	return a.sortDate - b.sortDate;
 });
 //日期值对比
 console.log(test[1].sortDate.getTime() === test[2].sortDate.getTime());
 console.log(test);*/

	//按日期对todos进行排序
	//给todos添加用于排序的sortDate属性
	//console.log(new Date(todos[0].date.replace(/-/g,'/')));

	//对todos进行日期从大到小的排序
	for (var i = 0, len = todos.length; i < len; i++) {
		todos[i].sortDate = new Date(todos[i].date.replace(/-/g, '/'));
	}
	todos.sort(function (a, b) {
		return b.sortDate - a.sortDate;
	});
	//console.log(todos);

	//找出不重复的时间标题，对任务按时间分类
	var thisSortDate;

	for (var i = 0, len = todos.length; i < len; i++) {
		var listDateTempate = '<li class="thisDate">"{{date}}"</li>';
		var listTitleTempate = '<li class="this_title">' + '<span id="_"{{id}}"">"{{title}}"</span>' + '<i class="delete_icon_2"></i>' + '</li>';
		if (thisSortDate != todos[i].sortDate.getTime()) {
			//加入新的时间分类标签
			utility.qs(".mid_main_list").innerHTML += listDateTempate.replace('"{{date}}"', todos[i].date);
			//加入内容
			var temTitle = listTitleTempate.replace('"{{title}}"', todos[i].title);
			temTitle = temTitle.replace('"{{id}}"', todos[i].id);
			utility.qs(".mid_main_list").innerHTML += temTitle;

			thisSortDate = todos[i].sortDate.getTime();
		} else {
			//加入内容
			var temTitle = listTitleTempate.replace('"{{title}}"', todos[i].title);
			temTitle = temTitle.replace('"{{id}}"', todos[i].id);
			utility.qs(".mid_main_list").innerHTML += temTitle;
		}
	}
	//还原清空中间栏之前已经选中的任务标题，使他重新被选中
	if (now_mid_select_id != null) {
		var temp_now_select = utility.$parent(utility.qs('#' + now_mid_select_id), 'li');
		//console.log(temp_now_select);
		temp_now_select.className += ' _titleSelect';
	}

	//console.log(this_list);
};

//完成任务
List.completeTodo = function () {
	//点击完成任务后，找出在localstorage中的位置
	var select_todo_id = utility.qs('.todo_title_span').id;
	//console.log(select_todo_id);
	var data = JSON.parse(localStorage[window._dbName]);
	var todos = data.todos;
	var this_index;
	for (var i = 0, len = todos.length; i < len; i++) {
		if ('_' + todos[i].id == select_todo_id) {
			this_index = i;
		}
	}

	//页面显示的修改
	var todo_done_icon = utility.qs('.todo_done_icon');
	var todo_done_icon_done = utility.qs('.todo_done_icon_done');

	//console.log(todo_done_icon.style.display);
	if (todo_done_icon.style.display == 'inline') {
		//修改为已完成
		todos[this_index].complete = 'true';
		localStorage[window._dbName] = JSON.stringify(data);

		todo_done_icon.style.display = 'none';
		todo_done_icon_done.style.display = 'inline';
	} else {
		//修改为未完成
		todos[this_index].complete = 'false';
		localStorage[window._dbName] = JSON.stringify(data);

		todo_done_icon.style.display = 'inline';
		todo_done_icon_done.style.display = 'none';
	}
};

//中间栏头部分类的点击
List.midHeader = function () {
	//console.log(event.target);
	var target = event.target;
	var targetView = event.target.innerHTML;
	//还原颜色
	utility.qs('.item_all').className = 'item_all';
	utility.qs('.item_todo').className = 'item_todo';
	utility.qs('.item_done').className = 'item_done';
	//选中颜色
	target.className += ' mid_header_select';

	List.showViewTitle(targetView);
};

//中间栏显示 特定选项的 任务
//view参数：所有，未完成，已完成
List.showViewTitle = function (view) {
	view = view || '所有';

	var now_click_class = utility.qs('.list_item_select').innerHTML;
	var is_1st_class;
	//console.log(now_click_class);
	if (utility.qs('.list_item_select').className.indexOf('1stClass') >= 0) {
		//一级分类
		is_1st_class = true;
	} else {
		//二级分类
		is_1st_class = false;
	}

	if (view == '所有') {
		//所有
		utility.qs('.item_all').className += ' mid_header_select';
		List.listDisplay(now_click_class, is_1st_class, 'all');
	} else if (view == '未完成') {
		//未完成
		List.listDisplay(now_click_class, is_1st_class, 'false'); //是否完成
	} else {
		//已完成
		List.listDisplay(now_click_class, is_1st_class, 'true'); //是否完成
	}
};

//左侧类的删除事件
List.deleteClass = function () {
	if (confirm("删除操作不可逆，是否要删除该项？")) {
		//获得要删除类的标签
		var delete_class = utility.$parent(event.target, 'li');
		var delete_class_child = delete_class.nextSibling;
		//console.log(delete_class_child);
		//获得要删除类的类名
		var delete_class_name = utility.qs('span', delete_class).innerHTML;
		//获取localstorage中的数据
		var data = JSON.parse(localStorage[window._dbName]);
		var todos = data.todos;
		var class_1 = data.class_1;
		var class_2 = data.class_2;
		//获得要删除类的类级，一级or二级类
		if (utility.qs('span', delete_class).className.indexOf('1stClass') >= 0) {
			//一级类
			var delete_class_level = 'class_1';
		} else {
			//二级类
			var delete_class_level = 'class_2';
		}

		//删除类标签
		if (delete_class_level == 'class_1') {
			//删除类为第一类
			utility.qs('.type_list_all').removeChild(delete_class);
			//console.log(delete_class_child.nodeName);
			if (delete_class_child.nodeName == 'UL') {
				//当前第一类下有第二类需要删除
				utility.qs('.type_list_all').removeChild(delete_class_child);
			}
		} else {
			//删除类为第二类
			utility.$parent(event.target, 'ul').removeChild(delete_class);
		}

		//删除localstorage中todos的相关任务数据	
		var temp_todos = [];
		for (var i = 0, len = todos.length; i < len; i++) {
			if (delete_class_level == 'class_1') {
				//删除类属于第一类
				//console.log(delete_class_name);
				if (todos[i].class_1 !== delete_class_name) {
					temp_todos.push(todos[i]);
				}
			} else {
				//删除类属于第二类
				if (todos[i].class_2 !== delete_class_name) {
					temp_todos.push(todos[i]);
				}
			}
		}
		//console.log(temp_todos);
		data.todos = temp_todos; // 这里不能直接把值给todos，否则data.todos的值没有改变???为啥
		//console.log(data.todos);
		//console.log(class_2);
		//删除localstorage中的class中的相关数据
		if (delete_class_level == 'class_1') {
			//删除类属于第一类
			for (var i = 0, len = class_1.length; i < len; i++) {
				if (class_1[i] == delete_class_name) {
					class_1.splice(i, 1);
				}
			}
			//写回localstorage
			localStorage[window._dbName] = JSON.stringify(data);

			//左侧类栏选中分类列表，中间栏显示所有任务
			List.leftClass('allClass');
			List.listDisplay();
		} else {
			//删除类属于第二类
			var temp_i;
			for (var i = 0, len = class_2.length; i < len; i++) {
				if (class_2[i] != null) {
					//console.log(i);
					//console.log(class_2[i]);
					for (var j = 0, len1 = class_2[i].length; j < len1; j++) {
						if (class_2[i][j] == delete_class_name) {
							//console.log(i,j);
							temp_i = i;
							class_2[i].splice(j, 1);
						}
					}
				}
			}
			//写回localstorage
			localStorage[window._dbName] = JSON.stringify(data);

			//左侧选中父级分类，中间栏显示父级所有任务
			localStorage[window._dbName] = JSON.stringify(data);
			List.leftClass(class_1[temp_i]);
			List.listDisplay(class_1[temp_i], true);
		}
	}
};

//滑过分类的删除的事件（这样写有bug，移入出现删除图标后，再在删除图标上移动会触发移出事件，导致反复触发移入移出事件）
/*List.listHoverToDelete = function(){
	//绑定鼠标移入事件
	console.log(thisList);
	//console.log(utility.qsa('li',thisList));
	utility.$delegate(thisList,'span','mouseover',function(){
		//新建delete图标标签
		var new_delete = document.createElement('i');
		new_delete.className = 'delete_icon';
		//console.log(event.target);
		//添加delete图标标签
		utility.$parent(event.target,'li').insertBefore(new_delete, event.target.nextSibling);
		console.log('insert');
	});
	//绑定鼠标移出事件
	utility.$delegate(thisList,'span','mouseout',function(){
		var to_delete = utility.qs('.delete_icon',utility.$parent(event.target,'li'));
		utility.$parent(to_delete,'li').removeChild(to_delete);
		console.log('delete');
	});
}*/
module.exports = List;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)();
// imports


// module
exports.push([module.i, "*{\r\n\tmargin:0;\r\n\tpadding: 0;\r\n\tfont-family:”微软雅黑”;\r\n}\r\nul,li{\r\n\tlist-style: none;\r\n\tcursor: pointer;\r\n}\r\n.header{\r\n\twidth: 100%;\r\n\theight: 50px;\r\n\tbackground: #398dee;\r\n}\r\n.header_icon{\r\n\tposition: absolute;\r\n\tbackground: url(\"https://shared-https.ydstatic.com/ynote/ydoc/e1e06b7a.sprite.svg\") no-repeat;\r\n\twidth: 26px;\r\n\theight: 26px;\r\n\tbackground-position: 0 0;\r\n\tleft:20px; \r\n\ttop:12px;\r\n}\r\n.header span{\r\n\tline-height: 50px;\r\n\tpadding-left: 55px;\r\n\tfont-size: 23px;\r\n\tcolor: #fff;\r\n\tdisplay: block;\r\n}\r\n.main{/*没有这个的话main下的子元素height:100%就会等于窗体长度，就会出现滚动条*/\r\n\tposition: absolute;\r\n    top: 50px;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n}\r\n.list_add{\r\n\theight: 40px;\r\n\tline-height: 40px;\r\n\twidth: 240px;\r\n\tcolor: #393939;\r\n\tfont-size: 12px;\r\n\tpadding: 10px 0;\r\n\tborder-bottom: 1px solid #e0e1e5;\r\n}\r\n.add_list{\r\n\tposition: absolute;\r\n\tleft: 50px;\r\n\tcursor: pointer;\r\n}\r\n.add_list:hover{\r\n\tcolor: rgb(118, 176, 243);\r\n}\r\n.add_item:hover{\r\n\tcolor: rgb(118, 176, 243);\r\n}\r\n.add_list_icon{\r\n\tbackground: url(\"https://shared-https.ydstatic.com/ynote/ydoc/e1e06b7a.sprite.svg\") no-repeat;\r\n\tbackground-position: 86.815% 8%;\r\n\tposition: absolute;\r\n\twidth: 20px;\r\n\theight: 20px;\r\n\ttop: 10px;\r\n\tleft: -30px;\r\n}\r\n.add_item{\r\n\tposition: absolute;\r\n\tleft: 160px;\r\n\tcursor: pointer;\r\n}\r\n.add_item_icon{\r\n\tbackground: url(\"https://shared-https.ydstatic.com/ynote/ydoc/e1e06b7a.sprite.svg\") no-repeat;\r\n\tbackground-position: 100% 72.94832826747721%;\r\n\tposition: absolute;\r\n\twidth: 20px;\r\n\theight: 20px;\r\n\ttop: 10px;\r\n\tleft: -30px;\r\n}\r\n.delete_icon{\r\n\tposition: absolute;\r\n\tbackground: url(\"https://shared-https.ydstatic.com/ynote/ydoc/e1e06b7a.sprite.svg\") no-repeat;\r\n\tbackground-position: 93.9209726443769% 37.38601823708207%;\r\n\twidth: 20px;\r\n\theight: 20px;\r\n\tright: 26px;\r\n\tmargin-top: -24px;\r\n\tdisplay: none;\r\n}\r\n.type_list li:hover {\r\n\tbackground: rgba(118, 176, 243, 0.3);\r\n}\r\n.type_list li:hover .delete_icon{/*这里用来替代鼠标移入移出事件*/\r\n    display: block;\r\n}\r\n.type_list{\r\n\tline-height: 30px;\r\n\tfont-size: 12px;\r\n\tcolor: #393939;\r\n}\r\n.type_list span{\r\n\tpadding-left:60px; \r\n\tdisplay: block;\r\n}\r\n.type_list_all span{\r\n\tpadding-left: 75px;\r\n\tdisplay: block;\r\n\r\n}\r\n.type_item span{\r\n\tpadding-left: 90px;\r\n\tdisplay: block;\r\n}\r\n.type_icon{\r\n\tmargin-top: 4px;/*这里使用top的话图标就会重叠,absolute定位中top，left的基准是最后一次定位的祖先元素*/\r\n\tleft: 26px;\r\n\tposition: absolute;\r\n\twidth: 24px;\r\n\theight: 24px;\r\n\tbackground:url(\"https://shared-https.ydstatic.com/ynote/ydoc/e1e06b7a.sprite.svg\") no-repeat;\r\n\tbackground-position: 14.76923076923077% 83.38461538461539%;\r\n}\r\n.type_file_icon{\r\n\tmargin-top: 2px;\r\n\tleft: 40px;\r\n\tposition: absolute;\r\n\twidth: 24px;\r\n\theight: 24px;\r\n\tbackground: url(\"https://shared-https.ydstatic.com/ynote/ydoc/e1e06b7a.sprite.svg\") no-repeat;\r\n\tbackground-position: 59.07692307692308% 83.38461538461539%;\r\n}\r\n.type_item_icon{\r\n\tmargin-top: 5px;\r\n\tleft: 54px;\r\n\tposition: absolute;\r\n\twidth: 24px;\r\n\theight: 24px;\r\n\tbackground: url(\"https://shared-https.ydstatic.com/ynote/ydoc/e1e06b7a.sprite.svg\") no-repeat;\r\n\tbackground-position: 55.333% 90%;\r\n}\r\n.list_item_select{\r\n\tbackground: #398dee;\r\n\tcolor: #fff;\r\n}\r\n.left{\r\n\tposition: absolute;\r\n\twidth: 240px;\r\n\theight: 100%;\r\n\tbackground: #f5f5f5;\r\n\tborder-right: 1px solid #e0e1e5;\r\n}\r\n\r\n.mid{\r\n\tleft:241px;\r\n\tposition: absolute;\r\n\twidth: 320px;\r\n\theight: 100%;\r\n\tbackground: #fff;\r\n\tborder-right: 1px solid #e0e1e5;\r\n}\r\n.mid_header{\r\n\theight: 60px;\r\n\tborder-bottom:1px solid #e0e1e5;\r\n\tposition: relative;\r\n\tline-height: 60px;\r\n}\r\n.mid_header div{\r\n\tfloat: left;\r\n\twidth: 90px;\r\n\tmargin: 2px 0 2px 15px;\r\n\tline-height: 60px;\r\n\ttext-align: center;\r\n\tfont-size: 12px;\r\n}\r\n.item_all, .item_todo, .item_done{\r\n\tcursor: pointer;\r\n}\r\n.mid_header div span{\r\n\tmargin-left: 10px;\r\n}\r\n.mid_header div span:hover{\r\n\tcolor: rgb(118, 176, 243);\r\n}\r\n.mid_header_select{\r\n\tmargin-left: 10px;\r\n\tcolor: rgb(118, 176, 243);\r\n}\r\n.select_item_all{\r\n\ttop:18px;\r\n\tmargin-left:-30px;\r\n\tposition: absolute;\r\n\twidth: 24px;\r\n\theight: 24px;\r\n\tbackground: url(\"https://shared-https.ydstatic.com/ynote/ydoc/e1e06b7a.sprite.svg\") no-repeat;\r\n\tbackground-position: 80% 65.948%;\t\r\n}\r\n.select_item_todo{\r\n\ttop:21px;\r\n\tmargin-left:-25px;\r\n\tposition: absolute;\r\n\twidth: 22px;\r\n\theight: 22px;\r\n\tbackground: url(\"https://shared-https.ydstatic.com/ynote/ydoc/e1e06b7a.sprite.svg\") no-repeat;\r\n\tbackground-position: 74.5% 96%;\r\n}\r\n.select_item_done{\r\n\ttop:21px;\r\n\tmargin-left:-25px;\r\n\tposition: absolute;\r\n\twidth: 22px;\r\n\theight: 22px;\r\n\tbackground: url(\"https://shared-https.ydstatic.com/ynote/ydoc/e1e06b7a.sprite.svg\") no-repeat;\r\n\tbackground-position: 69.1% 96%;\r\n}\r\n.mid_main{\r\n\r\n}\r\n.mid_main ul{\r\n\theight: 100%;\r\n}\r\n.mid_main li{\r\n\ttop: 0;\r\n\tposition: relative;\r\n    padding: 0 40px;\r\n    line-height: 52px;\r\n    border-bottom: 1px solid #e0e1e5;\r\n    overflow: hidden;\r\n}\r\n.thisTitle:hover{\r\n\tbackground-color: #eaf0fb;\t\r\n}\r\n.delete_icon_2{\r\n\tposition: absolute;\r\n\tbackground: url(\"https://shared-https.ydstatic.com/ynote/ydoc/e1e06b7a.sprite.svg\") no-repeat;\r\n\tbackground-position: 93.9209726443769% 37.38601823708207%;\r\n\twidth: 20px;\r\n\theight: 20px;\r\n\tright: 26px;\r\n\tmargin-top: -35px;\r\n\tdisplay: none;\r\n}\r\n.this_title:hover  {\r\n\tbackground-color: #eaf0fb;\r\n}\r\n._titleSelect{\r\n\tbackground-color: #eaf0fb;\r\n}\r\n.mid_main_list{\r\n\toverflow: hidden;\r\n}\r\n.mid_main_list:hover{\r\n\toverflow-y: scroll;\r\n}\r\n.mid_main_list span{\r\n\tdisplay: block;\r\n\theight: 52px;\r\n/* \toverflow: hidden;\r\nposition: relative;\r\noverflow: hidden; */\r\n}\r\n.mid_main_list li:hover .delete_icon_2{\r\n\tdisplay: block;\r\n}\r\n.mid_main {\r\n\tposition: absolute;\r\n    top: 61px;\r\n    right: 0;\r\n    left: 0;\r\n    bottom: 0;\r\n}\r\n.thisDate{\r\n\ttop: -3px;\r\n\theight:5px;\r\n\tline-height: 5px !important;\r\n    position: relative;\r\n    padding: 15px 25px !important;\r\n    border-bottom: 1px solid #e0e1e5;\r\n    overflow: hidden;\r\n    cursor: default;\r\n    background: #f5f5f5;\r\n}\r\n.right{\r\n\tposition: absolute;\r\n\tleft:560px;\r\n\theight: 100%;\r\n\tright: 0;\r\n\tmin-width: 280px;\r\n}\r\n.right_header{\r\n\theight: 60px;\r\n\tborder-bottom: 1px solid #e0e1e5;\r\n\tline-height: 60px;\r\n\tpadding: 0 20px;\r\n\tfont-weight: bold;\r\n\tfont-size: 18px;\r\n}\r\n.todo_title_display{\r\n\tdisplay: inline;\r\n}\r\n.todo_input{\r\n\twidth: 300px;\r\n\tline-height: 22px;\r\n\theight: 22px;\r\n\tbackground-color: transparent;\r\n\tborder:0 none;\r\n\tfont-size: 18px;\r\n\twhite-space: nowrap;\r\n\toverflow: hidden;\r\n\ttext-overflow: ellipsis;\r\n\toutline:none;/*有了这条input去掉边框后的蓝色部分就消失了*/\r\n}\r\n.todo_textarea{\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tborder: 0 none;\r\n\toutline: none;\r\n\tbackground: transparent;\r\n\tfont-size: 14px;\r\n\tdisplay: none;\r\n}\r\n.todo_done_icon{\r\n\tbackground: url(\"https://shared-https.ydstatic.com/ynote/ydoc/e1e06b7a.sprite.svg\") no-repeat;\r\n\tbackground-position: 80.1% 96%;\r\n\tposition: absolute;\r\n\twidth: 22px;\r\n\theight: 22px;\r\n\ttop: 21px;\r\n\tright: 65px;\r\n\tcursor: pointer;\r\n}\r\n.todo_done_icon_done{\r\n\tbackground: url(\"https://shared-https.ydstatic.com/ynote/ydoc/e1e06b7a.sprite.svg\") no-repeat;\r\n\tbackground-position: 69.1% 96%;\r\n\tposition: absolute;\r\n\twidth: 22px;\r\n\theight: 22px;\r\n\ttop: 21px;\r\n\tright: 65px;\r\n\tcursor: pointer;\r\n}\r\n.todo_edit_icon{\r\n\tbackground: url(\"https://shared-https.ydstatic.com/ynote/ydoc/e1e06b7a.sprite.svg\") no-repeat;\r\n\tbackground-position: 88% 45%;\r\n\tposition: absolute;\r\n\twidth: 22px;\r\n\theight: 22px;\r\n\ttop: 21px;\r\n\tright: 20px; \r\n\tcursor: pointer;\r\n}\r\n.todo_save{\r\n\twidth: 80px;\r\n\theight: 30px;\r\n\tline-height: 30px;\r\n\tposition: absolute;\r\n\tcolor: #82B6F4;\r\n\tfont-size: 11px;\r\n\ttext-align: center;\r\n\tborder: 1px solid #e2e2e2;\r\n\tborder-radius: 6px;\r\n\tcursor: pointer;\r\n\tbackground-color: #fff;\r\n\ttop: 15px;\r\n\tright: 20px;\r\n\tdisplay: none;\r\n}\r\n.todo_cancel{\r\n\twidth: 80px;\r\n\theight: 30px;\r\n\tline-height: 30px;\r\n\tposition: absolute;\r\n\tcolor: #82B6F4;\r\n\tfont-size: 11px;\r\n\ttext-align: center;\r\n\tborder: 1px solid #e2e2e2;\r\n\tborder-radius: 6px;\r\n\tcursor: pointer;\r\n\tbackground-color: #fff;\r\n\ttop: 15px;\r\n\tright: 125px;\r\n\tdisplay: none;\r\n}\r\n.right_date{\r\n\theight: 50px;\r\n\tborder-bottom: 1px solid #e0e1e5;\r\n\tline-height: 50px;\r\n\tpadding: 0 20px;\r\n\tfont-size: 18px;\r\n}\r\n.right_content{\r\n\tposition: absolute;\r\n\ttop: 112px;\r\n\tbottom:0;\r\n\tleft: 0;\r\n\tright: 0;\r\n\tborder-bottom: 1px solid #e0e1e5;\r\n\tline-height: 50px;\r\n\tpadding: 25px 25px;\r\n}\r\n.right_content div{\r\n\tposition: absolute;\r\n\ttop: 8px;\r\n\tfont-size: 14px;\r\n}\r\n\r\n/*滚动条整体部分*/\r\n::-webkit-scrollbar {\r\n    height: 8px;\r\n    width: 10px;\r\n    background: transparent;\r\n    border-radius: 5px;\r\n}\r\n/*滚动条的轨道的两端按钮，允许通过点击微调小方块的位置*/\r\n::-webkit-scrollbar-button{\r\n    display: none;\r\n}\r\n/*滚动条里面的小方块，能向上向下移动*/\r\n::-webkit-scrollbar-thumb{\r\n    width: 10px;\r\n    min-height: 15px;\r\n    background: rgba(118, 176, 243, 0.3);\r\n    border-radius: 0;\r\n    margin-right: 1px;\r\n}\r\n/*滚动条的轨道*/\r\n::-webkit-scrollbar-track {\r\n    background-color: transparent;\r\n}\r\n/*内层轨道*/\r\n::-webkit-scrollbar-track-piece {\r\n    background: transparent;\r\n}", ""]);

// exports


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
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

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function (filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function () {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = i >= 0 ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function (path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function (p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function (path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function () {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function (p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};

// path.relative(from, to)
// posix version
exports.relative = function (from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};

exports.basename = function (path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  return splitPath(path)[3];
};

function filter(xs, f) {
  if (xs.filter) return xs.filter(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    if (f(xs[i], i, xs)) res.push(xs[i]);
  }
  return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b' ? function (str, start, len) {
  return str.substr(start, len);
} : function (str, start, len) {
  if (start < 0) start = str.length + start;
  return str.substr(start, len);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

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

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/* eslint-disable */

// XXXXX: This file should not exist. Working around a core level bug
// that prevents using fs at loaders.
//var fs = require('fs'); // XXX

var path = __webpack_require__(6);

var commentRx = /^\s*\/(?:\/|\*)[@#]\s+sourceMappingURL=data:(?:application|text)\/json;(?:charset[:=]\S+?;)?base64,(?:.*)$/mg;
var mapFileCommentRx = /(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^\*]+?)[ \t]*(?:\*\/){1}[ \t]*$)/mg;

function decodeBase64(base64) {
  return new Buffer(base64, 'base64').toString();
}

function stripComment(sm) {
  return sm.split(',').pop();
}

function readFromFileMap(sm, dir) {
  // NOTE: this will only work on the server since it attempts to read the map file

  mapFileCommentRx.lastIndex = 0;
  var r = mapFileCommentRx.exec(sm);

  // for some odd reason //# .. captures in 1 and /* .. */ in 2
  var filename = r[1] || r[2];
  var filepath = path.resolve(dir, filename);

  try {
    return fs.readFileSync(filepath, 'utf8');
  } catch (e) {
    throw new Error('An error occurred while trying to read the map file at ' + filepath + '\n' + e);
  }
}

function Converter(sm, opts) {
  opts = opts || {};

  if (opts.isFileComment) sm = readFromFileMap(sm, opts.commentFileDir);
  if (opts.hasComment) sm = stripComment(sm);
  if (opts.isEncoded) sm = decodeBase64(sm);
  if (opts.isJSON || opts.isEncoded) sm = JSON.parse(sm);

  this.sourcemap = sm;
}

Converter.prototype.toJSON = function (space) {
  return JSON.stringify(this.sourcemap, null, space);
};

Converter.prototype.toBase64 = function () {
  var json = this.toJSON();
  return new Buffer(json).toString('base64');
};

Converter.prototype.toComment = function (options) {
  var base64 = this.toBase64();
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return options && options.multiline ? '/*# ' + data + ' */' : '//# ' + data;
};

// returns copy instead of original
Converter.prototype.toObject = function () {
  return JSON.parse(this.toJSON());
};

Converter.prototype.addProperty = function (key, value) {
  if (this.sourcemap.hasOwnProperty(key)) throw new Error('property %s already exists on the sourcemap, use set property instead');
  return this.setProperty(key, value);
};

Converter.prototype.setProperty = function (key, value) {
  this.sourcemap[key] = value;
  return this;
};

Converter.prototype.getProperty = function (key) {
  return this.sourcemap[key];
};

exports.fromObject = function (obj) {
  return new Converter(obj);
};

exports.fromJSON = function (json) {
  return new Converter(json, { isJSON: true });
};

exports.fromBase64 = function (base64) {
  return new Converter(base64, { isEncoded: true });
};

exports.fromComment = function (comment) {
  comment = comment.replace(/^\/\*/g, '//').replace(/\*\/$/g, '');

  return new Converter(comment, { isEncoded: true, hasComment: true });
};

exports.fromMapFileComment = function (comment, dir) {
  return new Converter(comment, { commentFileDir: dir, isFileComment: true, isJSON: true });
};

// Finds last sourcemap comment in file or returns null if none was found
exports.fromSource = function (content) {
  var m = content.match(commentRx);
  return m ? exports.fromComment(m.pop()) : null;
};

// Finds last sourcemap comment in file or returns null if none was found
exports.fromMapFileSource = function (content, dir) {
  var m = content.match(mapFileCommentRx);
  return m ? exports.fromMapFileComment(m.pop(), dir) : null;
};

exports.removeComments = function (src) {
  return src.replace(commentRx, '');
};

exports.removeMapFileComments = function (src) {
  return src.replace(mapFileCommentRx, '');
};

exports.generateMapFileComment = function (file, options) {
  var data = 'sourceMappingURL=' + file;
  return options && options.multiline ? '/*# ' + data + ' */' : '//# ' + data;
};

Object.defineProperty(exports, 'commentRegex', {
  get: function getCommentRegex() {
    return commentRx;
  }
});

Object.defineProperty(exports, 'mapFileCommentRegex', {
  get: function getMapFileCommentRegex() {
    return mapFileCommentRx;
  }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14).Buffer))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function () {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}
	var convertSourceMap = __webpack_require__(8);
	var sourceMapping = convertSourceMap.fromObject(cssMapping).toComment({ multiline: true });
	var sourceURLs = cssMapping.sources.map(function (source) {
		return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
	});
	return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
}

/***/ }),
/* 10 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
}

revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;

function placeHoldersCount(b64) {
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4');
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;
}

function byteLength(b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64);
}

function toByteArray(b64) {
  var i, j, l, tmp, placeHolders, arr;
  var len = b64.length;
  placeHolders = placeHoldersCount(b64);

  arr = new Arr(len * 3 / 4 - placeHolders);

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len;

  var L = 0;

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = tmp >> 16 & 0xFF;
    arr[L++] = tmp >> 8 & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[L++] = tmp >> 8 & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr;
}

function tripletToBase64(num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}

function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
    output.push(tripletToBase64(tmp));
  }
  return output.join('');
}

function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[tmp << 4 & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    output += lookup[tmp >> 10];
    output += lookup[tmp >> 4 & 0x3F];
    output += lookup[tmp << 2 & 0x3F];
    output += '=';
  }

  parts.push(output);

  return parts.join('');
}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(12);
var ieee754 = __webpack_require__(11);
var isArray = __webpack_require__(10);

exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength();

function typedArraySupport() {
  try {
    var arr = new Uint8Array(1);
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () {
        return 42;
      } };
    return arr.foo() === 42 && // typed array instances can be augmented
    typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
    arr.subarray(1, 1).byteLength === 0; // ie10 has broken `subarray`
  } catch (e) {
    return false;
  }
}

function kMaxLength() {
  return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
}

function createBuffer(that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length');
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }
    that.length = length;
  }

  return that;
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer(arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length);
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error('If encoding is specified then the first argument must be a string');
    }
    return allocUnsafe(this, arg);
  }
  return from(this, arg, encodingOrOffset, length);
}

Buffer.poolSize = 8192; // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr;
};

function from(that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length);
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset);
  }

  return fromObject(that, value);
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length);
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;
  if (typeof Symbol !== 'undefined' && Symbol.species && Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    });
  }
}

function assertSize(size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number');
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
}

function alloc(that, size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size);
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string' ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
  }
  return createBuffer(that, size);
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding);
};

function allocUnsafe(that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }
  return that;
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size);
};

function fromString(that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);

  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that;
}

function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }
  return that;
}

function fromArrayBuffer(that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds');
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds');
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }
  return that;
}

function fromObject(that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that;
    }

    obj.copy(that, 0, 0, len);
    return that;
  }

  if (obj) {
    if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0);
      }
      return fromArrayLike(that, obj);
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
}

function checked(length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
  }
  return length | 0;
}

function SlowBuffer(length) {
  if (+length != length) {
    // eslint-disable-line eqeqeq
    length = 0;
  }
  return Buffer.alloc(+length);
}

Buffer.isBuffer = function isBuffer(b) {
  return !!(b != null && b._isBuffer);
};

Buffer.compare = function compare(a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers');
  }

  if (a === b) return 0;

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

Buffer.isEncoding = function isEncoding(encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true;
    default:
      return false;
  }
};

Buffer.concat = function concat(list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }

  if (list.length === 0) {
    return Buffer.alloc(0);
  }

  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer;
};

function byteLength(string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length;
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0;

  // Use a for loop to avoid recursion
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len;
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length;
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2;
      case 'hex':
        return len >>> 1;
      case 'base64':
        return base64ToBytes(string).length;
      default:
        if (loweredCase) return utf8ToBytes(string).length; // assume utf8
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer.byteLength = byteLength;

function slowToString(encoding, start, end) {
  var loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return '';
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return '';
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return '';
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end);

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end);

      case 'ascii':
        return asciiSlice(this, start, end);

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end);

      case 'base64':
        return base64Slice(this, start, end);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true;

function swap(b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16() {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits');
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this;
};

Buffer.prototype.swap32 = function swap32() {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits');
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this;
};

Buffer.prototype.swap64 = function swap64() {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits');
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this;
};

Buffer.prototype.toString = function toString() {
  var length = this.length | 0;
  if (length === 0) return '';
  if (arguments.length === 0) return utf8Slice(this, 0, length);
  return slowToString.apply(this, arguments);
};

Buffer.prototype.equals = function equals(b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
  if (this === b) return true;
  return Buffer.compare(this, b) === 0;
};

Buffer.prototype.inspect = function inspect() {
  var str = '';
  var max = exports.INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }
  return '<Buffer ' + str + '>';
};

Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer');
  }

  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index');
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0;
  }
  if (thisStart >= thisEnd) {
    return -1;
  }
  if (start >= end) {
    return 1;
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;

  if (this === target) return 0;

  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);

  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1;

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset; // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : buffer.length - 1;
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1;else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;else return -1;
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1;
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  }

  throw new TypeError('val must be string, number or Buffer');
}

function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read(buf, i) {
    if (indexSize === 1) {
      return buf[i];
    } else {
      return buf.readUInt16BE(i * indexSize);
    }
  }

  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break;
        }
      }
      if (found) return i;
    }
  }

  return -1;
}

Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1;
};

Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};

Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};

function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');

  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i;
    buf[offset + i] = parsed;
  }
  return i;
}

function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}

function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}

function latin1Write(buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length);
}

function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}

function ucs2Write(buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}

Buffer.prototype.write = function write(string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
    // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
    // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;
    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
    // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds');
  }

  if (!encoding) encoding = 'utf8';

  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length);

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length);

      case 'ascii':
        return asciiWrite(this, string, offset, length);

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length);

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON() {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};

function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf);
  } else {
    return base64.fromByteArray(buf.slice(start, end));
  }
}

function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];

  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res);
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
  }
  return res;
}

function asciiSlice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret;
}

function latin1Slice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret;
}

function hexSlice(buf, start, end) {
  var len = buf.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out;
}

function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res;
}

Buffer.prototype.slice = function slice(start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;

  var newBuf;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf;
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
}

Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val;
};

Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val;
};

Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset];
};

Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | this[offset + 1] << 8;
};

Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] << 8 | this[offset + 1];
};

Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};

Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};

Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val;
};

Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val;
};

Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return this[offset];
  return (0xff - this[offset] + 1) * -1;
};

Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | this[offset + 1] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | this[offset] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};

Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};

Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, true, 23, 4);
};

Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, false, 23, 4);
};

Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, true, 52, 8);
};

Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, false, 52, 8);
};

function checkInt(buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
}

Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = value & 0xff;
  return offset + 1;
};

function objectWriteUInt16(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2;
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2;
};

function objectWriteUInt32(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4;
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4;
};

Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = value & 0xff;
  return offset + 1;
};

Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2;
};

Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2;
};

Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4;
};

Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4;
};

function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
  if (offset < 0) throw new RangeError('Index out of range');
}

function writeFloat(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}

Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert);
};

Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert);
};

function writeDouble(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert);
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert);
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy(target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0;
  if (target.length === 0 || this.length === 0) return 0;

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds');
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
  if (end < 0) throw new RangeError('sourceEnd out of bounds');

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
  }

  return len;
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill(val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string');
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding);
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index');
  }

  if (end <= start) {
    return this;
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;

  if (!val) val = 0;

  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this;
};

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean(str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return '';
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str;
}

function stringtrim(str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
}

function toHex(n) {
  if (n < 16) return '0' + n.toString(16);
  return n.toString(16);
}

function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        }

        // valid lead
        leadSurrogate = codePoint;

        continue;
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue;
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break;
      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break;
      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break;
      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else {
      throw new Error('Invalid code point');
    }
  }

  return bytes;
}

function asciiToBytes(str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray;
}

function utf16leToBytes(str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break;

    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray;
}

function base64ToBytes(str) {
  return base64.toByteArray(base64clean(str));
}

function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }
  return i;
}

function isnan(val) {
  return val !== val; // eslint-disable-line no-self-compare
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
var utility = __webpack_require__(0);
var List = __webpack_require__(3);
var store = __webpack_require__(1);

window.onload = function () {
	//给所有分类绑定点击事件
	List.listAddClickEvent();
	List.listDisplay();
	List.showListClass();
};

/***/ })
/******/ ]);