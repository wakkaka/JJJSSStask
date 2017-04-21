/**
 * 文件，包括标题，时间，内容
 */

import $ from 'jquery'
import './style.css'
import fileTpl from './index.html'

class File {
	constructor(opt) 
	{
		this.$container = $(opt.container)
		this.fileId = opt.fileId
		this.folderId = opt.folderId
		this.complete = opt.complete || 'false' // 任务完成标志
		this.title = opt.title || '' // 标题
		this.createdDate = opt.createdDate || this.getCurrentDate() //创建时间
		this.content = opt.content || '' // 内容
		this.outline = opt.outline || '' // 大纲

		if(!this.fileId){
			throw new Error('File 需要一个唯一标识 id')
		}
		if(!this.folderId){
			throw new Error('File 需要提供所属文件夹的唯一标识 id')
		}
	}

	genHtml() 
	{
		let html = fileTpl({
			fileId: this.fileId,
			folderId: this.folderId,
			complete: this.complete,
			title: this.title
		})

		this.$element = $(html)

		return html
	}

	getData()
	{
		return {
			fileId: this.fileId,
			folerId: this.folerId,
			title: this.title,
			date: this.createdDate,
			content: this.content
		}
	}

	setContent(data) 
	{
		this.title = data.title || this.title
		this.content = data.content || this.content
		this.createdDate = this.getCurrentDate()
	}

	getOutline()
	{
		if(this.content){

			return this.content.substring(0,20)
		}
	}

	getCurrentDate()
	{
		let date = new Date()
		let year = date.getFullYear()
		let month = date.getMonth() + 1
		let day = date.getDate()

		let hour = date.getHours()
		let minutes = date.getMinutes()
		let seconds = date.getSeconds()

		this.simpleDate = year + '-' + month + '-' + day
		this.integralDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds

		return year + '年 ' + month + '月 ' + 
		day + '日 ' + '  ' + hour + ':' +
		minutes + ':' + seconds ;
	}
}

export default File