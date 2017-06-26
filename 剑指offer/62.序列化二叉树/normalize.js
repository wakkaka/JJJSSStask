function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}

function Serialize(pRoot, res)
{
    // write code here
    var res = res || []
    if(!pRoot){
        res.push('$')
        return res
    }
    
    res.push(pRoot.val)
    res = Serialize( pRoot.left, res )
    res = Serialize( pRoot.right, res )
   
   	return res
}
function Deserialize(s, index)
{
    // write code here
    var index = index || 0,
        pNode,
        tem

    console.log(index)
    if(!s[index] || s[index] === '$')
    {
        return null
    }
   	
    pNode = new TreeNode( s[index] )
    
    index++
    tem = Deserialize( s, index )
    if(tem)
    {
        pNode.left = tem.pNode
        index = tem.index
    }


    index++
    tem = Deserialize( s, index )
    if(tem)
    {
        pNode.right = tem.pNode
        index = tem.index
    }

    return { pNode, index }
}

export default {Serialize, Deserialize}