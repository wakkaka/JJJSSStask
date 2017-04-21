/**
 * 展示当前 folder 里的内容
 */
import $ from 'jquery'
import pubsub from '../../utlis/pubsub'

class SubMenu {
	constructor(opt) 
	{

		this.$container = $(opt.container)
		this.files = []

		this.bindEvents()
	}

	bindEvents()
	{
		this.bindFileClk()
	}

	bindFileClk()
	{
		this.$container.on('click', '[actionType="file.clk"]', (e) => {
			this.$currentTarget = $(e.currentTarget)
			let folderId = this.$currentTarget.data('folderid')
			let fileId = this.$currentTarget.data('fileid')

			this.toggleClass()

			pubsub.publish('editCurrentFile', {folderId: folderId, fileId: fileId})
		})
	}

	toggleClass()
	{

		this.$container.find('._titleSelect').removeClass('_titleSelect')

		this.$currentTarget.addClass('_titleSelect')
	}


}

export default SubMenu