function GetLeastNumbers_Solution(input, k)
{
    // write code here
    var len = input.length,
        index,
        res = [],
        start = 0,
        end = len - 1
    
    if(len <= 0)
        return res
    
    index = partition( input, start, end )  

    while(index != k - 1)
  	{
        if(index > k - 1 )
        {
            end = index - 1
            index = partition( input, start, end )
        } else if (index < k - 1 )
        {
            start = index + 1
            index = partition( input, start ,end )
        }
    }
    
    console.log(input)
    for(var i=0; i<k; i++)
    {
        res.push(input[i])
    }
    
    return res.sort()
}

function partition(input, start, end)
{
	var len = input.length,
        index = len >> 1,
        small = start - 1
        
    swap( input, end, index )
    for(index = start; index < end; index++)
    {
        if(input[index] < input[end])
        {
            ++small
            if(small != index)
                swap( input, small, index )
        }
    }
    
    console.log(input , index , end ,small)
    ++small
    swap( input, small, end )
    return small
}

// function swap(a,b)   //这样写交换函数不正确
// {
//     var tem = a
    
//     a = b
//     b = tem
// }

function swap(num,a,b)
{
    var tem = num[a]

    num[a] = num[b]
    num[b] = tem
}

export default GetLeastNumbers_Solution