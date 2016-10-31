function Tab(config){
	this.init(config);
}

Tab.prototype = {

	constructor: Tab,

	init: function (config) {
		this.tabBox = config.tabBox;
		this.tabTitles = utils.$('tap_title').getElementsByTagName('li');
		this.tabContents = utils.$('content').getElementsByTagName('div');
		this.tabLoading = document.getElementById('layout');
		this.trigger = config.trigger || 'mouseover';
		// this.speedTime = config.speedTime || 1000;
		// this.autoFlag = config.autoFlag;
		this.menuHasClass = config.menuHasClass;
		this.handle = config.handle;
		this.timer = null;
		this.currentItem = 0; 

		// if(this.autoFlag){
		// 	this.autoPlay();
		// }

		this.bind();
	},

	showItem: function(index){
		this.currentItem = index;	
		for(var i=0; i<this.tabContents.length;i++){
			this.tabContents[i].style.display = 'none';		
			this.tabLoading.style.display = 'none';
		}	
		
		this.tabContents[index].style.display = 'block';
	},

	showLoading: function(index){
		this.currentItem = index;
		for(var i=0;i<this.tabContents.length;i++){
			this.tabTitles[i].className = '';
		}
		this.tabTitles[index].className = this.menuHasClass;
		this.tabLoading.style.display = 'block';

		},

	bind: function(){
		var that = this,
			len = this.tabTitles.length;
		for(var i=0; i<len;i++){
			var tabTitle = this.tabTitles[i];
			tabTitle.index = i;

			utils.addEvent(tabTitle, this.trigger, utils.bind(tabTitle, function(){
				that.currentItem = this.index;
				that.showLoading(that.currentItem);
				clearTimeout(that.timer);
				that.timer=setTimeout(function(){
					that.showItem(that.currentItem);
				},1000);

				//???这是干什么的
				if(that.handle){
					that.handle();
				}
			}))
		}
	}

}