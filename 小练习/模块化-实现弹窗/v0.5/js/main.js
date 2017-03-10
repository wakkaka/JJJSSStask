require(['jquery','window'],function($,w){
	$('#a').click(function(){
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
			hasCloseBtn : true
		});
	})
})