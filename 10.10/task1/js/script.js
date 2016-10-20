//定义抽奖数组和定时器
var data=['iphone7', 'ipad','三星定时炸弹','1000元现金','500元购物卡','感谢参与','50元充值卡'];
	timer =null,
	flag  =0;

//主函数
window.onload=function(){
	var play =document.getElementById('play');
	    stop =document.getElementById('stop');

	//鼠标事件
	//开始抽奖
	play.onclick=playFun;
	//停止抽奖
	stop.onclick=stopFun;

	//键盘事件
	document.onkeyup=function(){
		event = event ||window.event;
		//console.log(event.keyCode);
		if(event.keyCode == 13 ){
			if(flag == 0){
				playFun();
				flag = 1;
			}else{
				stopFun();
				flag = 0;
			}
		}
	}
}

function playFun(){
	//！！！是谁触发的事件，那么this就代表谁；这里play触发的事件，所以this代指play，即开始按钮；
	var that =this,
	    play =document.getElementById('play');
        title=document.getElementById('title');
	clearInterval(timer);
	timer=setInterval(function(){
		var random=Math.floor(Math.random() * data.length);
		title.innerHTML=data[random];
	},50);
	play.style.background='#999';

}

function stopFun(){
	clearInterval(timer);
	var play = document.getElementById('play');
	play.style.background = '#036';
}