var AutoPlay = function(id){
	this.initialize(id);
}

AutoPlay.prototype = {
	//初始化一个轮播组件
	initialize : function(info){
		var that = this;
		this.oBox = $(info.id);

		//轮播方向
		this.oDirection = info.direction;
		this.oUl = $$('ul',this.oBox)[0];
		this.oLi = $$('li',this.oBox);
		this.oImg = $$('img',this.oBox);
		this.timer = null;
		this.autoTimer = null;
		this.oNow = 0;
	
		this.createBtn();

		this.oBtn = $$('li',this.oCount);

		this.toggle();

		this.autoTimer = setInterval(function(){
			that.next();
		},3000);

		this.addHandler();

	},

	//生成右下角数字选项
	createBtn : function(){
		var tem = [];
		this.oCount = document.createElement('ul');

		for(var i=0,len=this.oImg.length;i<len;i++){
			tem.push("<li>" + (i+1) +"</li>");
		}
		
		this.oCount.className = 'count';
		//console.log(tem);
		this.oCount.innerHTML = tem.join('');
		this.oBox.appendChild(this.oCount);
	},

	//设定右下角图标样式，并计算需要上移的距离
	toggle:function(){
		for(var i=0,len=this.oBtn.length;i<len;i++){
			this.oBtn[i].className = '';
		}
		this.oBtn[this.oNow].className = 'select';
		//console.log(this.oImg[0].offsetHeight);
		var v_target = -(this.oImg[0].offsetHeight * this.oNow);
		var h_target = -(this.oImg[0].offsetWidth * this.oNow);
		this.doMove({v_target:v_target,h_target:h_target});
	},

	//自动循环
	next:function(){
		(this.oNow == this.oImg.length - 1) ? this.oNow = 0 : this.oNow++;
		this.toggle();
	},

	//轮播运动
	doMove:function(target){
		var that = this;
		clearInterval(this.timer);
		//console.log(that.oUl.style);
		if(this.oDirection == 'h'){
				//横向轮播
				for(var i=0,len=this.oLi.length;i<len;i++){
					this.oLi[i].style = "float:left;"
				}
				this.timer = setInterval(function(){
				//console.log(this);//window
				var iSpeed = (target.h_target - that.oUl.offsetLeft)/7;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				that.oUl.offsetLeft == target.h_target ? clearInterval(that.timer) : (that.oUl.style.left = that.oUl.offsetLeft + iSpeed + 'px')
			},30);
			}else{
				//纵向轮播
				this.timer = setInterval(function(){
				//console.log(this);//window
				var iSpeed = (target.v_target - that.oUl.offsetTop)/5;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				that.oUl.offsetTop == target.v_target ? clearInterval(that.timer) : (that.oUl.style.top = that.oUl.offsetTop + iSpeed + 'px')
			},30);
			}
		
	},

	//绑定事件
	addHandler:function(){
		var that = this;
		//给广告容器绑定鼠标移入移出事件，停止/启动轮播
		this.oBox.onmouseover = function(){
			clearInterval(that.autoTimer);
		}
		this.oBox.onmouseout = function(){
			that.autoTimer = setInterval(function(){
				that.next();
			},3000)
		}
		//给右下角图标绑定事件，移入显示相应页面
		 for(var i=0,len=this.oBtn.length;i<len;i++){
		 	this.oBtn[i].index = i;
		 	this.oBtn[i].onmouseover=function(){
		 		//console.log(that.oBtn[this.index]);
		 		that.oNow = this.index;
		 		that.toggle();
		 	}
		 }
	}

}
window.onload = function(){
	var a = new AutoPlay({id:'box',direction:'h'});
}