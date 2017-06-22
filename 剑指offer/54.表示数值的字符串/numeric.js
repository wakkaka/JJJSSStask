//s字符串
function isNumeric(s)
{
    // write code here
    var arr = s.split(''),
        len = arr.length,
        index = 0,
        isTrue = true,
        temRes

    if(len <= 0)
        return false
    if(arr[index] === '+' || arr[index] === '-')
        index++
	if(arr[index] == null)
        return false
        
    index = scanDigits( arr, index )
    
    if(arr[index] != null)
    {
        if(arr[index] === '.')
        {
            //小数
           	++index
            index = scanDigits( arr, index )
            if(arr[index] === 'e' || arr[index] === 'E')
            {
                temRes = isExpon( arr, index )
                isTrue = temRes.isTrue
                index = temRes.index
            }
        } else if (arr[index] === 'e' || arr[index] === 'E')
        {
            temRes = isExpon( arr, index )
            isTrue = temRes.isTrue
            index = temRes.index
        }
          else {
              return false
          }
    }
    return isTrue && ( arr[index] == null )
}

function scanDigits(arr, index)
{
    var len = arr.length
    
    while(index < len && arr[index] >= '0' && arr[index] <= '9')
    {
        ++index
    }
    
    return index
}

function isExpon(arr, index)
{
    var len = arr.length
    
    if(arr[index] !== 'e' && arr[index] !== 'E')
        return false
    
    ++index
    
    if(arr[index] === '+' || arr[index] === '-')
        ++index
    
   	if(arr[index] == null)
        return false
     
    index = scanDigits( arr, index )
    
    var isTrue =  (arr[index] == null) ? true : false

    return { isTrue : isTrue, index : index }
}

export default isNumeric