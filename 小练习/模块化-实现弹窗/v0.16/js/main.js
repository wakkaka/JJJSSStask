require.config({
	paths:{
		jqueryUI:'http://code.jquery.com/ui/1.10.4/jquery-ui'
	}
});
require(['jquery','window'],function($,w){
	//给按钮#a绑定alert click事件
	$('#a').click(function(){
		//new一个Window实例来完成弹窗功能，使用字典格式传参
		new w.Window().alert({
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
	});

	//给b绑定confirm
	$('#b').click(function(){
		//new一个Window实例来完成弹窗功能，使用字典格式传参
		new w.Window().confirm({
					title : "系统消息",
					content : "您确定要删除这个文件吗？",
					width : 300,
					height : 150,
					y: 50,
					text4ConfirmBtn : "是",
					text4CancelBtn : "否",
					dragHandle:".window_header"
		}).on("confirm",function(){//连缀语法
			alert("确定");
		}).on("cancel",function(){//连缀语法
			alert("取消");
		});
	})
	//prompt
	$("#c").click(function(){
		new w.Window().prompt({
					title:"请输入您的名字",
					content:"我们将会保密您输入的信息。",
					width:300,
					height:150,
					y:50,
					text4PromptBtn:"输入",
					text$CancelBtn:"取消",
					defaultValue4PromptInput:"张三",
					dragHandle:".window_header",
					hander4PromptBtn:function(inputValue){
						alert("您输入的内容是："+inputValue);
					},
					handler4CancelBtn:function(){
						alert("取消");
					}
		});
	});
	$('#d').click(function(){
		new w.Window().common({
		content:"这是一个通用弹窗",
		width:300,
		height:150,
		y:50,
		hasCloseBtn:true
	});
	})
})