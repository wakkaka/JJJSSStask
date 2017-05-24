function IsPopOrder(pushV, popV)
{
    // write code here
    var lenPush = pushV.length,
        lenPop = popV.length,
        bPossible = false,
        arr = [] ,//辅助栈
    	nextPush = 0,
        nextPop = 0
   	
    if(lenPush < lenPop)
        return false
    
    if(lenPush != 0 && lenPop != 0)
    {
        while(nextPop < lenPop)
        {
            while(arr.length == 0 || arr[arr.length - 1] != popV[nextPop])
            {
                if(nextPush >= lenPush)
                break
                    
                arr.push(pushV[nextPush])
                nextPush++
            }
            
            if(arr[arr.length - 1] != popV[nextPop]){
                break
            }

            arr.pop(), bPossible
            nextPop++
        }
        if(nextPop == lenPop)
        {
            bPossible =true
        }
    }
    
    return bPossible
}

export default IsPopOrder