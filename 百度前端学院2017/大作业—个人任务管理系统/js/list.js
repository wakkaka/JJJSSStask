var utility = require('./helper.js');
var Store = require('./store.js');
var List = {}
List.id = "";

//新建一个localstorage
Store.store("newtodos");
console.log(localStorage[window._dbName]);

//新建分类，在当前选中的目录下新建分类
List.addNewTypeList = function(){
	var add_class_name = prompt('请输入新建分类的名称');
	//获取当前所点击的类级
	var now_click = utility.qs('.list_item_select');

	//获取localstorage中的class
	var data = JSON.parse(localStorage[window._dbName]);
	var storageClass = data.class;

	if(now_click.className.indexOf('allClass')>=0){
		//新建一个一级类
		if(add_class_name != null){
			var add_to_location = utility.$child(utility.$parent(utility.qs('.list_item_select'),'ul'),'ul');
			//console.log(add_to_location);
			var new_class_list = document.createElement('li');
			new_class_list.innerHTML = "<i class='type_file_icon'></i><span  class='"+ add_class_name + " 1stClass" +"'>"+ add_class_name +"</span><i class='delete_icon'></i>";
			add_to_location.appendChild(new_class_list);
			new_class_list = document.createElement('ul');
			new_class_list.className = 'type_item';
			utility.qs('.type_list_all').appendChild(new_class_list);

			console.log(storageClass.length);
			storageClass[storageClass.length] = add_class_name;
			console.log(storageClass.length);
			localStorage[window._dbName] = JSON.stringify(data);
		}	
	} else{
		//新建一个二级类
		if(add_class_name != null){
			var add_to_location = utility.$parent(utility.qs('.list_item_select'),'li').nextSibling;
			console.log(add_to_location);
			var new_class_list = document.createElement('li');
			new_class_list.innerHTML = "<i class='type_item_icon'></i><span  class='"+ add_class_name + " 2ndClass" +"'>"+ add_class_name +"</span><i class='delete_icon'></i>";
			add_to_location.appendChild(new_class_list);

			var this_class = now_click.innerHTML;
			for(var i=0,len=storageClass.length;i<len;i++){
				if(storageClass[i] == this_class){
					//该一级分类下没有二级分类
					if(typeof(storageClass[i]) == 'string'){
						storageClass[i] = [];
						storageClass[i][0] = add_class_name;
						localStorage[window._dbName] = JSON.stringify(data);
					}else{
						//该一级分类下已有二级分类
						storageClass[i][storageClass[i].length] = add_class_name;
						localStorage[window._dbName] = JSON.stringify(data);
					}
				}
			}
		}
	}
}

//是否显示 新建分类 和 新建任务
List.showAddIcon = function(){
	var now_click = utility.qs('.list_item_select'); 
	//console.log(now_click);
	utility.qs('.add_list').style = "display:none";
	utility.qs('.add_item').style = "display:none";
	//console.log(now_click.className.indexOf('allClass')/* || now_click.className.indexOf('1stClass')*/);
	if((now_click.className.indexOf('allClass'))>=0 || (now_click.className.indexOf('1stClass'))>=0){
		utility.qs('.add_list').style = "display:inline";
	}

	if((now_click.className.indexOf('1stClass'))>=0 || (now_click.className.indexOf('2ndClass'))>=0 || (now_click.className.indexOf('allItem'))>=0){
		utility.qs('.add_item').style = "display:inline";
	}
}

//新建任务后右侧栏的显示,在当前目录下新建任务
List.addNewTodo = function(){
	List.id = "";
	//console.log(List.id);
	var right_header = utility.qs(".right_header");
	var right_date = utility.qs(".right_date");
	var right_content = utility.qs(".right_content");

	utility.qs(".todo_title").value = "";
	utility.qs(".todo_date").value = "";
	utility.qs(".todo_textarea").value = "";

	utility.qs(".todo_title_div").style = "display:inline";
	utility.qs(".todo_title_display",right_header).style = "display:none";
	utility.qs(".todo_save").style = "display:inline";
	utility.qs(".todo_date_div").style = "display:inline";

	utility.qs(".todo_date").value = utility.date();

	utility.qs(".todo_date_display",right_date).style = "display:none";
	utility.qs(".todo_textarea").style = "display:inline";
	utility.qs("div",right_content).style = "display:none";
}


//编辑事件，显示2个input和textarea，并将编辑后的内容写回页面
List.editItem = function(){
	//全局id,用于识别该任务是否已经存在
	List.id = utility.qs('.todo_title_span').id;
	//console.log(id);
	var right_header = utility.$parent(event.target,'div');
	var right = utility.$parent(right_header,'div');
	var right_date = utility.qs('.right_date',right);
	var right_content = utility.qs('.right_content',right);
	//console.log(utility.qs('span',right_header).innerHTML.split("").slice(5).join(""));
	//任务标题
	if(utility.qs('.todo_title_span',right_header).innerHTML != ""){
		utility.qs('input',right_header).value = utility.qs('.todo_title_span',right_header).innerHTML;
	};
	//任务时间
	if(utility.qs('.todo_date_span',right_date).innerHTML != ""){
		utility.qs('input',right_date).value = utility.qs('.todo_date_span',right_date).innerHTML;
	};
	//任务内容
	if(utility.qs('div',right_content).innerHTML != ""){
		utility.qs('textarea',right_content).value = utility.qs('div',right_content).innerHTML;
	};
	utility.qs('.todo_title_display',right_header).style="display: none";
	//console.log(utility.qs('.todo_title_div',right_header));
	utility.qs('.todo_title_div',right_header).style="display:inline";
	utility.qs('.todo_save',right_header).style="display:inline";
	utility.qs('.todo_date_display',right_date).style="display:none";
	utility.qs('.todo_date_div',right_date).style="display:inline";
	utility.qs('div',right_content).style="display:none";
	utility.qs('textarea',right_content).style="display:inline";
	utility.qs('input',right_header).focus();
	}

//保存右侧任务编辑区域的修改
List.saveTodo = function(){
	console.log(List.id);
	var updateData = {};
	var right_header = utility.$parent(event.target,'div');
	var right = utility.$parent(right_header,'div');
	var right_date = utility.qs('.right_date',right);
	var right_content = utility.qs('.right_content',right);
	//console.log(utility.qs('span',right_header).innerHTML.split("").splice(0,4).join(""));

	//如果当前任务不是新任务，则更新修改
	if(List.id){
		//任务标题
		if(utility.qs('input',right_header).value != ""){
			utility.qs('.todo_title_span',right_header).innerHTML = utility.qs('input',right_header).value;
			//utility.qs('input',right_header).value = "";
			updateData.title = utility.qs('input',right_header).value;
		} else{
			updateData.title = utility.qs('.todo_title_span',right_header).innerHTML;
		};
		utility.qs(".todo_save").style = "display:none";
		utility.qs('.todo_title_div',right_header).style="display:none";
		utility.qs('.todo_title_display',right_header).style="display:inline";
		

		//任务时间
		if(utility.qs('input',right_date).value != ""){
			utility.qs('.todo_date_span',right_date).innerHTML =  utility.qs('input',right_date).value;
			//utility.qs('input',right_header).value = "";
			updateData.date = utility.qs('input',right_date).value;
		} else{
			updateData.date = utility.qs('.todo_date_span',right_date).innerHTML;
		};
		utility.qs('.todo_date_display',right_date).style="display:inline";
		utility.qs('.todo_date_div',right_date).style="display:none";
		

		//任务内容
		utility.qs('div',right_content).innerHTML = utility.qs('textarea',right_content).value;
		//console.log(utility.qs('textarea',right_content).value);
		utility.qs('div',right_content).style="display:inline";
	    utility.qs('textarea',right_content).style="display:none";
	    updateData.content = utility.qs('textarea',right_content).value;

	    //console.log(updateData);
	    utility.qs('.todo_done_icon').style = "display:inline";
	    utility.qs('.todo_edit_icon').style = "display:inline";
	    Store.save(updateData,function(){},List.id);
	    List.listDisplay();
	} else{//新任务，创建新任务
		//任务标题
		updateData.title = utility.qs('input',right_header).value;

		//任务时间
		updateData.date = utility.qs('input',right_date).value;

		//任务内容
		updateData.content = utility.qs('textarea',right_content).value;

		//将新创建的任务写回至右侧页面，并显示
		utility.qs('.todo_title_span',right_header).innerHTML = utility.qs('input',right_header).value;
		utility.qs('.todo_date_span',right_date).innerHTML =  utility.qs('input',right_date).value;
		utility.qs('div',right_content).innerHTML = utility.qs('textarea',right_content).value;
		utility.qs(".todo_save").style = "display:none";
		utility.qs('.todo_title_div',right_header).style="display:none";
		utility.qs('.todo_title_display',right_header).style="display:inline";
		utility.qs('.todo_date_display',right_date).style="display:inline";
		utility.qs('.todo_date_div',right_date).style="display:none";
		utility.qs('div',right_content).style="display:inline";
	    utility.qs('textarea',right_content).style="display:none";
	    utility.qs('.todo_done_icon').style = "display:inline";
	    utility.qs('.todo_edit_icon').style = "display:inline";

	   	//任务完成选项
	    updateData.complete = 'false';

	    //任务所属分类
	    var now_click = utility.qs('.list_item_select');
	    if(now_click.className.indexOf('1stClass')>=0){
	    	//只有一级分类
	    	updateData.class_1 = now_click.innerHTML;
	    } else if(now_click.className.indexOf('allItem')>=0){
	    	//默认分类
	    	updateData.class_1 = 'defaultClass';
	    } else{
	    	//有两级分类
	    	updateData.class_2 = now_click.innerHTML;
	    	var previousBro = utility.$parent(now_click,'ul').previousSibling;
	    	updateData.class_1 = utility.qs('span',previousBro).innerHTML;
	    }
		Store.save(updateData);
		List.listDisplay();
	}
	
}

//右侧任务内容的显示
List.showListItem = function(){
	var targetId = event.target.id;
	var targetLi = utility.$parent(event.target,'li');
	var thisTitleList = utility.qsa('.this_title');
	var todos = JSON.parse(localStorage[window._dbName]).todos;
	var temp_list = {};
	for(var i=0,len=todos.length;i<len;i++){
		if(todos[i].id == targetId){
			temp_list.title = todos[i].title;
			temp_list.date = todos[i].date;
			temp_list.content = todos[i].content;
		}
	}
	//console.log(temp_list);
	//console.log(targetId);
	//console.log(thisTitleList);
	utility.qs('.todo_title_span').innerHTML = temp_list.title;
	utility.qs('.todo_date_span').innerHTML = temp_list.date;
	utility.qs('.todo_content_div').innerHTML = temp_list.content;
	utility.qs('.todo_title_span').id = targetId;
	for(var i=0,len=thisTitleList.length;i<len;i++){
		thisTitleList[i].className = 'this_title';
		//console.log(thisTitleList[i].className);
	}
	targetLi.className += " _titleSelect";
	utility.qs('.todo_done_icon').style = "display:inline";
	utility.qs('.todo_edit_icon').style = "display:inline";

}

//删除给定id的任务项目
List.deleteListItem = function(){
	var targetId = utility.qs('span',utility.$parent(event.target,'li')).id;
	//console.log(targetId);
	Store.remove(targetId);
	List.listDisplay();
}


//给所有元素绑定click事件
List.listAddClickEvent = function(){
	//疑问：为什么下面这两个变量不能放在函数外面（放在外面的话是[],null）
	var thisList = utility.qs('.type_list');	
	//console.log(thisList);
	
	//给分类绑定事件
	utility.$delegate(thisList,'span','click',function(){
		//thisListSpan一定要放在绑定里面，以保证每次绑定的时候加入新加入的类
		var thisListSpan = utility.qsa('span',utility.qs('.type_list'));
		//选中事件
		for(var i=0,len=thisListSpan.length;i<len;i++){
			thisListSpan[i].className = thisListSpan[i].className.replace("list_item_select","");
			//console.log('clear!');
		}
		this.className += ' list_item_select';
		List.showAddIcon();
	})

	//给删除绑定绑定事件
	utility.$delegate(thisList,'.delete_icon','click',function(){
		if(confirm("删除操作不可逆，是否要删除该项？")){
			var delete_class = utility.$parent(event.target,'li');
			utility.$parent(event.target,'ul').removeChild(delete_class);
		}
	});

	//给编辑项中的任务日期加入提示文字，显示当前时间
		var this_date = utility.date();
		utility.qs('.todo_date').placeholder = this_date;

	//给右侧的编辑按钮绑定事件
	var edit_icon = utility.qs('.todo_edit_icon');
	utility.$on(edit_icon,'click',List.editItem);

	//给右侧的保存按钮绑定事件
	var save_icon = utility.qs(".todo_save");
	utility.$on(save_icon,"click",List.saveTodo);

	//给新建分类绑定事件
	utility.$on(utility.qs('.add_list'),'click',List.addNewTypeList);
	
	//给新建任务绑定事件
	utility.$on(utility.qs('.add_item'),'click',List.addNewTodo);

	//给中间栏任务title绑定显示事件
	var title_List = utility.qs('.mid_main_list');
	utility.$delegate(title_List,'span','click',List.showListItem);

	//给中间栏的删除图标绑定删除事件
	var delete_icon = utility.qs('.delete_icon_2');
	utility.$delegate(title_List,'.delete_icon_2','click',List.deleteListItem);
}

//中间栏显示任务title
List.listDisplay = function(){
	utility.qs('.mid_main_list').innerHTML = "";
	var date = JSON.parse(localStorage[window._dbName]);
	var todos = date.todos;
	var this_list = [];
	//console.log(todos);
	
	/*//字典排序测试
	test = [{date:"2017-3-12"},{date:"2017-3-12"},{date:"2017-3-15"},{date:"2017-3-5"}];
	console.log(new Date(test[0].date.replace(/-/g,'/')));
	for(var i=0,len=test.length;i<len;i++){
		test[i].sortDate = new Date(test[i].date.replace(/-/g,'/'));
	}
	console.log(test[0].date);
	test.sort(function(a,b){
		return a.sortDate - b.sortDate;
	});
	//日期值对比
	console.log(test[1].sortDate.getTime() === test[2].sortDate.getTime());
	console.log(test);*/

	//按日期对todos进行排序
	//给todos添加用于排序的sortDate属性
	//console.log(new Date(todos[0].date.replace(/-/g,'/')));
	for(var i=0,len=todos.length;i<len;i++){
		todos[i].sortDate = new Date(todos[i].date.replace(/-/g,'/'));
	}
	todos.sort(function(a,b){
		return a.sortDate - b.sortDate;
	});
	console.log(todos);

	var thisSortDate;

	for(var i=0,len=todos.length;i<len;i++){
		var listDateTempate = '<li class="thisDate">"{{date}}"</li>';
		var listTitleTempate =  '<li class="this_title">'
						  +			'<span id=""{{id}}"">"{{title}}"</span>'
						  +			'<i class="delete_icon_2"></i>'
						  +     '</li>';
		if(thisSortDate != todos[i].sortDate.getTime()){	
			//加入新的时间分类标签
			utility.qs(".mid_main_list").innerHTML += listDateTempate.replace('"{{date}}"',todos[i].date);
			//加入内容
			var temTitle = listTitleTempate.replace('"{{title}}"',todos[i].title);
			temTitle = temTitle.replace('"{{id}}"',todos[i].id);
			utility.qs(".mid_main_list").innerHTML += temTitle;

			thisSortDate = todos[i].sortDate.getTime();
		} else{
			var temTitle = listTitleTempate.replace('"{{title}}"',todos[i].title);
			temTitle = temTitle.replace('"{{id}}"',todos[i].id);
			utility.qs(".mid_main_list").innerHTML += temTitle;
		}
		
	}
	//console.log(this_list);
}










//滑过分类的删除的事件（这样写有bug，移入出现删除图标后，再在删除图标上移动会触发移出事件，导致反复触发移入移出事件）
/*List.listHoverToDelete = function(){
	//绑定鼠标移入事件
	console.log(thisList);
	//console.log(utility.qsa('li',thisList));
	utility.$delegate(thisList,'span','mouseover',function(){
		//新建delete图标标签
		var new_delete = document.createElement('i');
		new_delete.className = 'delete_icon';
		//console.log(event.target);
		//添加delete图标标签
		utility.$parent(event.target,'li').insertBefore(new_delete, event.target.nextSibling);
		console.log('insert');
	});
	//绑定鼠标移出事件
	utility.$delegate(thisList,'span','mouseout',function(){
		var to_delete = utility.qs('.delete_icon',utility.$parent(event.target,'li'));
		utility.$parent(to_delete,'li').removeChild(to_delete);
		console.log('delete');
	});
}*/
module.exports = List