function $(id){
	return typeof id ==='string'?document.getElementById(id):id;
}

window.onload=function(){
	var footTitles =$('footer').getElementsByTagName('span');
	for(var i=0;i<footTitles.length;i++){
		footTitles[i].onclick=function(){
			for(var j=0;j<footTitles.length;j++){
				footTitles[j].className = '';
			}
			this.className='select';
		}
	}
}