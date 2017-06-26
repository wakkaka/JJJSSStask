/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function KthNode(pRoot, k)
{
    // write code here
    var arr = []
    arr[0] = k

    if(!pRoot || k <= 0)
    	return
    
    return Kth(pRoot, arr)
}

function Kth(pRoot, arr)
{
    var target = null

    if(pRoot.left != null)
    {
        target = Kth( pRoot.left, arr )
    }
    
    if(pRoot && !target)
    {
        if(arr[0] == 1)
        {
            target = pRoot.val
        }
        
      	arr[0]--
    }
    
    if(target == null && pRoot.right != null)
    {
        target = Kth( pRoot.right, arr )
    }
    
    return target
}

export default KthNode