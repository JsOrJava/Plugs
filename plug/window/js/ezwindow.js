com.taijue.lwh.ezwindow = function(obj) {
	for(var property in obj) {
		this[property] = obj[property];
	}
	this.initComponent();
}
com.taijue.lwh.ezwindow.prototype = {
	time: 0,
	id: 0,
	panel: null,
	width: 'auto', //面板宽度
	height: 'auto', //高度
	title: 'Window with a Footer',
	val: '测试测试',
	initComponent: function() {
		this.createContent();
		this.listenDom();
	},
	listenDom: function() {
		var me = this;
		setTimeout(function() {
			me.time++;
			if(me.time > 10) {
				console.info('元素未找到');
				me.time = 0;
				return;
			}
			var status = me.draw();
			if(!status) {
				setTimeout(arguments.callee, 100);
			} else {
				me.time = 0;
			}
		}, 100);
	},
	draw: function() {
		if($(this.panel).length==0){
			return false;
		}
		$(this.panel).window({
			width: this.width,
			height: this.height,
			collapsible: false,
			minimizable: false,
			maximizable: false,
			closable: true,
			//modal: true
		});
		return true;
	},
	createContent: function() {
		var panel = document.createElement('div');
		panel.classList.add('easyui-window','ezwindow-panel');
		panel.setAttribute("style","overflow:hidden;text-align: center;align:center");
		panel.setAttribute("data-options", "iconCls:'icon-save'");
		panel.setAttribute("title", this.title);
		/*var btn = document.createElement("div");
		btn.setAttribute("style","width: 60px;height: 30px;position: absolute;bottom: 5px;left:40%;text-align:center;background-color:#EAF2FF ;border-radius: 6px;line-height: 30px;cursor: pointer;");
		btn.innerHTML = "关闭";panel.appendChild(btn);
		btn.onclick = function(){
			$(panel).window("close");
		};*/
		var arr = new Array("名称","类型","等级","创建时间","维护部门");
		var table = document.createElement("table");
		table.setAttribute("style","font-family: verdana, arial, sans-serif;font-size: 11px;color: #333333;border-width: 1px;border-color: #666666;border-collapse: collapse;width: 100%;height: 100%;");
		for(i=0;i<arr.length;i++){
			var tr = document.createElement("tr");
			var th = document.createElement("th");
			th.setAttribute("style","border-width: 1px;padding: 8px;border-style: solid;border-color: #CCCCCC;background-color: #F7F7F7;")
			th.innerHTML = arr[i];
			var td = document.createElement("td");
			td.setAttribute("style","border-width: 1px;padding: 8px;border-style: solid;border-color: #CCCCCC;background-color: #ffffff;");
			td.innerHTML = this.val[i];
			tr.appendChild(th);
			tr.appendChild(td);
			table.appendChild(tr);
		}
		panel.appendChild(table);
		this.panel = panel;
	}
}