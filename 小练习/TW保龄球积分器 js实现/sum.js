function Sum()
{
	this.initialize.apply(this, arguments)
	console.log(this.doSum())
}

Sum.prototype = {
	initialize : function(items)
	{
		var tem = items.split('|').slice(11)
		this.items = items.split('|').slice(0,10)

		this.items = this.items.concat(tem) //最终得分的数组
		console.log( this.items )
	},

	trans : function(i,flag)
	{
	    var oFlag = flag || false //是否只返回第一位数

		if( this.items[i].indexOf('X') > -1) {
				//strike
				if(oFlag) {
					if(this.items[i].substring(1) == '-') {
						return 0
					} else {
						return parseInt(this.items[i].substring(1))
					}
				} else {
					return 10	
				}			
			} else if (this.items[i].indexOf('/') > -1) {
				//spare
				if(oFlag) {
					return parseInt(this.items[i].substring(0,1))
				} else {
					return 10
				}
			} else if (this.items[i].indexOf('-') > -1) {
				//miss
				if(oFlag) {
					return this.items[i].indexOf('-') == 0 ? 0 : parseInt(this.items[i].substring(0,1))
				} else {
					return this.items[i].indexOf('-') == 0 ? parseInt(this.items[i].substring(1)) : parseInt(this.items[i].substring(0,1))
				}
			} else {
				if(oFlag) {
					return parseInt(this.items[i].substring(0,1))
				} else {
					return (parseInt(this.items[i].substring(0,1)) + parseInt(this.items[i].substring(1)) )
				}
				
			}
	},

	doSum : function()
	{
		var sum = 0,
			i

		for(i=0;i<9;i++) {
			if( this.items[i].indexOf('X') > -1) {
				//strike
				sum += 10
				if(this.items[i+1].indexOf('X') > -1) {
					//第二位也是 X
					sum += 10
					if(this.items[i+2].indexOf('X')>-1) {
						//第三位也是 X
						sum += 10
					} else {
						//第三位是其他
						sum += this.trans( i+2, true )
					}
				} else {
					//第二位是其他
					sum += this.trans( i+1 )
				}
 
			} else if (this.items[i].indexOf('/') > -1) {
				//spare
				sum += 10
				if(this.items[i+1].indexOf('X')>-1) {
					//下一位是 X
					sum += 10
				} else {
					//下一位是其他
					sum += this.trans( i+1, true )
				}
				
			} else{
				//miss or normal
				sum += this.trans(i)
			}
		}

		if(this.items[9] == 'X') {
			//最后一次为 strike
			sum += 10
			if(this.items[10].substring(0,1) == 'X') {
				//额外机会为 X_
				sum += 10
				if(this.items[10].substring(1) == 'X') {
					//额外机会为 XX
					sum += 10
				} else {
					//额外机会为 X?
					sum += this.trans( 10, true )
				}
			} else {
				//额外机会为 __				
				if(this.items[10].substring(1) == 'X') {
					//额外机会为 _X
					sum += parseInt(this.items[10].substring(0,1))
					sum += 10
				} else {
					//额外机会为 _?
					sum += this.trans( 10 )
				}
			}
		} else if (this.items[9].indexOf('/') > -1) {
			//最后一次为spare
			sum += 10
			sum += this.trans( 10, true )
			
		} else {
			//normal
			sum += this.trans(9)
			
		}

		return sum
	}

}

export default Sum