function IsBalanced_Solution(pRoot)
{
    // write code here
    var deep = [],
        _root = "root"
    
    return isBalanced( pRoot, deep, _root)
}

function isBalanced(pRoot, deep, index)
{  
    var left = "left",
        right = "right",
        _root = "root",
        dif
    
    if(pRoot == null)
    {
        deep[index] = 0
        return true
    }
    
    if(isBalanced( pRoot.left, deep, left ) && isBalanced( pRoot.right, deep, right ))
    {
        dif = deep[left] - deep[right]
        console.log(pRoot.val, deep[left], deep[right], dif)
        if(dif >= -1 && dif <= 1)
        {
            deep[_root] = 1 + ( deep[left] > deep[right] ? deep[left] : deep[right])
            console.log(pRoot.val, deep[left], deep[right], deep[_root])
            return true
        }
    }
    
    return false
}

export default IsBalanced_Solution