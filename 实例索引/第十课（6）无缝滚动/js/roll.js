function $(id) 
{
	return typeof id === "string" ? document.getElementById(id) : id
}

function $$(elem, oParent)
{
	return (oParent || document).getElementsByTagName(elem)
}

function $$$(className, oParent)
{
	var aClass = []
	var reClass = new RegExp('(^|//s)' + className + '($|//s)')
	var aElem = $$('*', oParent)
	for(var i=0,len=aElem.length;i<len;i++) 
	{
		reClass.test(aElem[i].className) && (aClass.push(aElem[i]))
	}

	return aClass
}

function Roll() 
{
	this.initialize.apply(this, arguments)
}

Roll.prototype = {
	initialize : function(obj)
	{
		var that = this
		this.obj = $(obj)
		this.oUp = $$$('up', this.obj)[0]
		this.oDown = $$$('down', this.obj)[0]
		this.oList = $$$('list', this.obj)[0]
		this.aItem = this.oList.children
		this.timer = null
		this.iHeight = this.aItem[0].offsetHeight


		this.bindEvents()
	},

	bindEvents : function()
	{
		var that = this
		this.obj.onclick = function(e)
		{
			var event = e || window.event
			var target = event.target

			if(target.nodeName.toLowerCase() == 'span')
			{
				switch(target.className)
				{
					case 'up' :
						that.up()
						break
					case 'down' :
						that.down()
						break
				}
			}
		}
	},

	up : function()
	{
		console.log(this.aItem[this.aItem.length -1])
		this.oList.insertBefore(this.aItem[this.aItem.length -1], this.oList.firstChild)
		console.log(this.aItem[this.aItem.length -1])
		this.oList.style.top = -this.iHeight + 'px'
		this.doMove(0)
	},

	down : function()
	{
		this.doMove(-this.iHeight, function() 
		{
			this.oList.appendChild(this.aItem[0])
			this.oList.style.top = 0
		})
	},

	doMove : function(target, callback)
	{
		var that = this

		clearInterval(this.timer)
		this.timer = setInterval( function()
		{
			console.log(that.oList.offsetTop)
			var speed = (target - that.oList.offsetTop) / 5
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)

			if(that.oList.offsetTop == target) {
				clearInterval(that.timer)
				callback && callback.apply(that)
			} else {
				that.oList.style.top = that.oList.offsetTop + speed + 'px'
			}

		}, 30 )
	}
}

export default Roll