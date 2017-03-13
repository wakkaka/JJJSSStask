define(function(){
	//定义Widget的属性
	function Widget(){
		this.handlers = {};
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
				this.handlers.splice(0,2);
			}
		}
		//返回一个接口可以调用其中的方法
		return {
			Widget : Widget
		}

	});
