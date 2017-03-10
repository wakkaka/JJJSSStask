define(['jquery'],function($){
	function Window(){
		this.cfg={
			title:"系统消息",
			content:"",
			hander:null,
			width:500,
			height:300
		}
	}

	Window.prototype = {
		alert : function(cfg){
			var CFG = $.extend(this.cfg,cfg);
			var boundingBox = $(
				'<div class="window_boundingBox">' +
				'<div class="window_title">'+CFG.title+'</div>'+
				'<div class="window_body">'+CFG.content+'</div>'+
				'<div class="window_footer"><input type="button" value="确定"></div>'+
				'</div>'
				);
			btn = boundingBox.find(".window_footer input");
			boundingBox.appendTo("body");
			btn.click(function(){
				this.handler&&this.handler();
				boundingBox.remove();
			});
			boundingBox.css({
				width : this.cfg.width + "px",
				height : this.cfg.height + "px",
				left : (this.cfg.x || (window.innerWidth - this.cfg.width)/2) + "px",
				top : (this.cfg.y ||(window.innerHeight - this.cfg.height)/2) + "px"
			})
		},
		confirm : function(){

		},
		prompt : function(){

		}
	}
	return {//一定要记住！！！要返回一个接口可以调用这个类！！
		Window : Window
	}
})

