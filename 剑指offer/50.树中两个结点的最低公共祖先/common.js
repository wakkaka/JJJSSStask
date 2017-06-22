//前提：不是二叉搜索树，没有从子节点指向父节点的指针
function GetLastCommonParent(pRoot, pNode1, pNode2)
{
	var path1 = [],
		path2 = [],
		res

	if(pRoot == null || pNode1 == null || pNode2 == null)
		return null

	GetNodePath( pRoot, pNode1, path1 )
	GetNodePath( pRoot, pNode2, path2 )

	res = GetLastCommonNode( path1, path2 )

	return res
}

function GetNodePath( pRoot, pNode, path )
{
	var found = false

	if(pRoot == pNode)
	{
		path.push(pNode.val)
		return true
	}
	path.push
}