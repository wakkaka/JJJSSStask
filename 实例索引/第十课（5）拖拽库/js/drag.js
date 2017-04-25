import $ from 'jquery'
/**
 * 关于拖拽的问题：
 * 写了这么多次拖拽还是注意常见的这个问题：
 * 
 * ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
 * 在绑定mousedown事件的时候，target是拖动物体；在绑定mousemove和mouseup事件的时候
 * target是整个页面，即document
 * ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
 */
function Drag() 
{
	this.initialize.apply(this, arguments)
}

Drag.prototype = {
	//初始化
	initialize : function(options)
	{	
		this.$container = $(options.container)
		this.$handler = $(options.handler)

		this.lockX = false
		this.lockY = false
		this.lock = false
		this.lockRange = false
		this.maxTop = Math.max(document.body.clientHeight,document.body.scrollHeight) - this.$container[0].offsetHeight
		this.maxLeft = Math.max(document.body.clientWidth,document.body.scrollWidth) - this.$container[0].offsetWidth
		
		this.bindEvents()
	},

	bindEvents : function()
	{
		var that = this
		this.$handler.on('mousedown', function(e) {
			var event = e
			that._x = event.clientX - that.$container.offset().left
			that._y = event.clientY - that.$container.offset().top

			$(document).on('mousemove', function(e) {
				var event = e

				var iLeft = event.clientX - that._x
				var iTop = event.clientY - that._y

				if(that.lockRange) {
					console.log(iLeft)
					iLeft = (iLeft >= that.maxLeft) ? (that.maxLeft) : iLeft
					iLeft = (iLeft < 0) ? 0 : iLeft
					iTop = (iTop >= that.maxTop) ? (that.maxTop) : iTop
					iTop = (iTop < 0) ? 0 : iTop
				}

				if(! that.lock) {
					that.lockX || that.$container.css('left', iLeft)
					that.lockY || that.$container.css('top', iTop)
				}
				

				event.preventDefault && event.preventDefault()
			})

			$(document).on('mouseup', function(e) {
				var event = event

				$(document).off('mousemove')
				$(document).off('mousedown')

				this.releaseCapture && this.releaseCapture();
			})

			event.preventDefault && event.preventDefault();
			this.setCapture && this.setCapture();
		})

		$('.lockRange').on('click',function(){
			that.lockRange = !that.lockRange
			this.value = that.lockX ? "取消范围锁定" : "范围锁定"
		})

		$('.horiLock').on('click',function(){
			that.lockX = ! that.lockX
			this.value = that.lockX ? "取消水平锁定" : "水平锁定"
		})

		$('.vertiLock').on('click',function(){
			that.lockY = ! that.lockY
			this.value = that.lockY ? "取消垂直锁定" : "垂直锁定"
		})

		$('.lock').on('click',function(){
			that.lock = !that.lock
			this.value = that.lock ? "取消锁定" : "锁定"
		})

	}
}

export default Drag