/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function FindPath(root, expectNumber)
{
    // write code here
    var path = [],
        curSum = 0,
        res = []
    
    if(!root)
        return
    
    res = Find( root, expectNumber, curSum, path, res).res
    return res[0]
    
}

function Find(root, expectNumber, curSum, path, res)
{
    var isLeaf = (root.left == null) && (root.right == null)
	curSum += root.val
    path.push(root.val)
    
    if(isLeaf && curSum == expectNumber){
        res.push( path.slice() ) //数组类型是引用，这里如果直接push(path)，则在最后一步的时候对path操作，res也会变

    }
    //继续遍历左子树
    if(root.left)
    {
        var tem = Find( root.left, expectNumber, curSum, path , res )
        path = tem.path
        res = tem.res
    }
    //继续遍历右子树
    if(root.right)
    {
        var tem = Find( root.right, expectNumber, curSum, path , res )
        path = tem.path
        res = tem.res
    }
    
    //返回上一层的时候删除本次的节点
    path.pop()
    return { path , res }
}

export default FindPath