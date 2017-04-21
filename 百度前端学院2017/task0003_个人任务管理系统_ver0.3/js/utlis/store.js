
var Store = {}

//在客户端新建一个存储对象，并新建一个 data
Store.store = function(name, callback) {
	callback = callback || function () {};

	window._dbName = name;

	if (!localStorage[name]) {
		var data = null;

		localStorage[name] = JSON.stringify(data);

	}
	console.log(JSON.parse(localStorage[window._dbName]))
	callback.call(this, JSON.parse(localStorage[name]));
}

//更新客户端存储对象
Store.update = function (menuList) {
	console.log(menuList)
	localStorage[window._dbName] = JSON.stringify(menuList);
	
	console.log(JSON.parse(localStorage[window._dbName]))
}


export default Store
