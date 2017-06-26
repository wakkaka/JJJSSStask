// import Find from './3.二维数组中的查找/find.js'
// import Replace from './4.替换空格/replace.js'
// import Rotate from './8.旋转数组的最小数字/rotate.js'
// import Fibo from './9.斐波那契/fibonacci.js'
// import Reorder from './14.调整数组顺序奇前偶后/reOrder.js'
// import Print1ToMax from './12.打印1到最大的n位数/print.js'
// import Reverse from './16.反转链表/reverse.js'
// import Clockwise from './20.顺时针打印矩阵/clockwise.js'
// import Pop from './22.栈的压入弹出序列/pop.js'
// import Suq from './24.二叉搜索树的后序遍历序列/suq.js'
// import Find from './25.二叉树中和为某一值的路径/findSum.js'
// import Clone from './26.复杂链表的复制/clone.js'
// import Convert from './27.二叉搜索树与双向链表/convert.js'
// import Permutation from './28.字符串的排列/permutate.js'
// import FindMore from './29.数组中出现次数超过一半的数字/findMore.js'
// import Small from './30.最小的k个数/small.js'
// import Number1 from './32.从1到n整数中1出现的次数/number.js'
// import FindFirst from './35.第一个只出现一次的字符/findFirst.js'
// import Count from './36.数组中的逆序对/count.js'
// import Times from './38.数字在排序数组中出现的次数/times.js'
// import Balance from './39.平衡二叉树/balance.js'
// import ToSum from './41.和为S的连续正数序列/sumOf.js'
// import ToSum2 from './41.和为S的两个数字/tosum2.js'
// import Reverse from './42.左旋转字符串/leftReverse.js'
// import Reverse from './42.翻转单词顺序/reverse.js'
// import Con from './44.扑克牌顺子/continuous.js'
import Numeric from './54.表示数值的字符串/numeric.js'
import Del from './57.删除链表中重复的节点/delete.js'
import Print from './60.把二叉树打印成多行/print.js'
import Norm from './62.序列化二叉树/normalize.js'
import Kth from './63.二叉搜索树的第k个结点/kth.js'
import Heap from './64.数据流中的中位数/heap.js'

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
function ListNode(x){
    this.val = x;
    this.next = null;
}
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
// var head = new TreeNode(10)
// var a = new TreeNode(6)
// var b = new TreeNode(4)
// var c = new TreeNode(8)
// var d = new TreeNode(14)
// var e = new TreeNode(12)
// var f = new TreeNode(16)
// head.left = a
// head.right = d
// a.left = b
// a.right = c
// d.left = e
// d.right = f
// console.log(Convert(head))

//28.
// var a = 'aa'
// // console.log(a)
// console.log(Permutation(a))

// //29.
// var a = [1,2,3,2,2,2,5,4,2]
// console.log(FindMore(a))
// console.log(a)

// function swap(input,a,b) 
// {
// 	var tem = input[a]
// 	input[a]=input[b]
// 	input[b]=tem
// }
//30.
// var a = [4,5,1,6,2,7,3,8]
// console.log(Small(a,8))
// 
// var a = [1,2,3]
// console.log(a.slice(1).join('') * 1 + 0)//字符串转数字

//32.
// var a = 5
// console.log(Number1(a))

// var a = 5,
// 	b = 6
// //数字转字符串
// console.log(a+''+b)

//35.
// console.log(FindFirst('google'))

//36.
// console.log(Count([7,5,6,4]))

//38.
// console.log(Times( [1,2,3,3,3,3],3 ))

//39.
// var head = new TreeNode(1)
// var a = new TreeNode(2)
// var b = new TreeNode(3)
// var c = new TreeNode(4)
// var d = new TreeNode(5)
// var e = new TreeNode(6)
// var f = new TreeNode(7)
// head.left = a
// head.right = b
// a.left = c
// a.right = d
// d.left = f
// b.right = e
// console.log(Balance(head))

//41.
// console.log(ToSum(9))
// console.log(ToSum2([1,2,3,4,5,6],10))

//42.
// console.log(Reverse('abcdefg' ,2))
// console.log(Reverse('Ii am a student.'))

//44.
// console.log(Con([1,3,2,6,4]))

//54.
// console.log(Numeric("123.45e+6"))

//57.
//链表
// var head = new ListNode(1)
// var n1 = new ListNode(2)
// var n2 = new ListNode(3)
// var n3 = new ListNode(3)
// var n4 = new ListNode(4)
// var n5 = new ListNode(4)
// var n6 = new ListNode(5)

// head.next = n1
// n1.next = n2
// n2.next = n3
// n3.next = n4
// n4.next = n5
// n5.next = n6

// console.log(Del(head))

//60.
//树
// var head = new TreeNode(8)
// var a = new TreeNode(6)
// var b = new TreeNode(10)
// var d = new TreeNode(7)
// var e = new TreeNode(9)
// var f = new TreeNode(11)
// head.left = a
// head.right = b
// a.right = d
// b.left = e
// b.right = f

// console.log(Print(head))

//62.
// var s = Norm.Serialize(head)
// console.log(s)
// console.log(Norm.Deserialize(s))

//63.
// var head = new TreeNode(5)
// var a = new TreeNode(3)
// var b = new TreeNode(7)
// var c = new TreeNode(2)
// var d = new TreeNode(4)
// var e = new TreeNode(6)
// var f = new TreeNode(8)
// head.left = a
// head.right = b
// a.left = c
// a.right = d
// b.left = e
// b.right = f
// console.log(Kth(head,3))

//64.
//测试最大堆最小堆 --> ok
// var maxHeap = new Heap.maxHeap(),
// 	minHeap = new Heap.minHeap()

// minHeap.insert(6)
// minHeap.insert(5)
// minHeap.insert(2)
// minHeap.insert(9)
// console.log(minHeap.top())
// console.log(minHeap.showData())

// maxHeap.insert(6)
// maxHeap.insert(5)
// maxHeap.insert(2)
// maxHeap.insert(9)
// console.log(maxHeap.top())
// console.log(maxHeap.showData())

//中位数
Heap.init()
var arr = [1,7,6,3,4,8]
for(var i=0; i<arr.length; i++)
{
	Heap.Insert(arr[i])
}

console.log(Heap.getMid())
