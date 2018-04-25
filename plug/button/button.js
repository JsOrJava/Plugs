com.taijue.lwh.button = function(obj){
	for(var property in obj){
		this[property] = obj[property];
	}
	this.initComponent();
}
com.taijue.lwh.button.prototype = {
	panel: null,		//面板
	width: 'auto',		//面板宽度
	height: 'auto',		//高度
	text: '按钮',		//按钮文字 支持html
	disabled: false,	//为true时禁用按钮
	iconCls: '',		//图标的CSS类ID
	onClick: null,		//在点击按钮的时候触发
	initComponent: function(){
		//初始化组件
		this.createContent();
		window.webkitRequestAnimationFrame((this.draw).bind(this));
	},
	draw: function(){
		$(this.panel).linkbutton(this);
	},
	/****** 创建面板对象 *******/
	createContent: function(){
		var panel = document.createElement('a');
		panel.setAttribute('href','javascript:void(0)');
		panel.style.padding = "2px";
		panel.style.marginLeft = "2px";
		panel.classList.add('easyui-linkbutton');
		panel.innerHTML = this.text;
		
		this.panel = panel;
	}
}







































