/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function Print(pRoot)
{
    // write code here
    var toBePrint = 1,
        nextNum = 0,
        pNode = pRoot,
        nodes = [],
        res = [],
        resTem = [],
        index = 1,
        tem = []
    
    if(pRoot == null)
        return null
        
    nodes.push(pNode)

    while(nodes.length > 0)
    {

        pNode = nodes.shift()
        resTem.push(pNode.val)
        --toBePrint

        if(pNode.left != null)
        {
            nodes.push(pNode.left)
            ++nextNum
        }
        
        if(pNode.right != null)
        {
            nodes.push(pNode.right)
            ++nextNum
        }
        
        if(!toBePrint)
        {
            toBePrint = nextNum
            nextNum = 0
            if(index < 0)
            {
                while(resTem.length > 0)
                {
                    tem.push(resTem.pop())
                }


                res.push(tem)
            } else {
                res.push(resTem)
            }
            
            resTem = []
            tem = []
            index *= -1
        }
    }
    
    return res
}

export default Print