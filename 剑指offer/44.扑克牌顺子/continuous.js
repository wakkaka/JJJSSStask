function IsContinuous(numbers)
{
    // write code here
    var len = numbers.length,
        small,
        big,
        numZero = 0,
        numGap = 0
    
    numbers.sort(compare)
    console.log(numbers)
    //统计0的个数
    for(var i=0; i<len; i++)
    {
        if(numbers[i] == 0)
            numZero++
    }
    
    //统计跨度
    small = numZero
    big = small + 1
    
    while(big < len)
    {
        if(numbers[small] == numbers[big])
            return false
         
        numGap += numbers[big] - numbers[small] - 1
        small = big
        big++
    }
    
    return (numZero < numGap) ? false : true 
}

function compare(a, b)
{
    return a - b
}

export default IsContinuous