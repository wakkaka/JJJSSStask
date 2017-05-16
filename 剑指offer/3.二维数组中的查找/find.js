function Find(target, array) 
{
	var row = array.length - 1
	var col = array[0].length - 1
	var found = false

	//比较右上角
	var r = 0
	var c = col

	while(r<=row && c>=0) 
	{
		if(array[r][c] == target) {
			//右上角 等于 目标
			found = true
			break
		} else if(array[r][c] < target) {
			//右上角 小于 目标 去行
			++r
		} else if(array[r][c] > target) {
			//右上角 大于 目标 去列
			--c
		}
	}

	return found
}

export default Find