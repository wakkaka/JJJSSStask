import Find from './3.二维数组中的查找/find.js'
import Replace from './4.替换空格/replace.js'
import Rotate from './8.旋转数组的最小数字/rotate.js'
import Fibo from './9.斐波那契/fibonacci.js'
import Reorder from './14.调整数组顺序奇前偶后/reOrder.js'
import Print1ToMax from './12.打印1到最大的n位数/print.js'
import Reverse from './16.反转链表/reverse.js'


//3.
/*var array = [[1,2,8,9],[2,4,9,12],[4,7,10,13],[6,8,11,15]]
console.log(Find(8,array))*/

//4.
// console.log(Replace('helloworld '))

//8.
// var arr = [3,4,5,1]
// console.log(Rotate(arr))

//9.
// console.log(Fibo(1))

//14.
// var arr = [1,2,3,4,5]
// console.log(Reorder(arr))

//15.
// Print1ToMax(2)

//16.
function ListNode(x){
    this.val = x;
    this.next = null;
}
var ListHead = new ListNode(1)
ListHead.next = new ListNode(2)
ListHead.next.next = new ListNode(3)
console.log(Reverse(ListHead))