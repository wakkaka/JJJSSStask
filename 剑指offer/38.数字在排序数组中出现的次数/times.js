function GetNumberOfK(data, k)
{
    // write code here
    var len = data.length,
        start = 0,
        end = len - 1,
      	res = 0,
        fir,
        last
    
    if(len <= 0)
        return res
   
    fir = findFirst( data, start, end, k )
    last = findLast( data, start, end, k )
    if(fir>=0 && last >=0)
        res = last - fir + 1
    
    return res
}

function findFirst(data, start, end, k)
{
    var len = data.length,
        mid = (start + end) >> 1,
        midData = data[mid]
 	
    if(start > end)
        return -1
    
    if(midData == k)
    {
        //此时mid为第一个出现k的地方
        if((mid > 0 && data[ mid-1 ] != k) || mid == 0)
        {
            return mid 
        } else {
            //不是第一个出现k的地方
            end = mid - 1
        }
    } else if( midData > k )
    {
        end = mid - 1
    } else {
        start = mid + 1
    }
    console.log(start , end)
    return findFirst( data, start, end, k )
}

function findLast(data, start, end, k)
{
    var len = data.length,
        mid = (start + end) >> 1,
        midData = data[mid]
    
    if(start > end)
        return -1
    
    if(midData == k)
    {
        if((mid < len - 1 && data[ mid + 1 ] != k) || mid == len - 1)
        {
            //mid为最后一个出现k的地方
            return mid
        } else {
            //
            start = mid + 1
        }
    } else if(midData > k)
    {
        end = mid - 1
    } else {
        start = mid + 1
    }
    console.log(start , end)
    return findLast( data, start, end, k )
}

export default GetNumberOfK