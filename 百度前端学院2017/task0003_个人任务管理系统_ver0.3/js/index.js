import '../css/style.css'

import $ from 'jquery'
import pubsub from './utlis/pubsub'
import MenuList from './components/MenuList/index'
import SubMenu from './components/SubMenu/index'
import Content from './components/Content/index'

//存储当前操作的 folderId 和 fileId
let currentFolderAndFile = null

//init MenuList SubMenu Content
let menuList = new MenuList({
	container: '.type_list_all',
	addFileBtn: '.add_item'
})

let subMenu = new SubMenu({
	container: '.mid_main_list'
})

let content = new Content({
	container: '.right',
	title: '.todo_input',
	date: '.todo_date_span',
	content: '.todo_textarea',
	completeBtn: '.todo_done_icon',
	saveBtn: '.todo_save'
})

//编辑当前 file
pubsub.subscribe('editCurrentFile', (data) => {
	currentFolderAndFile = data

	editCurrentFile(data)
})

//更新当前 file
pubsub.subscribe('updateCurrentFile', (data) => {
	updateCurrentFile(data)
})

function editCurrentFile(data) 
{
	let currentFile = menuList.getCurrentEditFile(data.folderId, data.fileId)
	content.editCurrentFile( currentFile )
}

function updateCurrentFile(data)
{
	let folderId = currentFolderAndFile.folderId
	let fileId = currentFolderAndFile.fileId


	menuList.updateCurrentFile( folderId, fileId, data )
}

//添加新文件夹
$('.add_list').on('click', (e) => {
	e.stopPropagation()

	menuList.addNewFolder()
})

// 点击 所有任务
$('[actionType="allfile.clk"]').on('click', (e) => {
	let $currentTarget = $(e.currentTarget)
	let data = menuList.getData()
	e.stopPropagation()

	$('.left').find('.list_item_select').removeClass('list_item_select')
	$currentTarget.find('span').addClass('list_item_select')

	console.log(data)

})