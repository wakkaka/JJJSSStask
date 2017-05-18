function minNumberInRotateArray(rotateArray)
{
    // write code here
    var index1 = 0,
        index2 = rotateArray.length - 1,
    	indexMid = index1
    	
   	while(rotateArray[index1] >= rotateArray[index2])
    {
        if(index2 - index1 == 1)
        {
            indexMid = index2
            break
        }
        
        indexMid = Math.floor((index1 + index2)/2)
        
        //index1、index2、indexMid都相等时，使用顺序查找的方法找到最小值
        if(rotateArray[index1] == rotateArray[index2] && rotateArray[index1] == rotateArray[indexMid])
            return inOrder(rotateArray, index1, index2)
            
        //使用二分查找找到最小值
        if(rotateArray[indexMid] >= rotateArray[index1])
        {
            index1 = indexMid
        } else if (rotateArray[indexMid] <= rotateArray[index2])
        {
            index2 = indexMid
        }
    }
    
    return rotateArray[indexMid]
}

function inOrder(rotateArray, index1, index2)
{
	var result = rotateArray[index1]
    for(var i=0;i<index2;i++)
    {
        if(result > rotateArray[i])
            result = rotateArray[i]
    }
    
    return result
}

export default minNumberInRotateArray