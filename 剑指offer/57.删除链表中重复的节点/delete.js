/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function deleteDuplication(pHead)
{
    // write code here
    var pPre = null,
        pNode = pHead,
        needDel = false,
        pNext,
        pDel,
        temVal
    
    if(pHead == null)
        return null
        
    while(pNode != null)
    {
        pNext = pNode.next
        needDel = false
        if(pNext != null && pNext.val === pNode.val)
        {
            needDel = true
        }
         
        if(!needDel)
        {
            pPre = pNode
            pNode = pNode.next
        } else {
            temVal = pNode.val
            pDel = pNode
            
            while(pDel != null && pDel.val === temVal)
            {
                pNext = pDel.next
                pDel = pNext

            }
            
            if(pPre == null)
            {
                pHead = pNext
            } else {
                pPre.next = pNext
            }
            
            pNode = pNext
        }
    }
    
    return pHead
    
}
export default deleteDuplication