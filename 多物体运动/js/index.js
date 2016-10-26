window.onload = function(){
	var oli= document.getElementsByTagName('li');
	for(var i=0,l=oli.length;i<l;i++){
		oli[i].timer = null;
		oli[i].onmouseover = function(){
			startMove(this,400);
		}
		oli[i].onmouseout = function(){
			startMove(this,200);
		}
	}
}