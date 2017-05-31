function NumberOf1Between1AndN_Solution(n)
{
    // write code here
    var strN = (n+'').split('')

    if(n<0)
        return 0
    
   	return Number(strN)
   
}

function Number(arr)
{
    var len = arr.length,
        numFirst = 0,
        numOther = 0,
        numRec = 0,
        first = arr[0]
    
    if(len<=0)
        return 0
   	if(len == 1 && first == 0)
        return 0
    if(len == 1 && first == 1)
        return 1
    
    //将数字分成两部分，1出现在高位的情况
    if(first > 1)
    {
        numFirst = Math.pow( 10, len - 1 )
    } else if(first == 1)
    {
        numFirst = arr.slice( 1 ).join('') * 1 + 1 //强转类型
    }
    //1出现在其他位的情况
    numOther = first * (len - 1) * Math.pow( 10, len - 2 )
    
    //递归的求低位
    var rec = arr.slice(1)
    numRec = Number( rec )

    console.log( numFirst,numOther,numRec )
    return numFirst + numOther + numRec
}

export default NumberOf1Between1AndN_Solution