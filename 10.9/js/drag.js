//定义根据ClassName取出元素组的方法
function getByClass(clsName,parent){
  var oParent=parent?document.getElementById(parent):document,
      eles=[],
      elements=oParent.getElementsByTagName('*');

  for(var i=0,l=elements.length;i<l;i++){
    if(elements[i].className==clsName){
      eles.push(elements[i]);
    }
  }
  return eles;
}

//页面加载完就直接运行drag
window.onload = drag;

//定义拖拽窗口的主方法
function drag(){
	var oTitle=getByClass('login_logo_webqq','loginPanel')[0];
	//拖拽
    oTitle.onmousedown=fnDown;
	//关闭登录框
	var oClose=document.getElementById('ui_boxyClose');
	oClose.onclick = function(){
	   	  document.getElementById('loginPanel').style.display='none';
	   }
	//切换在线状态
	var loginState      = document.getElementById('loginState'),
	    loginStatePanel = document.getElementById('loginStatePanel'),
	    lis = loginStatePanel.getElementsByTagName('li'),
	    stateTxt = document.getElementById('login2qq_state_txt'),
	    loginStateShow =document.getElementById('loginStateShow');
	//显示状态栏
	loginState.onclick=function(e){
		e = e||window.event;
		if(e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble=true;
		}
		loginStatePanel.style.display='block';
	}
	//状态栏鼠标滑过效果
	for(var i=0,l=lis.length;i<l;i++){
		lis[i].onmouseover=function(){
			this.style.background = '#567';
		}
		lis[i].onmouseout=function(){
			this.style.background ='#FFF';
		}
		lis[i].onclick=function(e){
			e = e||window.event;
			if(e.stopPropagation){
				e.stopPropagation();
			}else{
				e.cancelBubble=true;
			}
			var id = this.id;
			loginStatePanel.style.display='none';
			stateTxt.innerHTML = getByClass('stateSelect_text',id)[0].innerHTML;
			loginStateShow.className='';
			loginStateShow.className='login-state-show ' + id;


		}
	}
	document.onclick=function(){
		loginStatePanel.style.display ='none';
	}
}

function fnDown(){
	event = event || window.event;
	var oDrag=document.getElementById('loginPanel'),
		//光标按下时，光标距拖动窗口左侧和上侧的距离
		disX =event.clientX-oDrag.offsetLeft,
		disY =event.clientY-oDrag.offsetTop;
	//光标拖动时触发的拖拽动作
	document.onmousemove = function(event){
		event = event || window.event;
		fnMove(event,disX,disY);
	}
	document.onmouseup=function(){
		document.onmousemove= null;
		document.onmouseup  = null;
	}
}

function fnMove(e,posX,posY){
	var oDrag=document.getElementById('loginPanel');
	//document.title = event.clientX + ',' + event.clientY;
	//将拖拽窗口左上角绝对定位跟随鼠标位置，同时补正为鼠标所处位置
	var l = e.clientX-posX,
		t = e.clientY-posY,
		winW=document.documentElement.clientWidth || document.body.clientWidth,
		winH=document.documentElement.clientHeight ||document.body.clientHeight,
		maxW=winW-oDrag.offsetWidth-10,
		maxH=winH-oDrag.offsetHeight;
	//防止拖拽框拖出左右边框
	if(l<0){
		l=0;
	}else if(l>maxW){
		l=maxW;
	}else{
		oDrag.style.left = l+'px';
	}
	//防止拖拽框拖出屏幕上下边缘
	if(t<0){
		t=10
	}else if(t>maxH){
		t=maxH;
	}else{
		oDrag.style.top = t+'px';
	}
}
