window.onload = function()
{
	var aData = [];
	var aExample = [];

	for(var i=0;i<22;i++)
	{
		aData[aData.length] = 'img/' + i + '.jpg';
	}

	for(var i=0;i<2;i++)
	{
		var oExample = new PhotoWall('wall_' + i,aData);
		
		aExample.push(oExample);
	}

	//在窗口或框架被调整大小时，重新布局
	this.onresize = function()
	{
		for(var p in aExample)
		{
			aExample[p].changeLayout();
		}
	};

	this.onresize();
}