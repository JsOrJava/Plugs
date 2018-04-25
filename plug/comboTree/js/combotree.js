/**
 * combobox封装 
 * lwh
 */
com.taijue.lwh.combotree = function(obj){
	for(var property in obj){
		this[property] = obj[property];
	}
	this.initComponent();
}
com.taijue.lwh.combotree.prototype = {
	time: 0,			//监听次数
	panel: null,		//面板
	width: 'auto',		//组件宽度
	label: '',			//文本框标签
	labelWidth: 'auto', //标签宽度
	labelAlign: 'left', //标签对齐方式
    url: '', 			//数据请求地址 'tree_data1.json?a='+Math.random() 
    method: 'get',		//数据请求方式 默认'get'
    required: false,
    rootId:	'0-1',		//根目录id
    rootText: '根目录',	//根目录text
    isAllOpen: false,	//是否全部展开树
	initComponent: function(){
		//初始化组件
		this.createContent();
		this.time = 0;
		this.listenDom();
	},
	listenDom: function(){
		var me = this;
		setTimeout(function(){
			me.time++;
		    if(me.time>10){
		    	console.info('元素未找到');
		    	me.time = 0;
		    	return;
		    }
		    var status = me.draw();
		    if(!status){
		    	setTimeout(arguments.callee,100);
		    }else{
		    	me.time = 0;
		    }
		},100);
	},
	draw: function(){
		if($(this.panel).length==0){
			return false;
		}
		var me = this;
		this.loadFilter = function(data){
			var list = data.data;
			for (var i=0;i<list.length;i++) {
				if(!me.isAllOpen){
					list[i].state = 'closed';
				}
			}
			var new_data = {};
	    	new_data.id = me.rootId;
	    	new_data.text = me.rootText;
	    	new_data.children = list;
	    	
	    	var result = [];
	    	result.push(new_data);
			return result;
		};
		$(this.panel).combotree(this);
		return true;
	},
	//获取显示的文本值
	getValue: function(){
		return $(this.panel).combotree('getValue');
	},
	//获取组件的值
	getText: function(){
		return $(this.panel).combotree('getText');
	},
	//重置组件中的值
	doReset: function(){
		$(this.panel).combotree('reset');
	},
	createContent: function(){
		var input1 = document.createElement('input');
		if('id' in this){
			input1.setAttribute('id',this.id);
		}
		if('name' in this){
			input1.setAttribute('name',this.name);
		}
		input1.setAttribute('style','display: none;');
		this.panel = input1;
	}
}





