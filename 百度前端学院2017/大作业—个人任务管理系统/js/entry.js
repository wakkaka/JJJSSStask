require('../css/style.css');
var utility = require('./helper.js');
var List = require('./list.js');
var store = require('./store.js');

window.onload=function(){
	//给所有分类绑定点击事件
	List.listAddClickEvent();
	List.listDisplay();
}
