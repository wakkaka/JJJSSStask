var utils = {
	getByClass: function (className, root, tag) {
		var result = [];

		if (root) {
			root = typeof root === "string" ? document.getElementById(root) : root;
		} else {
			root = document.body;
		}

		tag = tag || "*";
		els = root.getElementsByTagName(tag);

		for (var i = 0; i < els.length; i++) {

			var el = els[i];
			var cls = el.className.split(" ");

			for (var j = 0; j < cls.length; j++) {
				if (className === cls[j]) {
					result.push(el);
					break;
				}
			}
		}
		return result;
	},
	addClass: function (el, className) {
		if (!new RegExp("(^|\\s+)" + className + "($|\\s+)").test(el.className)) {
			el.className = el.className + " " + className;
		}

	},
	removeClass: function (el, className) {
		var reg = new RegExp("(^|\\s+)" + className + "($|\\s+)");
		el.className = el.className.replace(reg, "");
	},
	bind: function (object, fn) {
		return function() {
			fn.apply(object, arguments);
		}
	},
	addEvent: function (el, type, handler) {
		if (el.addEventListener) {
			el.addEventListener(type, handler, false);
		} else if (el.attachEvent) {
			el.attachEvent("on" + type, handler);
		} else {
			el["on" + type] = handler;
		}
	},
	removeEvent: function (el, type, handler) {
		if (el.removeEventListener) {
			el.removeEventListener(type, handler, false);
		} else if (el.detachEvent) {
			el.detachEvent("on" + type, handler);
		} else {
			el["on" + type] = null;
		}
	},

	$: function (id){
		return typeof id ==='string'?document.getElementById(id):id;
	}
};
