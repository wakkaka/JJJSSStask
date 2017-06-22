function ReverseSentence(str)
{
    // write code here
    var arr = str.split(''),
    	len = arr.length,
        start = 0,
        end = len - 1
    
    if(len <= 0)
        return
    
    reverse( start, end, arr )
    console.log(arr)    
   	end = start
    
    while(start < len - 1)
    {
        console.log(start, end, len)
        if(arr[start] == " ")
        {   
            start++
            end++
        } else if(end == len || arr[end] == " ")
        {
            reverse( start, --end, arr )
            start = ++end
        } else {
            end++
        }
    }
    
    return arr.join('')
}

function reverse(start, end, arr)
{
    var tem
    
    while(start < end)
    {
        tem = arr[start]
        arr[start] = arr[end]
        arr[end] = tem
        
        start++
        end--
    }
}

export default ReverseSentence