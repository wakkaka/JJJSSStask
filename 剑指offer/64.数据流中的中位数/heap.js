//先用数组实现最大堆和最小堆
function maxHeap()
{
	this.init()
}

maxHeap.prototype = {
	init : function ()
	{
		this.data = []
	},

	insert : function (val)
	{
		this.data.push(val)

		var childIndex = this.data.length - 1,
			fatherIndex = (childIndex - 1) >> 1

		while(fatherIndex >= 0)
		{
			if(this.data[childIndex] > this.data[fatherIndex])
			{
				swap( this.data, childIndex, fatherIndex )
			}

			childIndex = fatherIndex
			fatherIndex = (fatherIndex - 1) >> 1
		}
	},

	pop : function ()
	{
		var len = this.data.length, 
			res = this.data[0]

		//弹出堆顶，将最后一个叶子节点的值移到堆顶，重新构建最大堆
		this.data[0] = this.data.pop()
		this.reBuild()

		return res
	},

	reBuild : function ()
	{
		var max = this.data.length -1,
			left,
			right,
			index = 0,
			sel

		while(index <= max)
		{
			left = ((index + 1) << 1) - 1
			right = (index + 1) << 1

			sel = left
			if(right <= max)
			{
				sel = (this.data[left] > this.data[right]) ? left : right 
			}

			if(sel <= max && this.data[index] < this.data[sel])
				swap( this.data, index, sel )

			index = sel
		}
	},

	showData : function()
	{
		return this.data
	},

	size : function()
	{
		return this.data.length
	},

	top : function()
	{
		return this.data[0]
	}
}

//最小堆
function minHeap()
{
	this.init()
}

minHeap.prototype = {
	init : function ()
	{
		this.data = []
	},

	insert : function (val)
	{
		this.data.push(val)

		var childIndex = this.data.length - 1,
			fatherIndex = (childIndex - 1) >> 1

		while(fatherIndex >= 0)
		{
			if(this.data[childIndex] < this.data[fatherIndex])
			{
				swap( this.data, childIndex, fatherIndex )
			}

			childIndex = fatherIndex
			fatherIndex = (fatherIndex - 1) >> 1
		}
	},

	pop : function ()
	{
		var len = this.data.length, 
			res = this.data[0]

		//弹出堆顶，将最后一个叶子节点的值移到堆顶，重新构建最小堆
		this.data[0] = this.data.pop()
		this.reBuild()

		return res
	},

	reBuild : function ()
	{
		var max = this.data.length -1,
			left,
			right,
			index = 0,
			sel

		while(index <= max)
		{
			left = ((index + 1) << 1) - 1
			right = (index + 1) << 1

			sel = left
			if(right <= max)
			{
				sel = (this.data[left] < this.data[right]) ? left : right 
			}

			if(sel <= max && this.data[index] > this.data[sel])
				swap( this.data, index, sel )

			index = sel
		}
	},

	showData : function()
	{
		return this.data
	},

	size : function()
	{
		return this.data.length
	},

	top : function()
	{
		return this.data[0]
	} 	
}

function swap(arr, a, b)
{
	var tem = arr[a]
	arr[a] = arr[b]
	arr[b] = tem
}

// export default { maxHeap, minHeap }

//寻找中位数
var max,
	min
function init()
{
	max = new maxHeap()
	min = new minHeap()
}


function Insert(num)
{
	var tem

	if(((max.size() + min.size()) & 1) == 0)
	{
		//长度为偶数，插入到最小堆中
		if(max.size()>0 && max.top() > num)
		{
			//特殊情况，要插入到min的数比max中的最大数小，则先插入
			//max中，再将max中最大数插入到min中
			max.insert(num)
			tem = max.pop()
			num = tem
		}

		min.insert(num)
	} else {
		//长度为奇数，插入到最大堆中
		if(min.size()>0 && min.top() < num)
		{
			//特殊情况
			min.insert(num)
			tem = min.pop()
			num = tem
		}

		max.insert(num)
	}
}

function getMid()
{
	var size = max.size() + min.size(),
		mid = 0

	if(size <= 0)
		return mid

	if((size & 1) == 1)
	{
		mid = min.top()
	} else {
		mid = (min.top() + max.top()) >> 1
	}

	return mid
}

export default { init, Insert, getMid }