/**
 * 发布订阅，用于MenList, SubMenu, Content之间的通信
 */

var pubsub = {}
var registerMap = {}

pubsub.subscribe = function(key, fn)
{
	registerMap[key] || (registerMap[key] = [])

	registerMap[key].push( fn )
}

pubsub.publish = function()
{
	var key = Array.prototype.shift.call( arguments ) // 返回并删除数组的第一个元素
	var fns = registerMap[key]
	var len = fns.length

	if(!fns || !len)
		return

	for(let i = 0;i < len; i++) {
		fns[i].apply( null, arguments )
	}
}

pubsub.unsubscribe = function(key, fn)
{
	var fns = registerMap[key]
	var len = fns.length

	// 不存在注册函数
	if(!fns)
		return

	// 如果没传第二个参数，意味着清空整个key
	if(!fn) {
		fns.length = 0
	} else {
		for(let i=0;i<len;i++) {
			if(fns[i] === fn) {
				fns.splice(i,1)
				break
			}
		}
	}
}

export default pubsub