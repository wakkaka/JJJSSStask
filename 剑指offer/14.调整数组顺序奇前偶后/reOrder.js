// function reOrderArray(array)
// {
//     // write code here
//     if(array.length == 0)
//         return -1
        
//    	var left = 0,
//         right = array.length - 1
//     while(left < right)
//     {
//         while(left < right && isTrue(array[left]))
//         {
//             ++left
//         }
//         while(left < right && !isTrue(array[right]))
//         {
//             --right
//         }
        
//         if(left < right)
//         {
//             var tem = array[left]
//             array[left] = array[right]
//             array[right] = tem
//         }
//     }
    
//     return array
// }

// function isTrue(num)
// {
// 	return (num & 0x1) == 1    
// }

function reOrderArray(arr)
{
    var len = arr.length,
        tem

    if(len == 0)
    {
        return -1
    }

    for(var i=0;i<len-1;i++)
    {
        for(var j=0;j<len-1-i;j++)
        {
            if((arr[j] & 0x1) == 0 && (arr[j+1] & 0x1) == 1)
            {
                tem = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = tem
            }
        }
    }

    return arr
}


export default reOrderArray