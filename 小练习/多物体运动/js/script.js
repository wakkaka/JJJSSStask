function startMove(obj,target){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var speed = (target - obj.offsetWidth)/8;
		speed = speed>0 ? Math.ceil(speed): Math.floor(speed);
		if(obj.offsetWidth == target){
			clearInterval(obj.timer);
		}else{
			obj.style.width = obj.offsetWidth + speed + 'px';
		} 
	},30);
}