var utility = require('./helper.js');
var Store = {}

//在客户端新建一个存储对象，并新建一个 data
Store.store = function(name, callback) {
	callback = callback || function () {};

	window._dbName = name;

	if (!localStorage[name]) {
		var data = {
			todos: [],
			class_1: [],
			class_2: []
		};

		data.class_1[0] = '默认分类';
		data.class_2[0] = null;
		localStorage[name] = JSON.stringify(data);

	}

	callback.call(this, JSON.parse(localStorage[name]));
}

//更新客户端存储对象
Store.save = function (updateData, callback, id) {
		var data = JSON.parse(localStorage[window._dbName]);//JSON.parse()  JSON-->JS
		var todos = data.todos;
		//console.log(todos);

		callback = callback || function () {};

		// 如果id存在，则更新id的数据
		if (id) {
			//console.log(id);
			//console.log(updateData);
			for (var i = 0; i < todos.length; i++) {
				if (todos[i].id == id) {
					//console.log("find it!");
					for (var key in updateData) {
						todos[i][key] = updateData[key];
					}
					//console.log(todos);
					break;
				}
			}

			localStorage[window._dbName] = JSON.stringify(data);
			callback.call(this, todos);
		} else {
			// 如果id不存在，则创建一个新id
			updateData.id = new Date().getTime();

			todos.push(updateData);
			localStorage[window._dbName] = JSON.stringify(data);
			utility.qs('.todo_title_span').id = updateData.id;
			callback.call(this, [updateData]);
		}
	};

Store.remove = function (id) {
		var data = JSON.parse(localStorage[window._dbName]);
		var todos = data.todos;

		for (var i = 0; i < todos.length; i++) {
			if (todos[i].id == id) {
				todos.splice(i, 1);//splice()直接对数组进行修改，slice()则不会
				break;
			}
		}
		localStorage[window._dbName] = JSON.stringify(data);//将数据转成JSON格式	
};

module.exports = Store
