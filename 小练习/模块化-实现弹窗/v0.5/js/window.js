define(['jquery'],function($){
	function Window(){
		this.cfg={
			title:"系统消息",
			content:"",
			hander4AlertBtn:null,
			hander4CloseBtn:null,
			width:500,
			height:300,
			hasCloseBtn:false
		}
	}

	Window.prototype = {
		alert : function(cfg){
			var CFG = $.extend(this.cfg,cfg);
			var boundingBox = $(
				'<div class="window_boundingBox">' +
				'<div class="window_title">'+CFG.title+'</div>'+
				'<div class="window_body">'+CFG.content+'</div>'+
				'<div class="window_footer"><input class="window_alertBtn" type="button" value="确定"></div>'+
				'</div>'
				);
			btn = boundingBox.find(".window_footer input");
			boundingBox.appendTo("body");
			btn.click(function(){
				CFG.hander4AlertBtn && CFG.hander4AlertBtn();
				boundingBox.remove();
			});
			boundingBox.css({
				width : CFG.width + "px",
				height : CFG.height + "px",
				left : (CFG.x || (window.innerWidth - CFG.width)/2) + "px",
				top : (CFG.y ||(window.innerHeight - CFG.height)/2) + "px"
			});
			if(CFG.hasCloseBtn){
				var closeBtn = $('<span class="window_closeBtn">X</span>');
				closeBtn.appendTo(boundingBox);
				closeBtn.click(function(){
					CFG.hander4CloseBtn&&CFG.hander4CloseBtn();
					boundingBox.remove();
				});
			}
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

