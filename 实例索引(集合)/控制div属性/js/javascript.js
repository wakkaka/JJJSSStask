var changeStyle = function (elem,attr,val) {
	elem.style[attr] = val;
};

window.onload=function(){
	var oElem = document.getElementsByTagName('input');
	var oDiv = document.getElementById('thisDiv');
	var oAttr = ["width","height","background","display","display"];
	var oVal = ["200px","200px","red","none","block"];
	console.log(oElem,oDiv,oAttr,oVal);
	for(var i=0;i<oElem.length;i++){
		oElem[i].index = i;
		oElem[i].onclick=function(){
			this.index == oElem.length-1 && (oDiv.style.cssText="");
			changeStyle(oDiv,oAttr[this.index],oVal[this.index]);
		}
	}
}