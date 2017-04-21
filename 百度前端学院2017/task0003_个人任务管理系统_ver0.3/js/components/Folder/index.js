/**
 * 文件夹
 */

import $ from 'jquery'
import './style.css'
import folderTpl from './index.html'
import File from '../File'

let guid = 0

class Folder {
	constructor(opt) 
	{
		this.$container = $(opt.container)
		this.folderId = opt.folderId
		this.folderLevel = opt.folderLevel || 'level-1'
		this.title = opt.title || '' // 标题
		this.subItems = [] // 存 File

		if(!this.folderId) 
		{
			throw new Error('请提供 Folder 唯一标识 id')
		}

		this.initFolder()

	}


	initFolder()
	{
		let html = folderTpl({
			folderId: this.folderId,
			folderLevel: this.folderLevel,
			title: this.title
		})

		this.$element = $(html)

		this.$container.append( this.$element )

	}

	hasSubItems()
	{
		return this.subItems.length
	}

	// 新建一个File
	addFile(title)
	{
		let subItem = new File({
			folderId: this.folderId,
			fileId: 'file-' + new Date().getTime(),
			title: title || '无标题' // 默认值
		})


		this.subItems.push( subItem )
		return this
	}

	// 删除一个File
	deleteFile(fileId)
	{
		for(let i=0;i<this.subItems.length;i++) {
			if(this.subItems[i].fileId == fileId) {
				this.subItems.splice(i,1)
			}
		}
		return this
	}

	// 取得该分类下的所有Files
	getData()
	{
		let data = {
			title: this.title,
			subItems: [] // 存放该分类下的Files
		}

		for(let i = 0; i<this.subItems.length;i++) {
			this.subItems[i] && data.subItems.push( this.subItems[i].getData() )
		}

		return data
	}

	getFilesHtml()
	{
		let str = ''
		let len = this.subItems.length

		//subItems中的 file 按时间 从大到小 排序
		for(let i=0;i<len;i++) {
			this.subItems[i].sortDate_tpl = new Date(this.subItems[i].integralDate.replace(/-/g,'/'))
			this.subItems[i].sortDate = new Date(this.subItems[i].simpleDate.replace(/-/g,'/'))
		}
		this.subItems.sort( (a,b)  => {
			return b.sortDate_tpl - a.sortDate_tpl;
		})

		//找出不重复的时间标题，对 subItems 分类 并加入时间分类
		let thisSortDate;

		for(let i=0,len=this.subItems.length;i<len;i++) {

			let dateTag = '<li class="thisDate">"{{date}}"</li>'
			let fileTpl = this.subItems[i].genHtml()

			if(thisSortDate != this.subItems[i].sortDate.getTime()) {

				//加入新的时间分类标签
				str += dateTag.replace('"{{date}}"',this.subItems[i].simpleDate)

				//加入内容
				str += fileTpl

				thisSortDate = this.subItems[i].sortDate.getTime();

			} else {
				//加入内容
				str += fileTpl
			}
			
		}

		return str
	}


	getFileById(fileId)
	{
		for(let i=0;i<this.subItems.length;i++){

			if( this.subItems[i].fileId === fileId ){ 
				return this.subItems[i] 
			}
		}
	}

	//获得 subItems 末尾的file
	getLatestFile()
	{
		return this.subItems[ this.subItems.length - 1 ]
	}

}

export default Folder
