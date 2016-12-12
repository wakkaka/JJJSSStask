function $(id){
	return typeof id ==='string'?document.getElementById(id):id;
}

window.onload=function(){
	var footTitles =$('footer').getElementsByTagName('span');
	var bodyContents =document.getElementsByClassName('body');

	for(var i=0;i<footTitles.length;i++){
		footTitles[i].id = i;
		footTitles[i].onclick=function(){
			for(var j=0;j<footTitles.length;j++){
				footTitles[j].className = '';
				bodyContents[j].style.display = 'none';
			}
			this.className='select';
			bodyContents[this.id].style.display = 'flex';
		}
	}
}