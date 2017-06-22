function FindNumbersWithSum(array, sum)
{
    // write code here
    var len = array.length,
        small = 0,
        big = len - 1,
        curSum = 0,
        curMul,
        mul = 9007199254740991,
        res = []
    
    if(len < 2)
        return res
        
    while(small < big)
    {

        curSum = array[small] + array[big]

        if(curSum == sum)
        {
            curMul = array[small] * array[big]
            if( curMul < mul )
            {
                mul = curMul
                res.push( array[small], array[big] )
            }

            small ++

        }

        if(curSum < sum)
        {
            small++
        } else if(curSum > sum) 
        {
            big --
        }
    }
    
    return res
}

export default FindNumbersWithSum