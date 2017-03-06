		function startMove(obj,attr,target,fn){
			clearInterval(obj.timer);
			obj.timer = setInterval(function(){
				//1.取出目标的属性值
				if(attr == 'opacity'){
					var currAttr=parseFloat(getStyle(obj,attr)) *100;
				}else{
					var currAttr=parseInt(getStyle(obj,attr));
				}
				//2.计算出速度
				var speed = (target - currAttr)/8;
				speed = speed>0?Math.ceil(speed):Math.floor(speed);
				//3. 判断是否达到目标
				if(currAttr ==target){
					clearInterval(obj.timer);
					if(fn){
						fn();
					}
				}else{
				//4.进行运动
					if(attr =='opacity'){
						obj.style.filter = 'alpha(opacity:'+(currAttr + speed)+')';
						obj.style.opacity=(currAttr+speed)/100;
					}else{
						obj.style[attr] = currAttr +speed+'px';
					}
				}
				
			},30);
		}

		function getStyle(obj,attr){
			if(obj.currentStyle){
				return obj.currentStyle;
			}else{
				return getComputedStyle(obj,false)[attr];
			}
		}