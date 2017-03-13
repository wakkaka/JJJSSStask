require.config({
	paths:{
		jqueryUI:'http://code.jquery.com/ui/1.10.4/jquery-ui'
	}
});
require(['jquery','window'],function($,w){
	//给按钮#a绑定click事件
	$('#a').click(function(){
		//new一个Window实例来完成弹窗功能，使用字典格式传参
		var win = new w.Window();
		win.alert({
			title : "提示",
			content : "Welcome!",
			hander4AlertBtn : function(){
						alert("You click the alert button!");
			},
			hander4CloseBtn : function(){
						alert("You click the close button");
			},
			width : 300,
			height : 150,
			y: 50,
			hasCloseBtn : true,
			text4AlertBtn : "好的",
			dragHandle:".window_header"
		});
		win.on("alert",function(){
			alert("the second alert handler");
		});
		win.on("alert",function(){
			alert("the third alert handler");
		});
		win.on("close",function(){
			alert("the second close handler");
		});
	})
})