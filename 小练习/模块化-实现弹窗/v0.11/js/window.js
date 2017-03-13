define(['jquery','jqueryUI'],function($,$UI){
	function Window(){
		//定义默认参数
		this.cfg={
			title:"系统消息",//弹窗标题
			content:"",//弹窗内容
			hander4AlertBtn:null,//弹窗确认按钮的回调函数
			hander4CloseBtn:null,//弹窗关闭按钮的回调函数
			width:500,//弹窗长
			height:300,//弹窗高
			hasCloseBtn:false,//弹窗是否有关闭按钮
			skinClassName:null,//选择弹窗皮肤类
			text4AlertBtn:"确定",//确认按钮的显示文本
			hasMask:true,//是否为模态窗口，即必须点窗口才能继续操作
			isDraggable:true,//是否可以拖拽
			dragHandle:null //指定拖拽触发范围
		};
		this.handlers={};

	}

	Window.prototype = {
		alert : function(cfg){
			that = this;
			//默认设置和用户设置的合并
			var CFG = $.extend(this.cfg,cfg);
			//遮罩
			if(CFG.hasMask){
				mask = $('<div class="window_mask"></div>');
				mask.appendTo("body");
			}
			//弹窗
			var boundingBox = $(
				'<div class="window_boundingBox">' +
				'<div class="window_header">'+CFG.title+'</div>'+
				'<div class="window_body">'+CFG.content+'</div>'+
				'<div class="window_footer"><input class="window_alertBtn" type="button" value="' + CFG.text4AlertBtn+ '"></div>'+
				'</div>'
				);
			//确认按钮click的触发的回调
			btn = boundingBox.find(".window_alertBtn");
			boundingBox.appendTo("body");
			btn.click(function(){
				mask && mask.remove();
				that.fire("alert");
				boundingBox.remove();
			});
			//弹窗的样式，默认为自适应水平垂直居中
			boundingBox.css({
				width : CFG.width + "px",
				height : CFG.height + "px",
				left : (CFG.x || (window.innerWidth - CFG.width)/2) + "px",
				top : (CFG.y ||(window.innerHeight - CFG.height)/2) + "px"
			});
			//拖拽
			if(CFG.isDraggable){
				if(CFG.dragHandle){
					boundingBox.draggable({handle:CFG.dragHandle});
				}else{
					boundingBox.draggable();
				}	
			};
			//关闭按钮click触发的回调
			if(CFG.hasCloseBtn){
				var closeBtn = $('<span class="window_closeBtn">X</span>');
				closeBtn.appendTo(boundingBox);
				closeBtn.click(function(){
					mask && mask.remove();
					that.fire("close");
					boundingBox.remove();
				});
			};
			//皮肤
			if(CFG.skinClassName){
				boundingBox.addClass(CFG.skinClassName);
			};
			//实现alert的连缀语法
			return this;
		},

		confirm : function(){

		},
		prompt : function(){

		},

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
		}
	}
	return {//一定要记住！！！一定要返回一个接口才可以调用这个类！！
		Window : Window
	}
})

