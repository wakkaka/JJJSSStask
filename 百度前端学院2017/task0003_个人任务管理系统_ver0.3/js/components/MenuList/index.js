import Folder from '../Folder/index.js'
import $ from 'jquery'
import pubsub from '../../utlis/pubsub'



class MenuList {
	constructor(opt) 
	{
		this.$container = $(opt.container)
		this.$addFileBtn = $(opt.addFileBtn)
		this.$exportBtn = $(opt.exportBtn) || null
		this.$currentTarget = $('[data-folderId="-1"]')[0]
		this.guid =0

		this.folders = []

		this.bindEvents()
	}

	bindEvents()
	{
		this.delegateEvents()
	}

	delegateEvents()
	{
		// 单击显示所有 file
		this.$container.on('click', '[actionType="folder.clk"]', (e) => {
			this.$currentTarget = $(e.currentTarget)

			let folderId = this.$currentTarget.data('folderid')
			let folderLevel = this.$currentTarget.data('folderlevel')
			let folderInstance = this.getFolderById(folderId)

			$('.left').find('.list_item_select').removeClass('list_item_select')
			this.$currentTarget.find('span').addClass('list_item_select')

			if(folderInstance) {
				this.renderSubMenu( folderInstance )
			}
		})

		// addFileBtn 按钮的 添加file 事件
		this.$addFileBtn.on('click', (e) => {
			let folderId = this.$currentTarget.data('folderid')
			let folderLevel = this.$currentTarget.data('folderlevel')
			let folderInstance = this.getFolderById(folderId)

			if(folderInstance) {
				//New File
				let fileId = folderInstance.addFile().getLatestFile().fileId

				pubsub.publish('updateCurrentFile',{folderId: folderId, fileId: fileId})
				this.renderSubMenu( folderInstance )
			}
		})

		// 删除 file 
		$('.mid_main_list').on('click', '.delete_icon_2', (e) => {
			 e.stopPropagation()//阻止冒泡很关键。要不然就会触发两个事件，一个是本事件，一个是单击file的事件

			let $currentFile = $(e.currentTarget).parent('li')
			let folderId = $currentFile.data('folderid')
			let fileId = $currentFile.data('fileid')
			let folderInstance = this.getFolderById( folderId )

			if(folderInstance) {
				folderInstance.deleteFile( fileId )
				pubsub.publish('updateCurrentFile',{folderId: folderId, fileId: fileId})
				this.renderSubMenu( folderInstance )
			}

			
		})


	}


	renderSubMenu( folderInstance )
	{
		let files = folderInstance.getFilesHtml()

		$('.mid_main_list').html( files )

	}

	addNewFolder() 
	{
		let text = prompt('请输入新建文件夹的标题')
		let folder = null
		let level = 'level-1'

		//判断此时新建的文件夹是一级还是二级
		//
		//
		//

		if(text) {
			folder = new Folder({
				folderId: 'folder-' + this.guid++,
				container: this.$container,
				title: text,
				folderlevel: level
			})
		} else {
			alert('新建文件夹的标题不能为空')
		}

		this.folders.push( folder )
	}

	getData() {
		let data = []
		for(let i=0;i<this.folders.length;i++) {
			if(this.folders[i]) {
				data.push( this.folders[i].getData() )
			}
		}

		return data
	}

	loadData()
	{
		console.log('load in data')
	}

	getFolderById(folderId)
	{
		for(let i=0;i<this.folders.length;i++) {
			if(this.folders[i].folderId === folderId) {
				return this.folders[i]
			}
		}
	}

	getCurrentEditFile(folderId, fileId) 
	{
		let currentFolder = this.getFolderById(folderId)
		let currentFile = currentFolder && currentFolder.getFileById(fileId)

		return currentFile
	}

	updateCurrentFile(folderId, fileId, data) 
	{
		let currentFolder = this.getFolderById(folderId)
		let currentFile = this.getCurrentEditFile(folderId, fileId)

		if(currentFile) {
			currentFile.setContent(data)
			pubsub.publish('editCurrentFile', {folderId, fileId})
		}

		this.renderSubMenu( currentFolder )
	}
}

export default MenuList