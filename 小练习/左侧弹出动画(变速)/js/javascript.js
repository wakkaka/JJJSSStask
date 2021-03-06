//设置全局时钟
var timer = null;
//主方法
window.onload=function(){
	var oDiv1 = document.getElementById('div1');
//鼠标滑过
	oDiv1.onmouseover=function(){
		startMove(0);
	document.onmouseout=function(){
		startMove(-200);
	}
	}
}

/*//鼠标滑过方法
function startMove(){
	//防止多次触发计时器
	clearInterval(timer);
	var oDiv1 = document.getElementById('div1');
	timer = setInterval(function(){
		if(oDiv1.offsetLeft==0){
			clearInterval(timer);
		}else{
			oDiv1.style.left = oDiv1.offsetLeft+10+'px';
		}
	},30);
}

//鼠标离开方法
function stopMove(){
	clearInterval(timer);
	var oDiv1 = document.getElementById('div1');
	timer = setInterval(function(){
		if(oDiv1.offsetLeft == -200){
			clearInterval(timer);
		}else{
			oDiv1.style.left=oDiv1.offsetLeft-10+'px';
		}
	},30);
}
*/
//移入和移出的统一写法
function startMove(target){
	var oDiv1 = document.getElementById('div1');
	//防止多次触发计时器
	clearInterval(timer);
	timer = setInterval(function(){
		var speed =(target - oDiv1.offsetLeft)/15; //！！speed要写在计时器中才有变速的效果
		speed = speed>0?Math.ceil(speed):Math.floor(speed);
		if(oDiv1.offsetLeft==target){
			clearInterval(timer);
		}else{
			oDiv1.style.left = oDiv1.offsetLeft+speed+'px';
		}
	},30);
}