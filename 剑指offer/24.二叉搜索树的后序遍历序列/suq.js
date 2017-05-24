function VerifySquenceOfBST(sequence)
{
    // write code here
    var len = sequence.length,
        root = sequence[len - 1],
        i,
        j,
        boolLeft = true,
        boolRight = true

    if(len == 0)
        return false
    
    for(i=0;i<len - 1;i++)
    {
        if(sequence[i] > root) //此时i位置的节点是右子树的开始(非顺序)
            break
    }
    
    for(j=i;j<len - 1;j++)
    {
        if(sequence[j] < root)
            return false
    }

    if(i>0)
    {
        console.log('left',i)
        boolLeft = VerifySquenceOfBST(sequence.slice( 0, i ))
    }
    
    if(i<len-1)
    {
        console.log('right',i)
        boolRight = VerifySquenceOfBST(sequence.slice( i ,i+1 ))
    }
    
    return boolLeft && boolRight
}

export default VerifySquenceOfBST