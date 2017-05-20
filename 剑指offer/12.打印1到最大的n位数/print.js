function Print1ToMax(n)
{
	var number = []

	if(n<0)
	{
		return -1
	}

	for(var i=0; i<10; i++)
	{
		number[0] = i + 0
		Print( number, n , 0 )
	}
}

function Print(number, length, index)
{
	if(index == length -1)
	{
		PrintNumber(number)
		return
	}

	for(var i=0; i<10; i++)
	{
		number[index + 1] = i + 0
		Print( number, length, index +1 )
	}
}

function PrintNumber(number)
{
	var isBegin0 = true,
		len = number.length

	for(var i=0; i<len;i++)
	{
		if(isBegin0 && number[i] != 0)
		{
			isBegin0 = false
		}

		if(!isBegin0)
		{
			console.log(number[i])
		}
	}
}

export default Print1ToMax