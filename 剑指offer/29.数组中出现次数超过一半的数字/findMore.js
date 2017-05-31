function MoreThanHalfNum_Solution(numbers)
{
    // write code here
    // 快排分割法
    var len = numbers.length,
    	index,
        start = 0,
        end = len - 1,
        mid = len >> 1,
        res,
        isInputValid = false
    
    if(len <= 0)
        return 0
    
    index = partition( numbers, start, end )
    
    while( index != mid )
    {
        if(index > mid)
        {
            end = index - 1
            index = partition( numbers, start, end )
        } else {
            start = index + 1
            index = partition( numbers, start ,end )
        }
    }
    
    res  = numbers[mid]
    
    isInputValid = check( numbers, res )
    
    if(!isInputValid)
    {
        return res
    } else {
        return 0
    }
}

function partition(num, start, end)
{
    var len = num.length,
        index = len >> 1,
        small = start - 1
    
    swap( num, index, end )
    console.log(num)
    
    for(index= start; index<end; index++)
    {
        if(num[index] < num[end])
        {
            small++
            if(small != index)
                swap( num, small, index )
        }
    }
    
    //还原分割数的位置
    small++
    swap( num, small, end )
    console.log(small)
    return small
}

function check(num, res)
{
    var len = num.length,
        times = 0
    
    for(var i=0; i<len; i++)
    {
        if(num[i] == res)
            times++
    }
    
    if(times * 2 <= len)
        return true
    
    return false
}

// function swap(a,b) //这样换不过来数组中的值，因为传递的是值不是引用
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

export default MoreThanHalfNum_Solution