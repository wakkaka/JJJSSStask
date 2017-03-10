require(['jquery','window'],function($,w){
	$('#a').click(function(){
		new w.Window().alert("Welcome!",function(){
			alert("you click the button!");
		},{
			width : 300,
			height : 150,
			y: 50
		});
	})
})