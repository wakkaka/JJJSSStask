function LeftRotateString(str, n)
{
    // write code here
    var arr = str.split(''),
    	len = arr.length,
        start = 0,
        end = len - 1

    if(len <= 0 || n>len || n<0)
        return 
    
   	reverse( start, start + n - 1, arr )
    reverse( start + n, end, arr )
    reverse( start, end, arr )
  	
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

export default LeftRotateString