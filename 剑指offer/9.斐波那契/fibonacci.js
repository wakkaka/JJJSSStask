function Fibonacci(n)
{
    // write code here
    if(n==0 || n==1)
    {
        return n
    } else {
        return Fibonacci(n-2) + Fibonacci(n-1)
    }
    
}

export default Fibonacci