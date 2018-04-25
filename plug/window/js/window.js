/**
 * window封装 
 * lwh
 */
com.taijue.lwh.window = function(obj) {
	for(var property in obj){
		this[property] = obj[property];
	}
	this.initComponent();
}
com.taijue.lwh.window.prototype = {
	panel: null,		//面板
	width: 300,			//面板宽度
	height: 200,		//高度
	title: '窗口',		//标题
	modal: false,		//将窗体显示为模式化窗口
    collapsible: false,	//显示可折叠按钮
    minimizable: false,	//显示最小化按钮
    maximizable: false,	//显示最大化按钮
    resizable: false,	//是否能够改变窗口大小
    closed: true,		//关闭窗口
    btnAlign: 'right',	//底部工具栏按钮位置 'left' 'right' 'center'
    btns: [],			//底部按钮组
	initComponent: function(){
		//初始化组件
		console.info('初始化组件',this.btns);
		this.createContent();
		this.createFooter();
		window.webkitRequestAnimationFrame((this.draw).bind(this));
	},
	draw: function(){
		var me = this;
		//footer按钮栏
		//默认添加关闭按钮
		for(index in this.btns){
			var btn = new com.taijue.lwh.button(this.btns[index]);
			this.btn_footer.appendChild(btn.panel);
		}
		//默认添加的关闭按钮
		var btn = new com.taijue.lwh.button({text:'关闭',width: 60,iconCls: 'icon-cancel',onClick: this.close.bind(this)});
		this.btn_footer.appendChild(btn.panel);
		if('detail' in this){
			var detail = new (this.detail)();
			this.add(detail);
		}
		this.footer = this.btn_footer;
		$(this.panel).window(this);
	},
	add: function(target){
		$(this.panel).append(target.panel);
	},
	open: function(){
		var me = this;
		setTimeout(function(){
			$(me.panel).window('open');
		},100);
	},
	close: function(){
		$(this.panel).window('close');
		$(this.btn_footer).remove();
		this.btns = [];
		this.btn_footer = null;
	},
	/****** 创建面板对象 *******/
	createContent: function(){
		var panel = document.createElement('div');
		document.body.appendChild(panel);
		
		this.panel = panel;
	},
	//底部工具栏
	createFooter: function(){
		this.btn_footer = document.createElement('div');
		this.btn_footer.style.padding = "3px";
		this.btn_footer.style.textAlign = this.btnAlign;	//按钮位置
		document.body.appendChild(this.btn_footer);
	}
}
