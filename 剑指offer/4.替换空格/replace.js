function Replace(str)
{
	//直接用replace()太简单
	//return str.replace(/\s/g, '%20')//正则不加引号，谢谢
	
	//先将字符串转为数组，每一个空格使转换后的字符串长度加2，
	//从后向前进行替换
	var strArr = str.split(''),
		lenBefore = strArr.length - 1,
		lenAfter,
		space = 0

	for(var i=0;i<=lenBefore;i++) 
	{
		(strArr[i] == ' ') && ++space
	}
	console.log(space)
	lenAfter = lenBefore + space * 2
	console.log(strArr)

	while(lenBefore >= 0 && lenAfter > lenBefore)
	{
		if(strArr[lenBefore] == ' ')
		{
			strArr[lenAfter --] = '0'
			strArr[lenAfter --] = '2'
			strArr[lenAfter --] = '%'
		} else {
			strArr[lenAfter --] = strArr[lenBefore]
		}

		lenBefore--
	}

	return strArr.join('')


}

export default Replace