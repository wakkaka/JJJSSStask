function IsBalanced_Solution(pRoot)
{
    // write code here
    var deep = [],
        root = "root"
    
    return isBalanced( pRoot, deep, root)
}

function isBalanced(pRoot, deep, index)
{  
    var left = "left",
        right = "right",
        dif
    
    if(pRoot == null)
    {
        deep[index] = 0
        return true
    }
    
    if(isBalanced( pRoot.left, deep, left ) && isBalanced( pRoot.right, deep, right ))
    {
        dif = deep[left] - deep[right]
        
        if(dif >= -1 && dif <= 1)
        {
            deep[index] = 1 + ( deep[left] > deep[right] ? deep[left] : deep[right])
            return true
        }
    }
    
    return false
}

export default IsBalanced_Solution