/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
//递归的方法
function ReverseList(pHead)
{
    // write code here
    var reverseHead = null
    
    if(pHead != null)
    {
        reverseHead = Reverse(pHead,null)
    }
    
    return reverseHead
}

function Reverse(pNode, pPrev)
{
	var pNode = pNode,
        pNext = pNode.next,
        pPrev = pPrev,
        Head = null
    
    if(pNext == null)
    {
        console.log(pNode.val)
        Head = pNode
    }

    pNode.next = pPrev
    pPrev = pNode
    pNode = pNext

    if(Head == null)
        Head = Reverse( pNode, pPrev )
    

    return Head
}

function ListNode(x){
    this.val = x;
    this.next = null;
}


export default ReverseList