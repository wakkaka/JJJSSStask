function Replace(str)
{
	return str.replace(/\s/g, '%20')//正则不加引号，谢谢
}

export default Replace