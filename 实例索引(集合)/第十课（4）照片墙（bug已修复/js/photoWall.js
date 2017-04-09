var $ = function(tagName, oParent)
{
	return (oParent || document).getElementsByTagName(tagName);
}

var $$ = function(className, oParent)
{
	var selectResult = [],
		reClass = new RegExp("(^|\\s)" + className + "($|\\s)");
		allElement = $("*", oParent);
	for(var i=0,len=allElement.length;i<len;i++){
		reClass.test(allElement[i].className) && selectResult.push(allElement[i]);
	}
	return selectResult;
}

//获取li应该处于的位置
var getPos = function(obj)
{
	var iTop = obj.offsetTop;
	var iLeft = obj.offsetLeft;
	//console.log(obj.offsetParent.offsetTop);
	//此循环目前无实际意义
	while(obj.offsetParent){
		iTop += obj.offsetParent.offsetTop;
		iLeft += obj.offsetParent.offsetLeft;
		obj = obj.offsetParent;
	}

	return {top:iTop, left:iLeft}
}

//PhotoWall
var PhotoWall = function()
{
	return this.initialize.apply(this, arguments);
}

PhotoWall.prototype = {
	//初始化函数
	initialize : function(boxName,data)
	{
		var that = this;
		this.oName = boxName;
		this.oParent = document.createElement('div');
		this.oUl = null;
		this.oBtn = null;
		this.oData = data;
		this.oIndex = 1;
		this.oPos = [];


		//初始化照片墙
		this.create();
		//给随机排序按钮绑定事件
		this.oBtn.onclick = function(){
			that.randomOrder();
		}

		this.drag();

		//console.log(this);
	},

	//初始化照片墙dom
	create : function()
	{
		var temp = [];

		this.oParent.innerHTML = "<h2 class='title'><span>照片墙</span><a href='javascript:' class='order'>随机排序</a></h2>"+
								 "<ul></ul>";
		this.oParent.className = 'box';
		this.oParent.id  = this.oName;
		//console.log(this.oParent);
		document.body.appendChild(this.oParent);

		this.oUl = $("ul",this.oParent)[0];
		this.oBtn = $('a',this.oParent)[0];

		for(var i=0,len=this.oData.length;i<len;i++){
			temp.push('<li><img src="'+ this.oData[i] +'"><div class="info">双击查看大图</div></li>');
		}
		this.oUl.innerHTML = temp.join('');

		this.oLi = $('li',this.oParent);
		//console.log(this.oLi);
		this.changeLayout();
	},

	//改变box和li的样式
	changeLayout : function()
	{
		this.oPos.length = 0;
		this.oParent.style.height = this.oParent.clientHeight + 'px';
		for(var i=0,len=this.oLi.length;i<len;i++){
			this.oLi[i].style.cssText = '';
		}
		for(var i=0,len=this.oLi.length;i<len;i++){
			this.oLi[i].index = i;
			this.oLi[i].style.top = getPos(this.oLi[i]).top + 'px';
			this.oLi[i].style.left = getPos(this.oLi[i]).left + 'px';
			this.oPos.push({top:getPos(this.oLi[i]).top, left:getPos(this.oLi[i]).left});
			//if(i == 9){console.log(this.oPos[9]);}
			
		}
		for(var i=0,len=this.oLi.length;i<len;i++){
			this.oLi[i].style.position = 'absolute';
			this.oLi[i].style.margin = '0';
			//绑定拖拽事件
			this.oLi[i].style.cursor = 'move'
		}	
	},

	//绑定拖拽事件
	drag : function()
	{
		var that = this;
		var eventTarget = document.getElementById(this.oName);

		eventTarget.addEventListener('dblclick',function()
		{
			//console.log(event.target);
			if(event.target && event.target.className == 'info')
			{
				var mask = $$('mask');
				mask.style= "display: block";
				that.showImg(event);
			}
			
		});

		eventTarget.addEventListener('mousedown', function(event)
		{
			if(event.target && event.target.className == 'info')
			{
				var handle = event.target.parentNode;
				//浏览器到ul内边框的距离，为了方便计算移动后li的top和left
				var disX = event.clientX - handle.offsetLeft;
				var disY = event.clientY - handle.offsetTop;
				//console.log(event)

				var oNear = null;
				handle.style.zIndex = that.oIndex++;

				document.addEventListener('mousemove', handle_1 = function(event)
				{
					var iL = event.clientX - disX;
					var iT = event.clientY - disY;

					//console.log(document.body.scrollWidth);
					var maxL = Math.max(document.body.clientWidth, document.body.scrollWidth) - handle.offsetWidth; 
					var maxT = Math.max(document.body.clientHeight, document.body.scrollHeight) - handle.offsetHeight;

					iL<0 && (iL=0);
					iT<0 && (iT=0);
					iL>maxL && (iL=maxL);
					iT>maxT && (iT=maxT);

					handle.style.top = iT + 'px';
					handle.style.left = iL + 'px';

					oNear = that.findNearest(handle);

					for(var i=0,len=that.oLi.length;i<len;i++)
					{
						that.oLi[i].className = '';
					} 
					oNear && (oNear.className = 'hig');
					return false;
				})
				
				document.addEventListener('mouseup',handle_2 = function (event)
				{
					//console.log(handle_1,handle_2)
					/*document.onmousemove = null;
					document.onmouseup = null;*/
					document.removeEventListener('mousemove',handle_1);
					document.removeEventListener('mouseup',handle_2);

					if(oNear)
					{
						//console.log(oNear);
						//console.log(handle.index);
						//交换拖拽li和最近li的index，方便更换确定oPos
						
						/*handle.index = [handle.index, oNear.index];
						oNear.index = handle.index[0];
						handle.index = handle.index[1];*/

						//交换后，直接改变保存li位置的数组oPos，而不是交换两者li的index，以便查看大图后的交换成功进行			
						var posHandle = that.oPos[handle.index];
						var posNear = that.oPos[oNear.index];
						that.oPos.splice(handle.index,1,posNear);
						that.oPos.splice(oNear.index,1,posHandle);

						oNear.style.zIndex = that.oIndex++;
						//console.log(handle.index);
						that.doMove(handle, that.oPos[handle.index]);
						that.doMove(oNear, that.oPos[oNear.index]);

						oNear.className = '';

						for(q in that.oLi)
						{
							console.log(that.oLi[q].index);
						}

					}else
					{
						//console.log(handle);
						that.doMove(handle,that.oPos[handle.index]);
					}

					handle.releaseCapture && handle.releaseCapture();
				})

				handle.setCapture && handle.setCapture();
				return false;
			}
			
		})
		
	},

	//移动方法
	doMove : function(obj,target,callback)
	{
		//console.log(target);
		var that = this;
		clearInterval(obj.timer);

		obj.timer = setInterval(function()
		{
			//获取当前的top和left
			var curL = getPos(obj).left;
			var curT = getPos(obj).top;
			var speedL = (target.left - curL)/5;
			var speedT = (target.top - curT)/5;
			speedL = speedL>0 ? Math.ceil(speedL) : Math.floor(speedL);
			speedT = speedT>0 ? Math.ceil(speedT) : Math.floor(speedT);

			if(curL == target.left && curT == target.top)
			{
				clearInterval(obj.timer);
				callback && callback();
			}else
			{
				obj.style.top = curT + speedT + 'px';
				obj.style.left = curL + speedL + 'px';
			}
		},30)
	},

	//寻找离目标最近的li
	findNearest : function(obj)
	{
		var distance = [],
			min = Number.MAX_VALUE,
			minIndex = -1;

		//列出目标距所有li的距离，存到distance中
		for(var i=0,len=this.oLi.length;i<len;i++)
		{
			distance[i] = this.oLi[i]==obj ? Number.MAX_VALUE : this.getDistance(obj,this.oLi[i]);
		}
		//找出最短距离
		for(var i=0,len=distance.length;i<len;i++)
		{
			distance[i]<min &&  (min = distance[i], minIndex = i);
		}

		//console.log(minIndex,distance[minIndex]);
		//确定移动到哪里时触发换位
		return this.isButt(obj,this.oLi[minIndex]) ? this.oLi[minIndex] : null;
	},

	//计算两li间的距离
	getDistance : function(obj1, obj2)
	{	

		var x = (obj1.offsetWidth/2 + obj1.offsetLeft) - (obj2.offsetWidth/2 + obj2.offsetLeft);
		var y = (obj1.offsetHeight/2 + obj1.offsetTop) - (obj2.offsetHeight/2 + obj2.offsetTop);
		//console.log(obj2,Math.sqrt(x*x + y*y),x,y)
		return Math.sqrt(x*x + y*y);
	},

	//确定触发换位的位置
	isButt : function(obj1, obj2)
	{
		var l1 = obj1.offsetLeft;
		var t1 = obj1.offsetTop;
		var s_l1 = l1 + obj1.offsetWidth;
		var s_t1 = t1 + obj1.offsetHeight;

		var l2 = obj2.offsetLeft;
		var t2 = obj2.offsetTop;
		var s_l2 = l2 + obj2.offsetWidth;
		var s_t2 = t2 + obj2.offsetHeight;

		//console.log("do!")

		return !(s_l1 < l2 || s_t1 < t2 || s_l2 < l1 || s_t2 < t1)//这个地方不是特别理解。。。这里写的是不触发换位的条件
	},

	//随机排序
	randomOrder : function()
	{
		this.oPos.sort(function() {return Math.random() > 0.5 ? 1 : -1} )

		for(var i=0,len=this.oLi.length;i<len;i++)
		{
			this.doMove(this.oLi[i], this.oPos[i])
			this.oLi[i].index = i;
		}

		//console.log(this.oLi[0].index)
	}
	,
	showImg : function(e)
	{
		var that = this;
		//console.log(e.target);
		//console.log(event.target.parentNode.getElementsByTagName('img')[0]);
		var showDiv = $$('showDiv')[0];

		//console.log(showDiv);

		var imgNode = $('img',showDiv)[0];
		var img = e.target.parentNode.getElementsByTagName('img')[0].src;
		var closeNode = $$('_close')[0];
		//console.log(closeNode);
		//console.log(img);
		imgNode.src = img;
		showDiv.style ='display:block';
		$$('mask')[0].style = 'display:block';
		closeNode.onclick = function(){
			that.removeMask();
		}
	},

	removeMask : function()
	{
		var showDiv = $$('showDiv')[0];
		var maskNode = $$('mask')[0];
		var that = this;
		this.oParent = document.getElementById(this.oName);

		showDiv.style = 'display:none';
		maskNode.style = 'display:none';

		this.oLi = $('li',this.oParent);//删除节点后，原来找到的this.oLi不能使用了。。。得重新绑定事件
		//console.log(this.oLi);但是重新查找到的ul中li的排列顺序仍然没有变，需要有一个数组专门存储li的顺序
		this.oBtn = $('a',this.oParent)[0];
		//console.log(this.oLi);

		for(var i=0,len=this.oLi.length;i<len;i++)
		{
			this.oLi[i].index = i;
		}

		this.oBtn.onclick = function()
		{
			that.randomOrder();
		}
				
		console.log(this.oPos,this.oLi);
	}
}
