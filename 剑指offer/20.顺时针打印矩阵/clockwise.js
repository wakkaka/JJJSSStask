function printMatrix(matrix)
{
    // write code here
    var start = 0,
        row = matrix.length,
        col = matrix[0].length,
        i,
        res = []

    if(matrix)
    {
        while(row > start * 2 && col > start * 2)
        {
            res.push.apply( res, Print( matrix, row, col, start))
            start++
        }
    }

    return res
}

function Print(matrix, row, col, start)
{
    var endX = col - start - 1,
        endY = row - start - 1,
        res = []
    console.log(endX,endY)
   	//左 -》右
    for(var i=start;i<=endX;i++)
    {
        res.push(matrix[ start ][ i ])
        console.log('!')
    }
    //上 -》下
    if( start < endY)
    {
        for(var i=start + 1; i<=endY; i++)
        {
            res.push(matrix[ i ][ endX ])
        }
    }
    //右 -》 左
    if( start < endY && start < endX)
    {
        for(var i = endX - 1; i>=start; i--)
        {
            res.push( matrix[ endY ][ i ] )
        }
    }
   	//下 -》上
  	if( start < endX && start < endY - 1)
    {
        for(var i = endY - 1; i>=start+1; i--)
        {
            res.push( matrix[ i ][ start ] )
        }
    }
    
    return res
}

export default printMatrix