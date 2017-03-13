require.config({
	paths:{
		jqueryUI:'http://code.jquery.com/ui/1.10.4/jquery-ui'
	}
});
require(['jquery','window'],function($,w){
	//给按钮#a绑定click事件
	$('#a').click(function(){
		//new一个Window实例来完成弹窗功能，使用字典格式传参
		var win = new w.Window().alert({
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
		}).on("alert",function(){//连缀语法
			alert("the second alert handler");
		}).on("alert",function(){//连缀语法
			alert("the third alert handler");
		}).on("close",function(){//连缀语法
			alert("the second close handler");
		});
	})
})