/**
 * combogrid封装 
 * lwh
 */
com.taijue.lwh.combogrid = function(obj){
	for(var property in obj){
		this[property] = obj[property];
	}
	this.initComponent();
}
com.taijue.lwh.combogrid.prototype = _.extend(Object.assign({},com.taijue.lwh.grid.prototype,{
	label: '',			//标签
	labelWidth: 60, 	//标签宽度
	readonly: false,	//是否将该控件设为只读
	panelWidth: 500,	//grid面板宽度
	panelHeight: 250,	//下拉面板高度
	value: '',			//控件默认值
	idField: 'rid',		//ID字段名称
	textField: 'name',  //显示在文本框中的文本字段
	initComponent: function(){
		//初始化组件
		this.createContent();
		window.webkitRequestAnimationFrame((this.draw).bind(this));
	},
	draw: function(){
		var me = this;
		//查询栏
		if('searchBar' in this){
			document.body.appendChild(this.search_panel);
			_.each(this.searchBar, function(element, index, list){
				me.createSearchBar(element, index, list);
			});
		}
		this.toolbar = this.search_panel;
		$(this.panel).combogrid(this);
		
		this.setPagination($(this.panel).combogrid('grid').datagrid('getPager'));
	},
	//获取datagrid对象
	getGrid: function(){
		return $(this.panel).combogrid('grid');
	},
	load: function(params){
		$(this.panel).combogrid('grid').datagrid('load',params);
	},
	//获取显示的文本值
	getValue: function(){
		return $(this.panel).combogrid('getValue');
	},
	//获取组件的值
	getText: function(){
		return $(this.panel).combogrid('getText');
	},
	//重置组件中的值
	doReset: function(){
		$(this.panel).combogrid('reset');
	},
	createContent: function(){
		var input = document.createElement('input');
		input.setAttribute("style","width:"+this.width+"px;height:"+this.height+"px;");
		//搜索栏
		this.search_panel = document.createElement('table');
		this.search_panel.setAttribute('style','padding:2px 5px;width:100%;');
		this.search_panel.classList.add('datagrid-toolbar');
		
		this.panel = input;
	}
}));












