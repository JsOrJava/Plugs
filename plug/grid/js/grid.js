/**
 * datagrid(数据表格)封装 
 * lwh
 */
/*this.grid = new com.taijue.lwh.grid({
	width: '700',
	height: '250',
	url: '/read/lspolygon/module/showController/readLineGrid',
	searchBar: [
		{label: '名称:',id:'search_name',labelWidth:35,xtype: 'text',width:160},
		{text: '查询',xtype: 'button',style:'margin-left:10px;',
			iconCls: 'icon-search',
			onClick: this.search.bind(this)
		}
	],
	columns:[[
        {field:'name',title:'名称',width:100},
        {field:'voltage',title:'电压等级',width:100},
        {field:'dept_name',title:'维护部门',width:100,align:'right'},
        {field:'substation_rid',title:'所属变电站',width:100,align:'right'},
	]]
});
this.panel.appendChild(this.grid.panel); 
//搜索
search: function(){
	var val = document.getElementById('search_name').value;
	this.grid.load({name: val});
}
* */
com.taijue.lwh.grid = function(obj){
	for(var property in obj){
		this[property] = obj[property];
	}
	this.initComponent();
}
com.taijue.lwh.grid.prototype = {
	panel: null,		//面板
	width: 'auto',		//面板宽度
	height: 'auto',		//高度
	fit: false,			//面板大小将自适应父容器 设置的width、height将失效
	border: false,		//边框
	url: '', 			//数据请求地址 'tree_data1.json?a='+Math.random() 
    method: 'get',		//数据请求方式 默认'get'
    queryParams: {},	//请求的额外参数 {name: 'dhkf'}
	search_panel: null,	//搜索栏
    columns: null,		//DataGrid列配置对象
    singleSelect: true,	//如果为true，则只允许选择一行
    checkbox: false,	//如果为true，则显示复选框。该复选框列固定宽度
    pagination: true,	//如果为true，则在DataGrid控件底部显示分页工具栏
    rownumbers: true,	//如果为true，则显示一个行号列
    isSelectRow: true,  //是否默认选中一行
    pageSize: 5,		//设置分页属性的时候初始化页面数据量 30条数据
    pageList : [ 5, 10, 30, 40, 50, 100 ], //和pageSize组合使用
    loadMsg: '正在加载数据，请稍后...',
    displayMsg: '当前显示 {from} - {to} 条记录 共 {total} 条记录',
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
		//判断是否要添加复选框
		if(this.checkbox){
			this.columns[0].unshift({field:'ck',checkbox: this.checkbox});
		}
		//生成grid
		$(this.panel).datagrid({
		    url: this.url,
		    method: this.method,
		    queryParams: this.queryParams,
		    singleSelect: this.singleSelect,
		    rownumbers: this.rownumbers,
		   	toolbar: this.search_panel,
		   	pageList : this.pageList,
		    pageSize: this.pageSize,
		   	pagination: this.pagination,
		   	loadMsg: this.loadMsg,
		    columns: this.columns,
		    displayMsg: this.displayMsg,
		    loadFilter: this.loadFilter.bind(this),
		    onLoadSuccess : this.onLoadSuccess.bind(this)
		});
		$(this.panel).datagrid("fitColumns");
		this.setPagination($(this.panel).datagrid('getPager'));
	},
	/******** 监听事件 ********/
	//返回过滤数据显示
	loadFilter: function(data){
		var list = data.data;
		return {"total":data.total,"rows":list};
	},
	//在数据加载成功的时候触发
	onLoadSuccess : function(data){
		if(this.isSelectRow) $(this.panel).datagrid('selectRow',0);
	},
	/***** 对外接口 ******/
	//刷新,将保持在当前页
	reload: function(){
		$(this.panel).datagrid('reload');
	},
	//加载和显示第一页的所有行,传入查询参数将取代'queryParams'属性
	load: function(params){
		if(!(!!params)) return;
		$(this.panel).datagrid('load',params);
	},
	/****** 创建面板对象 *******/
	createContent: function(){
		//<table id="dg" class="easyui-datagrid" style="width:700px;height:250px"></table>
		var panel = document.createElement('table');
		panel.setAttribute('id','dg');
		panel.classList.add('easyui-datagrid');
		panel.setAttribute("style","width:"+this.width+"px;height:"+this.height+"px;");
		
		//搜索栏
		this.search_panel = document.createElement('table');
		this.search_panel.setAttribute('style','padding:2px 5px;width:100%;');
		this.search_panel.classList.add('datagrid-toolbar');
		
		this.panel = panel;
	},
	//文本、时间控件等，搜索、重置按钮
	createSearchBar: function(element, index, list){
		var me = this;
		if(element.xtype=='text'||element.xtype=='password'){
			var p = document.createElement('input');
			p.setAttribute('id',element.id);
			p.setAttribute('type',element.xtype);
			p.setAttribute('style',element.style);
			this.search_panel.appendChild(p);
			
			$(p).textbox(element);
		}
		if(element.xtype=='button'){
			var s_btn = document.createElement('a');
			s_btn.setAttribute('id','btn');
			s_btn.setAttribute('href','javascript:void(0)');
			s_btn.setAttribute('style',element.style);
			this.search_panel.appendChild(s_btn);
			
			$(s_btn).linkbutton(element);
		}
	},
	//设置底部分页工具栏
	setPagination: function(pager){
		var me = this;
		pager.pagination({
			showPageList: false, //隐藏导航列表
			beforePageText: '第',
	        //页数文本框前显示的汉字
	        afterPageText: '页 共 {pages} 页',
	        displayMsg: me.displayMsg
		});
	}
}











