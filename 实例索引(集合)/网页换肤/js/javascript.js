window.onload=function(){
	var oSkin = document.getElementById("skin").getElementsByTagName("li");
	var oCss = document.getElementsByTagName("link")[0];
	for(var i=0;i<oSkin.length;i++){
		oSkin[i].onclick=function(){
			for(var p in oSkin) oSkin[p].className = "";
			this.className = "select";
			oCss['href'] = "css/" + this.id + ".css";
		}
	}
}