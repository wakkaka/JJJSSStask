import '../css/style.css'

import $ from 'jquery'
import pubsub from './utlis/pubsub'
import MenuList from './components/MenuList/index'
import SubMenu from './components/SubMenu/index'
import Content from './components/Content/index'
import Folder from './components/Folder/index'
import File from './components/File/index'
import Store from './utlis/store'


//新建localstorage
Store.store('menulist')

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
	completeBtn: '.completeBtn',
	saveBtn: '.todo_save'
})

//导入已有数据
if(JSON.parse(localStorage[window._dbName]) != '' && JSON.parse(localStorage[window._dbName]) != null) 
{
	let data = JSON.parse(localStorage[window._dbName])
	let folders = []
	let lastFolderId = ''

	for(let i=0;i<data.length;i++) 
	{
		let folder = new Folder({
			container: '.type_list_all',
			folderId: data[i].folderId,
			folderLevel: data[i].folderLevel,
			title: data[i].title
		})

		if(data[i].subItems.length !== 0)
		{
			let subItems = []
			for(let j=0;j<data[i].subItems.length;j++)
			{	
				let file = new File({
					folderId: data[i].subItems[j].folderId,
					fileId: data[i].subItems[j].fileId,
					title: data[i].subItems[j].title,
					createdDate: data[i].subItems[j].createdDate,
					content: data[i].subItems[j].content,
					simpleDate: data[i].subItems[j].simpleDate,
					integralDate: data[i].subItems[j].integralDate,
					complete: data[i].subItems[j].complete
				})

				subItems.push(file)
			}
			folder.subItems = subItems
		}	
		folders.push(folder)
	}
	menuList.folders = folders
	lastFolderId = data[data.length - 1].folderId
	menuList.guid = parseInt(lastFolderId.substring( lastFolderId.indexOf('-') + 1 )) + 1
}

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
	let folderId = (currentFolderAndFile != null) ? currentFolderAndFile.folderId : data.folderId
	let fileId = (currentFolderAndFile != null) ? currentFolderAndFile.fileId : data.fileId

	menuList.updateCurrentFile( folderId, fileId, data )
	Store.update(menuList.folders)
}

//添加新文件夹
$('.add_list').on('click', (e) => {
	e.stopPropagation()

	menuList.addNewFolder()
	Store.update(menuList.folders)
})

//删除文件夹
$('.type_list_all').on('click', '.delete_icon', (e) => {
	e.stopPropagation()
	let $currentTarget = $(e.currentTarget).parent('li')
	let folderId = $currentTarget.data('folderid')

	if(confirm("确定要删除该文件夹？")) {
		menuList.deleteFolder( folderId )
		Store.update(menuList.folders)
		
	}
	
})

// 点击 所有任务
$('[actionType="allfile.clk"]').on('click', (e) => {
	let data = menuList.getFilesHtml()
	let $currentTarget = $(e.currentTarget)

	e.stopPropagation()

	$('.left').find('.list_item_select').removeClass('list_item_select')
	$currentTarget.find('span').addClass('list_item_select')
	$('.mid_main_list').html( data )
})

