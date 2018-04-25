/**
 * combobox封装 下拉组件
 * lwh
 */
com.taijue.lwh.combobox = function(obj){  
	for(var property in obj){
		this[property] = obj[property];
	}
	this.initComponent();
}
com.taijue.lwh.combobox.prototype = { //原型一般这样写,相当于属性, 匿名形式也行
	time: 0,			//监听次数
	panel: null,		//面板
	width: 'auto',		//组件宽度
	height: 22,			//高度
	//panelWidth: 100,	//下拉面板的宽度 默认取用组件宽度
	panelHeight:100,	//下拉面板的高度
	editable: false,	//用户是否可以直接在该字段内输入文字
	value: '',			//默认值
	label: '',			//文本框标签
	labelWidth: 'auto', //标签宽度
	labelAlign: 'left', //标签对齐方式
	url: '',			//数据请求地址 combobox.json [{"id":1,"text":"Java","desc":""},{"selected":true,"id":2,"text":"C#","desc":""}]
	method: 'get',		//数据请求方式 默认'get'
	queryParams: {},	//向服务器端发送额外的参数 {"age" : 25,name:'zz'}
	valueField: 'rid',	//基础数据值名称绑定到该下拉列表框
	textField: 'name',	//基础数据字段名称绑定到该下拉列表框
	hasEmptyRow: false, //是否增加空行
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
		this.loadFilter = this.loadFilter;
		$(this.panel).combobox(this);
		return true;
	},
	//返回过滤后的数据并显示
	loadFilter: function(data){
		//返回过滤后的数据并显示
		var result = data.data;
		result.unshift({rid: '0',name: '　'});
		return result;
	},
	//获取显示的文本值
	getValue: function(){
		return $(this.panel).combobox('getValue');
	},
	//获取组件的值
	getText: function(){
		return $(this.panel).combobox('getText');
	},
	//重置组件中的值
	doReset: function(){
		$(this.panel).combobox('reset');
	},
	/** 创建combobox对象 **/
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
