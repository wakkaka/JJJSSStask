/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function Convert(pRootOfTree)
{
    // write code here
    var pHead = pRootOfTree,
        pLastNode = null
        
  	if(!pRootOfTree){
        return pHead 
    }

    convertNode( pRootOfTree, pLastNode )
    
    while(pHead && pHead.left)
    {
        pHead = pHead.left
        console.log(pHead)
    }

    return pHead
    
}

function convertNode(pNode, pLastNode)
{
    var pNode = pNode

    if(!pNode)
        return null
        
    if(pNode.left)
    {
        pLastNode = convertNode( pNode.left, pLastNode )
    }
    
    pNode.left = pLastNode

    if(pLastNode)
        pLastNode.right = pNode
        
    pLastNode = pNode
    
    if(pNode.right)
    {
        pLastNode = convertNode( pNode.right, pLastNode ) 
    }

    return pLastNode
}

export default Convert