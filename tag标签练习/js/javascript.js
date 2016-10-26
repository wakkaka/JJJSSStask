function $(id){
	return typeof id ==='string'?document.getElementById(id):id;
}

window.onload=function(){
	//获取鼠标所在的标签
	var titles = $('tab_title').getElementsByTagName('li'),
		contents = $('tab_content').getElementsByTagName('div');
	for(var i=0;i<titles.length;i++){
		//给每个标题赋id
		titles[i].id=i;
		//绑定动作||清空所有标题的样式、清除内容的样式
		titles[i].onmouseover=function(){
			for(var j=0;j<titles.length;j++){
				titles[j].className = '';
				contents[j].style.display = 'none';
			}
		//鼠标滑过的标题选择
		this.className='select';
		//相应的内容选择
		contents[this.id].style.display='block';

		}
	}
}