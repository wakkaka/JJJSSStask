define(['jquery'],function($){
	function Window(){

	}

	Window.prototype = {
		alert : function(content,handler){
			var boundingBox = $('<div class="window_boundingBox"></div>');
			boundingBox.appendTo("body");
			boundingBox.html(content);
			var btn = $('<input type="button" value="确定">');
			btn.appendTo(boundingBox);
			btn.click(function(){
				handler&&handler();
				boundingBox.remove();
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

