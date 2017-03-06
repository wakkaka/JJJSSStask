function startMove(obj,attr,target){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		if(attr == 'opacity'){
			var currAttr = parseFloat(getStyle(obj,attr)) * 100;
		}else{
			var currAttr = parseInt(getStyle(obj,attr));
		}
		
		var speed = (target - currAttr)/8;

		speed = speed>0 ? Math.ceil(speed): Math.floor(speed);
		if(currAttr == target){
			clearInterval(obj.timer);
		}else{
			if(attr == 'opacity'){
				obj.style.filter = 'alpha(opacity:'+(currAttr + speed)+')';
				obj.style.opacity=(currAttr + speed)/100;
			}else{
				obj.style[attr] = currAttr + speed + 'px';
			}
			
		} 
	},30);
}

function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}