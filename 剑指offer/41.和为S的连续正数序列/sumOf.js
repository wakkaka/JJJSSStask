function FindContinuousSequence(sum)
{
    // write code here
    var curSum = 3,
        small = 1,
        big = 2,
        mid = (1 + sum) >> 1,
        res = []

    if(sum < 3)
        return res
   
	while(small < mid)
    {
        if(curSum == sum)
        {
            res.push( printSmaToBig( small, big ) )
        }

       while(small < mid && curSum < sum)
       {
           big++
           curSum += big

           if(curSum == sum)
           {
               res.push( printSmaToBig( small, big ) )
           }
       }
       
       curSum -= small
       small++
    }
   return res
     
}

function printSmaToBig(sma, big)
{
    var res = []

    for(var i=sma; i<=big; i++)
    {
        res.push(i)
    }

    return res
}

export default FindContinuousSequence