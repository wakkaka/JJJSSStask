function Permutation(str)
{
    // write code here
    var arr = str.split(''),
        len = str.length,
        res = []
    
    if(arr.length == 0)
        return res
    
    res = permutate( arr , 0 ,res )
    
    return res
    
}

function permutate(str, begin, res)
{
    var len = str.length
    if(begin == len - 1)
    {
        var resTem = str.slice().join(''),
            flag = true

        for(var i = 0,len=res.length; i<len; i++)
        {
            if(res[i] == resTem)
                flag = false
        }

        if(flag){
            res.push(resTem)
        }
    } else {
        for(var i = begin; i<len; i++)
        {
            var tem = str[i]
            
            str[i] = str[begin]
            str[begin] = tem
            
            res = permutate( str, begin + 1, res )
            
            tem = str[i]
            str[i] = str[begin]
            str[begin] = tem
        }
    }
    
    return res
    
        
}

export default Permutation