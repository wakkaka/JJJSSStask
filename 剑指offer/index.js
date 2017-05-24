// import Find from './3.二维数组中的查找/find.js'
// import Replace from './4.替换空格/replace.js'
// import Rotate from './8.旋转数组的最小数字/rotate.js'
// import Fibo from './9.斐波那契/fibonacci.js'
// import Reorder from './14.调整数组顺序奇前偶后/reOrder.js'
// import Print1ToMax from './12.打印1到最大的n位数/print.js'
// import Reverse from './16.反转链表/reverse.js'
// import Clockwise from './20.顺时针打印矩阵/clockwise.js'
import Pop from './22.栈的压入弹出序列/pop.js'
import Suq from './24.二叉搜索树的后序遍历序列/suq.js'
import Find from './25.二叉树中和为某一值的路径/findSum.js'
import Clone from './26.复杂链表的复制/clone.js'
import Convert from './27.二叉搜索树与双向链表/convert.js'

function TreeNode(x)
{
	this.val = x
	this.left = null
	this.right = null
}

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
// function ListNode(x){
//     this.val = x;
//     this.next = null;
// }
// var ListHead = new ListNode(1)
// ListHead.next = new ListNode(2)
// ListHead.next.next = new ListNode(3)
// console.log(Reverse(ListHead))

//20.
// var arr = [[1],[2],[3],[4],[5]]
// console.log(Clockwise(arr))

//21.
// console.log(Pop([1,2,3,4,5], [4,3,5,1,2]))

//24.
// console.log(Suq([7,4,6,5]))

//25.
// var root = new TreeNode(10)
// root.left = new TreeNode(5)
// root.left.left = new TreeNode(4)
// root.left.right = new TreeNode(7)
// root.right = new TreeNode(12)

// var a = [1,2,3]
// var b =[]
// b.push(a)
// console.log(a,b)
// console.log(Find(root, 19))

//26.
// function RandomListNode(x){
//     this.label = x
//     this.next = null
//     this.random = null
// }

// var list = new RandomListNode(1)
// list.next = new RandomListNode(2)
// list.random = new RandomListNode(3)
// list.next.next = list.random
// list.next.random = list

// console.log(Clone(list))

//27.
var head = new TreeNode(10)
var a = new TreeNode(6)
var b = new TreeNode(4)
var c = new TreeNode(8)
var d = new TreeNode(14)
var e = new TreeNode(12)
var f = new TreeNode(16)
head.left = a
head.right = d
a.left = b
a.right = c
d.left = e
d.right = f
console.log(Convert(head))