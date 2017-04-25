function $(id){
	return typeof id === 'string' ? document.getElementById(id) : id;
}

function $$(tagName,scope){
		return (scope||document).getElementsByTagName(tagName);
}


