window.onload=function(){
	var titles = utils.getByClass('my_tap');

	new Tab({
		tabBox: titles[0],
		trigger: 'mouseover',
		menuHasClass: 'select'
	});
}