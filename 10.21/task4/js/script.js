//运动函数 以及 属性数值函数
		function startMove(obj,json,fn){
			clearInterval(obj.timer);
			obj.timer = setInterval(function(){
				//1.取出目标的属性值
				var flag = true;
				for(var attr in json){
				if(attr == 'opacity'){
					var currAttr=parseFloat(getStyle(obj,attr)) *100;
				}else{
					var currAttr=parseInt(getStyle(obj,attr));
				}
				//2.计算出速度
				var speed = (json[attr] - currAttr)/8;
				speed = speed>0?Math.ceil(speed):Math.floor(speed);
				if(currAttr != json[attr]){
					flag = false;
				}
				//3.进行运动				
					if(attr =='opacity'){
						obj.style.filter = 'alpha(opacity:'+(currAttr + speed)+')';
						obj.style.opacity=(currAttr+speed)/100;
					}else{
						obj.style[attr] = currAttr +speed+'px';
					}
				}

				if(flag){
					clearInterval(obj.timer);
					if(fn){
						fn();
					}
				}
				
			},10);
		}

		function getStyle(obj,attr){
			if(obj.currentStyle){
				return obj.currentStyle;
			}else{
				return getComputedStyle(obj,false)[attr];
			}
		}