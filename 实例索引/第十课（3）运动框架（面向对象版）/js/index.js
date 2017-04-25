window.onload = function(){
	var oSpan = document.getElementsByTagName('span')[0];
	var oInpute = document.getElementsByTagName('input')[0];
	var iFlag = true;
	var i=0;
	var iAction = [
		{width:20, height:20},
		{width:80, height:80},
		{left:10}, 
		{left:408},
		{opacity:100},
		{opacity:0},
		{opacity:100},
		{width:80, height:80, left:408},
		{top:10},
		{width:20, height:20, left:468},
		{top:70},
		{left:10},
		{top:10},
		{left:468},
		{width:20, height:20, left:468},
		{width:80, height:80, left:408}
	]

	oInpute.onclick = function(){
		var that = this;
		function begin(){
			iFlag ? i++ : i--;
			var animate = new Animate(oSpan, iAction[i], begin);
			if(i == iAction.length || i<0){
				clearInterval(animate.timer);
				iFlag = !iFlag;
				that.value = iFlag ? "开始" : "原路返回";
				return
			}
		}
		begin();
	}
}