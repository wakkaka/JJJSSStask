var timer =null,
	inopacity=100;
window.onload= function(){
	var oDiv = document.getElementById('div1');
	oDiv.onmouseover=function(){
		startMove(30);
	}
	oDiv.onmouseout=function(){
		startMove(100);
	}
}

function startMove(itarget){
		window.clearInterval(timer);
		timer=window.setInterval(function(){
			var oDiv=document.getElementById('div1');
				speed=0;
			if(inopacity<itarget){
				speed = 10;
			}else if(inopacity>itarget){
				speed = -10;
			}

			if(inopacity==itarget){
				clearInterval(timer);
			}else{
				inopacity+=speed
			}
			oDiv.style.opacity=inopacity/100;
			oDiv.style.filter='alpha(opacity:'+inopacity+')';

		},30);
	}
		
