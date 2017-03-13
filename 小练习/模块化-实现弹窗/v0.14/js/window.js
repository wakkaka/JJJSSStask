define(['widget','jquery','jqueryUI'],function(widget,$,$UI){
	//定义Window的属性
	function Window(){
		//定义默认参数
		this.cfg={
			title:"系统消息",//弹窗标题
			content:"",//弹窗内容
			hander4AlertBtn:null,//弹窗确认按钮的回调函数
			text4AlertBtn:"确定",//确认按钮的显示文本
			hasCloseBtn:false,//弹窗是否有关闭按钮
			hander4CloseBtn:null,//弹窗关闭按钮的回调函数
			width:500,//弹窗长
			height:300,//弹窗高
			skinClassName:null,//选择弹窗皮肤类
			hasMask:true,//是否为模态窗口，即必须点窗口才能继续操作
			isDraggable:true,//是否可以拖拽
			dragHandle:null,//指定拖拽触发范围
			text4ConfirmBtn:"确定",
			handler4ConfirmBtn:null,
			text4CancelBtn:"取消",
			handler4CancelBtn:null
		}
	};
	//Window继承Widget类
	Window.prototype = $.extend({},new widget.Widget(),{
		//重写renderUI方法
		renderUI : function(){
			//弹窗
			var footerContent = "";
			switch(this.cfg.winType){
				case"alert":
							footerContent = '<input type="button" value="'+this.cfg.text4AlertBtn +'" class="window_alertBtn">';
							break;
				case"confirm":
							footerContent = '<input type="button" value="'+this.cfg.text4ConfirmBtn+'" class="window_confirmBtn"><input type="button" value="'+
							this.cfg.text4CancelBtn+'" class="window_cancelBtn">';
							break;
			};
			this.boundingBox = $(
				'<div class="window_boundingBox">' +
				'<div class="window_header">' + this.cfg.title + '</div>'+
				'<div class="window_body">' + this.cfg.content + '</div>'+
				'<div class="window_footer">' + footerContent + '</div>' + '</div>'
				);
			//遮罩
			if(this.cfg.hasMask){
				this._mask = $('<div class="window_mask"></div>');
				this._mask.appendTo("body");
			};
			//关闭按钮
			if(this.cfg.hasCloseBtn){
				this.boundingBox.append('<span class="window_closeBtn">X</span>');
			}
			this.boundingBox.appendTo(document.body);
		},
		//重写
		bindUI : function(){
			var that = this;
			that.boundingBox.delegate(".window_alertBtn","click",function(){//第一个参数为css选择器，一定要带.才行
				that.fire("alert");
				that.destroy();
			}).delegate(".window_closeBtn","click",function(){
				that.fire("close");
				that.destroy();
			}).delegate(".window_confirmBtn","click",function(){
				that.fire("confirm");
				that.destroy();
			}).delegate(".window_cancelBtn","click",function(){
				that.fire("cancel");
				that.destroy();
			});
			//确定按钮的自定义事件
			if(that.cfg.hander4AlertBtn){
				this.on("alert",this.cfg.hander4AlertBtn);
			}
			if(that.cfg.handler4ConfirmBtn){
				this.on("confirm",this.cfg.handler4ConfirmBtn);
			}
			//关闭按钮的自定义事件
			if(that.cfg.hander4CloseBtn){
				this.on("close",this.cfg.hander4CloseBtn);
			}
			//取消按钮的自定义事件
			if(that.cfg.handler4CancelBtn){
				this.on("cancel",this.cfg.handler4CancelBtn);
			}
		},
		//重写
		syncUI : function(){
			//弹窗的样式，默认为自适应水平垂直居中
			this.boundingBox.css({
				width : this.cfg.width + "px",
				height : this.cfg.height + "px",
				left : (this.cfg.x || (window.innerWidth - this.cfg.width)/2) + "px",
				top : (this.cfg.y ||(window.innerHeight - this.cfg.height)/2) + "px"
			});
			//皮肤
			if(this.cfg.skinClassName){
				this.boundingBox.addClass(this.cfg.skinClassName);
			};
			//拖拽
			if(this.cfg.isDraggable){
				if(this.cfg.dragHandle){
					this.boundingBox.draggable({handle:this.cfg.dragHandle});
				}else{
					this.boundingBox.draggable();
				}
			};
		},
		destructor : function(){
			this._mask && this._mask.remove();
		},
		alert : function(cfg){
			//默认设置和用户设置的合并
			$.extend(this.cfg,cfg,{winType:"alert"});
			this.render();
			return this;
		},
    	confirm : function(cfg){
    		$.extend(this.cfg,cfg,{winType:"confirm"});
    		this.render();
    		return this;
		},
		prompt : function(){

		}
	})
	return {//一定要记住！！！一定要返回一个接口才可以调用这个类！！
		Window : Window
	}
})

