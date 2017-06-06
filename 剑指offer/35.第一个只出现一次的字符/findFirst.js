function FirstNotRepeatingChar(str)
{
    // write code here
    var hashTable = [],
        len = str.length,
        index = null
    
    for(var i=0; i<len; i++)
    {
        if( hashTable[ str[i] ] == null )
        {
            hashTable[ str[i] ] = 1
        } else {
            hashTable[ str[i] ]++
        }
        
    }

    console.log(hashTable)

    for(var i=0; i<len; i++)
    {
        if(hashTable[ str[i] ] == 1)
        {
            index = i
            return index
        }
    }
    
    return index
}

export default FirstNotRepeatingChar