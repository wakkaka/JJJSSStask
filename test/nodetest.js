// 去重且从小到大排序输出
// const readline = require('readline')
// const r1 = readline.createInterface({
// 	input: process.stdin,
// 	output: process.stdout
// })

// var line = -1
// var arr = []
// var res = []
// var len = 0

// r1.on('line', function (input) {
// 	if(line === -1) {
// 		len = input
// 		line = 1
// 		arr = [] // 这两句也很重要！！退出循环后腰把结果清空
//         obj = []
// 	} else {
// 		if(!arr[input]) {
// 			arr[input] = 1
// 			res.push(input)
// 		}

// 		if(len === 1) {
// 			console.log(res.sort(function (a, b) {
// 				return a - b
// 			}).join('\n'))
// 			line = -1 // 这句话很重要！！！要退出这个else的循环检查
// 		}
// 		--len
// 	}
// })

// 字符串分割
// const readline = require('readline')
// const r1 = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })
// var arr = []

// r1.on('line', function (input) {
//     arr.push(input)
    
//     if(arr.length === 2) {
//         arr.forEach(function (item) {
//             item = item.trim()
            
//             if(item !== '') {
//                 if(item.length <= 8) {
//                     while(item.length !== 8) {
//                         item += '0'
//                     }
//                     console.log(item)
//                 } else if (item.length > 8) {
//                     while(item.length / 8 >= 1) {
//                     	console.log(item.substring(0, 8))
//                     	item = item.substring(8)

//                     }
//                     if(item.length > 0) {  
//                     	while(item.length !== 8) {
//                     		item += '0'
//                     	}
//                     	console.log(item)
//                     }
//                 }
//             }
//         })
//     }
// })

// 进制转换
// const readline = require('readline')
// const r1 = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

// r1.on('line', function (input) {
//     input = input.trim()
    
//     console.log(parseInt(input, 16))
// })

// 质数因子
// const readline = require('readline')
// const r1 = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

// r1.on('line', function (input) {
//     var res = []
//     input = input.trim()
    
//     for(var i = 2; i < input; i++ ) {
//         while(input % i === 0) {
//             res.push(i)
//             input /= i
//         }
//     }
    
//     if(input > 2) {
//         res.push(input)
//     }
    
//     console.log(res.join(' '))
// })

// 合并表记录
// const readline = require('readline')
// const r1 = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })
// var flag = -1
// var arr = []
// var len = 0

// r1.on('line', function (input) {
//     if(flag === -1) {
//         len = input
//         arr = []
//         flag = 1
//     } else {
//         if(arr[input.split(' ')[0]] == null) {
//             arr[input.split(' ')[0]] = +input.split(' ')[1]
//         } else {
//             arr[input.split(' ')[0]] += +input.split(' ')[1]
//         }
//         len--
//     }
    
//     if(len === 0) {
//     	arr = Object.keys(arr)
//     	.sort(function (a, b) {
// 	        return a - b
// 	    })
// 	    .map(function (value) {
// 	    	return value + ' ' + arr[value]
// 	    })
// 	    .join('\n')

// 	    console.log(arr)
//     }

// })

//购物单
// const readline = require('readline')
// const r1 = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })
// var flag = -1
// var price = 0
// var len = 0
// var pri, val, deg, res

// r1.on('line', function (input) {
//     input = input.split(' ')
    
//     if(flag === -1) {
//         flag = 1
//         price = +input[0]
//         len = +input[1]
//         pri = []
//         val = []
//         deg = []
//         res = []
//     } else {
//         pri.push(+input[0])
//         val.push(+input[1] * +input[0])
//         deg.push(+input[2])
//         len--
//     }
    
//     if(len === 0) {
//         for(var k = 0; k <= pri.length; k++) {
//             res[k] = new Array(price)
//         }
//         for(var k = 0; k <= price; k++) {
//             res[0][k] = 0
//         }

//         for(var i = 1; i <= pri.length; i++) {
//             for(var j = 1; j <= price; j++) {
//                 if(deg[i - 1] === 0) {
//                     // 主件
//                     if(pri[i - 1] <= j) {

//                         res[i][j] = Math.max(res[i - 1][j], (res[i - 1][j - pri[i - 1]] + val[i - 1]))
//                     } else {
//                         res[i][j] = res[i - 1][j]
//                     }
//                 } else {
//                     // 从件,从属的主件价格为 pri[deg[i - 1]]
//                     if(pri[i - 1] + pri[deg[i - 1]] <= j) {
//                         res[i][j] = Math.max(res[i - 1][j], res[i - 1][j - pri[i - 1] - pri[deg[i - 1]]] + val[i - 1] + val[deg[i - 1]])
//                     } else {
//                         res[i][j] = res[i - 1][j]
//                     }
//                 }
//             }
//         }
        
//         console.log(res[pri.length][price])
//     }
// })

// 坐标移动
// const readline = require('readline')
// const r1 = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })
// var arr = []
// var x = 0
// var y = 0

// r1.on('line', function (input) {
//     arr = input.trim().split(';')
//     var reg = /^[ASWD]\d{1,2}$/
    
//     for(var i = 0; i < arr.length; i++) {
//         if(reg.test(arr[i])) {
//             switch(arr[i].substring(0,1)) {
//                 case 'A':
//                     x -= +arr[i].substring(1)
//                     break
//                 case 'D':
//                 	x += +arr[i].substring(1)
//                     break
//                 case 'S':
//                     y -= +arr[i].substring(1)
//                     break
//                 case 'W':
//                     y += +arr[i].substring(1)
//                     break
//             }
//         }
//     }
    
//     console.log(x + ',' + y)
//     x = 0
//     y = 0
// })

// ip and mask
// const readline = require('readline')
// const r1 = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })
// var res = [0,0,0,0,0,0,0]
// var ip = ''
// var mask = ''

// r1.on('line', function (input) {
//     count(input)

// }).on('close', function () {
//     console.log(res.join(' '))
//     res = [0,0,0,0,0,0,0]
// })

// function count (input) {
//     input = input.trim().split('~')
//     ip = input[0]
//     mask = input[1]
    
//     isMask(mask) && isIp(ip)
// }

// function isIp (ip) {
//     ip = ip.split('.')
//     for(var i = 0; i < 4; i++) {
//         if(!(ip[i] >= 0 && ip[i] <= 255) || ip[i] == '') {
//             res[5]++
//             return false
//         }
//     }
//    	if(ip[0] == 10 || (ip[0] == 172 && ip[1] >=16 && ip[1] <= 31) || (ip[0] == 192 && ip[1] == 168)) {
//    		tag = 6
//         res[6]++
//     }
    
//     if(ip[0] >= 1 && ip[0] <= 126) {
//     	tag = 0
//         res[0]++
//         return true
//     } else if(ip[0] >= 128 && ip[0] <= 191) {
//     	tag = 1
//         res[1]++
//         return true
//     } else if(ip[0] >= 192 && ip[0] <= 223) {
//     	tag = 2
//         res[2]++
//         return true
//     } else if(ip[0] >= 224 && ip[0] <= 239) {
//     	tag = 3
//         res[3]++
//         return true
//     } else if(ip[0] >= 240 && ip[0] <= 255) {
//     	tag = 4
//         res[4]++
//         return true
//     }
// }

// function isMask (mask) {
//     mask = mask.split('.')

//     for(var i = 0; i < 4; i++) {
// 	    if(!(mask[i] >= 0 && mask[i] <= 255) || mask[i] == '') {
// 	        res[5]++
// 	        return false
// 	    }   	
//     }

    
//     var ma = mask.map(function (val) {
//         var tem = (+val).toString(2)
//         if(tem.length === 8) {
//             return tem
//         } else {
//             while(tem.length < 8) {
//                 tem = '0' + tem
//             }
            
//             return tem
//         }
//     }).join('')
//     var reg = /^(1)+(0)+$/
//     if(!reg.test(ma)) {
//         res[5]++
//         return false
//     }

//     return true
// }

//简单错误记录
// const readline = require('readline')
// const r1 = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })
// var res = []
// r1.on('line', function (input) {
//     var reg = /(\w+)\.(\w+)$/
//     var tem = input.split(' ')
//     var file = tem[0].match(reg)[0]
//     var col = tem[1]
    
//     if(res.length === 0) {
//         res.push(file + ' ' + col + ' ' + 0)
//     } else {
//         for(var i = 0; i < res.length; i++) {
//             if(input.match(res[i])) {
//                 res[i] = file + ' ' + col + ' ' + (+(res[i].split(' ')[2]) + 1)
//             } else {
//                 res.push(file + ' ' + col + ' ' + 0)
//             }
//         }
//     }
// })

// r1.on('close', function () {
//     res.forEach(function (val) {
//         console.log(val)
//     })
// })

// const readline = require('readline')
// const r1 = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

// r1.on('line', function (input) {
//     input = input.split(' ')

//     if(!(/^(\d)*$/.test(input[0]) && /^(\d)*$/.test(input[1]))) {
//         console.log(-1)
//         return
//     }

//     var a = input[0].split('')
//     var b = input[1].split('')
//     var res = []
//     var len1 = a.length - 1
//     var len2 = b.length - 1
//     var count = 0

//     while(len1 >= 0 && len2 >=0) {
//         if(a[len1] === b[len2]) {
//             count++
//         } else {
//             res.push(count)
//             count = 0
//         }

//         len1--
//         len2--
//     }
//     res.push(count)
    
//     count = res.reduce(function (a, b) {
//         if(a > b) {
//             return a
//         } else {
//             return b
//         }
//     })

//     console.log(count)
// })

const readline = require('readline')
const r1 = require({
    input: process.input,
    output: process.output
})

var num = 0
var avg, max, res
var data = []
var flag = false

r1.on('line', function (input) {
    if(!flag) {
        flag = !flag
        input = input.split(' ')
        num = +input[0]
        max = +input[1]
        avg = +input[2] * num
    }

    if(num){
        input = input.split(' ')
        scor.push(input[0])
        cost.push(input[1])
        num--
    } else {
        compute(scor, cost)
    }
})

function compute (s, c) {
    var count = s.reduce(function (a, b) {
        return a + b
    })
    console.log(count)

    var diff = avg - count


}