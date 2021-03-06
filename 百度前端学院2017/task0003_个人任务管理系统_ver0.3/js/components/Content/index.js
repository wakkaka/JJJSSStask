/**
 * 内容编辑
 */

import $ from 'jquery'
import pubsub from '../../utlis/pubsub'

class Content {
	constructor(opt) 
	{
		this.$container = $(opt.container)
		this.$title = $(opt.title)
		this.$date = $(opt.date)
		this.$content = $(opt.content)
		this.$completeBtn = $(opt.completeBtn)
		this.$saveBtn = $(opt.saveBtn)
		this.completeFlag = this.$completeBtn.hasClass('done_icon')


		this.bindEvents()
	}

	bindEvents() 
	{
		
		this.$completeBtn.on('click', (e) => {
			//完成按钮事件
			let $completeBtn = this.$completeBtn
			let completeFlag = this.$completeBtn.hasClass('done_icon')

			console.log(completeFlag)

			pubsub.publish('updateCurrentFile',{complete: !completeFlag})

			this.toggleCompleteBtnClass( completeFlag )
			
		})

		this.$saveBtn.on('click', (e) => {
			//保存按钮事件
			let title = this.$title.val()
			let content = this.$content.val()
			let data = {
				title: title,
				content: content
			}

			pubsub.publish('updateCurrentFile', data)
		})
	}

	//单击 file 后在 content 中显示其内容
	editCurrentFile(file)
	{
		let title = file.title
		let content = file.content
		let date = file.createdDate
		let complete = file.complete

		this.$title.val( title )
		this.$content.val( content )
		this.$date.html( date )
		this.toggleCompleteBtnClass( !complete )
		
		this.showEditArea()
	}

	showEditArea()
	{
		//显示编辑区域
		$('.right_default').css('display','none')
		$('.right').css('display','block')
	
	}

	toggleCompleteBtnClass(flag)
	{
		if(flag){
			this.$completeBtn.removeClass('done_icon')
			this.$completeBtn.addClass('todo_icon')
		} else {
			this.$completeBtn.removeClass('todo_icon')
			this.$completeBtn.addClass('done_icon')
		}
	}

}

export default Content