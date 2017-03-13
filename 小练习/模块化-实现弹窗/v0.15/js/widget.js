define(['jquery'],function($){
	//定义Widget的属性
	function Widget(){
		this.boundingBox = null;
	}

	Widget.prototype = {
			//用于绑定监听的事件
			on : function(type,handler){
				//为空的时候建立触发事件的字典，用字典型格式是为了监听单个事件可以触发多个自定义事件
				if(typeof this.handlers[type] == "undefined"){
					this.handlers[type] = [];
				}
				this.handlers[type].push(handler);
				//实现on的连缀语法
				return this;
			},

			//用于触发自定义事件
			fire : function(type,data){
				if(this.handlers[type] instanceof Array){
					//console.log(this.handlers);
					var handlers = this.handlers[type];
					//console.log(handlers);
					////将单个监听事件所绑定的自定义事件放到handlers数组中
					for(var i=0,len=handlers.length;i<len;i++){
						handlers[i](data);
					}
				}
			},
			//初始化弹窗并将弹窗显示在给定/默认的窗口中
			render : function(container){
				this.renderUI();//初始化弹窗dom节点
				this.handlers = {};//初始化弹窗自定义事件字典
				this.bindUI();//绑定自定义事件
				this.syncUI();//初始化弹窗css及其他选项
				$(container||document.body).append(this.boundingBox);//显示到浏览器
			},
			//清除弹窗事件及移除弹窗
			destroy : function(){
				this.destructor();//移除前的工作，比如清除mask
				this.boundingBox.off();//移除绑定的事件
				this.boundingBox.remove();//移除弹窗dom
			},
			renderUI : function(){},//初始化dom
			bindUI : function(){},//绑定事件
			syncUI : function(){},//初始化dom样式
			destructor : function(){}//清除前工作
		}
		//返回一个接口可以调用其中的方法
		return {
			Widget : Widget
		}

	});
