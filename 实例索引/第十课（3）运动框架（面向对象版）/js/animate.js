var Animate = function(oElement,options,callback){
	this.initialize.apply(this,arguments);
}

Animate.prototype = {
	//初始化一个运动实例
	initialize : function(oElement,options,callback){
		var that = this;
		this.oElement = typeof oElement === 'string' ? document.querySelector('.' + oElement) : oElement;
		this.options = options;
		this.callback = callback;
		clearInterval(this.timer);
		this.timer = setInterval(function(){
			that.doMove();
		},30);
	},

	//更改相应样式
	css : function(attr,value){
		if(arguments.length == 1){
			//一个参数时，返回attr目前的值
			//ie支持currentStyle，其他支持getComputedStyle
			return parseFloat(this.oElement.currentStyle ? this.oElement.currentStyle[attr] : getComputedStyle(this.oElement,null)[attr]);
		}else{
			//两个参数时，修改attr为value
			attr == "opacity" ? (this.oElement.style.filter = "alpha(opacity=" + value + ")", this.oElement.style.opacity = value / 100)  : this.oElement.style[attr] = value + 'px';
		}
	},

	doMove:function(){
		var opt = this.options;
		var bComplete = true;//判断当前一个运动是否已经达到目标位置
		for(var p in opt){
			var iCur = (p == 'opacity') ? parseInt(this.css(p).toFixed(2)*100) : this.css(p);
			var iSpeed = (opt[p] - iCur)/5;
			iSpeed = iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

			(opt[p] == iCur) || (bComplete = false, this.css(p,iCur+iSpeed));
		}
		bComplete && ((clearInterval(this.timer)), this.callback && this.callback(this));

	}
}