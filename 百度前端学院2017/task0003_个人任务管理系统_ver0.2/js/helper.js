//通用功能
var utility = {}

'use strict';
//通过选择器获得元素
utility.qs = function(selector,scope){
	return(scope || document).querySelector(selector);
};
utility.qsa = function(selector,scope){
	return(scope || document).querySelectorAll(selector);
};

//绑定事件
utility.$on = function(target,type,callback,useCapture){
	target.addEventListener(type,callback,!!useCapture);
};
//给符合选择器的元素绑定事件
utility.$delegate = function(target,selector,type,handler){
	function dispatchEvent(event){
		var targetElement = event.target;
		var potentialElements = utility.qsa(selector,target);
		var hasMatch = Array.prototype.indexOf.call(potentialElements,targetElement)>=0;
		if(hasMatch){
			handler.call(targetElement,event);
		}
	}
	var useCapture = type === 'blur'||type === 'focus';
	utility.$on(target,type,dispatchEvent,useCapture);
}

//找到给定标签名的父节点
utility.$parent = function(element,tagName){
	if(!element.parentNode){
		return;
	}
	//console.log(element.parentNode);
	if(element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()){
		return element.parentNode;
	}
	return utility.$parent(element.parentNode,tagName);
}
//找到给定标签名的子节点
utility.$child = function(element,tagName){
	if(!element.childNodes){
		return;
	}
	//console.log(element.childNodes);
	for(var i=0,len=element.childNodes.length;i<len;i++){
		var this_childNode = element.childNodes[i];
		//console.log('tagName' in this_childNode);
		if('tagName' in this_childNode){
			//console.log(this_childNode);
			if(this_childNode.tagName.toLowerCase() === tagName.toLowerCase()){
				return this_childNode;
			}
		}	
	}
	
}
//获取当前的时间,eg:2017-3-17
utility.date = function(){
	var time = new Date();
	var month = time.getMonth() + 1;
	var t = time.getFullYear() + '-' + month + '-' + time.getDate();
	return t;
}

module.exports = utility
