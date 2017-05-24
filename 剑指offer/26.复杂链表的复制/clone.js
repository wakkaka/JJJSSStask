function RandomListNode(x){
    this.label = x;
    this.next = null;
    this.random = null;
}


function Clone(pHead)
{
    // write code here
    cloneNodes(pHead)
    cloneRandom(pHead)
    return reconnectClone(pHead)
}

function cloneNodes(pHead)
{
    var pNode = pHead,
        pClone = null
  	
    while(pNode)
    {
        pClone = new RandomListNode(pNode.label)
        pClone.next = pNode.next
        pNode.next = pClone
        
        pNode = pClone.next
    }
}

function cloneRandom(pHead)
{
	var pNode = pHead,
        pClone = null
    
    while(pNode)
    {
        pClone = pNode.next
        
        if(pNode.random)
        {
            pClone.random = pNode.random.next
        }
        
        pNode = pClone.next
    }
}

function reconnectClone(pHead)
{
    var pCloneHead = null,
        pNode = pHead,
        pCloneNode = null
    
    if(pNode)
    {
        pCloneHead = pCloneNode = pNode.next
        pNode.next = pCloneHead.next
        pNode = pNode.next
    }

    while(pNode)
    {
        pCloneNode.next = pNode.next
        pCloneNode = pCloneNode.next
        pNode.next = pCloneNode.next
        pNode = pNode.next
    }
    
    return pCloneHead
}

export default Clone