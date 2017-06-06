function InversePairs(data)
{
    // write code here
    var len = data.length,
        start = 0,
        end = len - 1,
        res = 0,
        copy = []
    
    if(len <= 0)
    {
        return res
    }
    
    res = inversePairsCore( data, copy, start, end )
  	
    return res % 1000000007 
   	
}

function inversePairsCore(data, copy, start, end)
{
    var mid = start + Math.floor( (end - start) >> 1 ),
        left,
        right,
        i = mid,
        j = end,
        indexCopy = end,
        count = 0
    
    if(start == end)
    {
        copy[start] = data[start]
        return 0
    }
    
    left = inversePairsCore( data, copy, start, mid )
    right = inversePairsCore( data, copy, mid + 1, end )
    
    while(i >= start && j >= mid + 1)
    {
        if(data[i] > data[j])
        {
            copy[indexCopy--] = data[i--]
            count += j - mid
        } else {
            copy[indexCopy--] = data[j--]
        }
    }
    
    for(;i>=start;i--)
    {
        copy[indexCopy--] = data[i]
    }
    
    for(;j>=mid+1;j--)
    {
        copy[indexCopy--] = data[j]
    }

    //copy复制到原数组中,如果没有这句话就会错，因为data的数组并没有被排序，归并排序出错
    for(var k = 0,len = copy.length; k<len; k++)
    {
        if(copy[k])
        {
            data[k] = copy[k]
        }
    }

    return left + right + count

    
}

export default InversePairs