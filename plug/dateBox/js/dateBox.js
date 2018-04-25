/**
 * combogrid封装 
 * lwh
 */
com.taijue.lwh.dateBox = function(obj){
	for(var property in obj){
		this[property] = obj[property];
	}
	this.initComponent();
}
com.taijue.lwh.dateBox.prototype = {
	width: 100,
	required: false,	//是否需要验证
	missingMessage: "必填项",
	editable: false,	//是否允许可编辑
	initComponent: function(){
		//初始化组件
		this.createContent();
		window.webkitRequestAnimationFrame((this.draw).bind(this));
	},
	draw: function(){
		var me = this;
		$(input).datebox(Object.assign({},this,{
	        formatter: this.formatter,
	        parser: this.parser
	    }));
	},
	formatter: function(){
		var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return y + "-" + (m < 10 ? ("0" + m) : m) + "-" + (d < 10 ? ("0" + d) : d);
	},
	parser: function(){
		if (!s) return new Date();
        var yStr = s.substr(0,4);
        var mStr = s.substr(5,2);
        var dStr = s.substr(8,2);
		 
        var y = parseInt(yStr,10);
        var m = parseInt(mStr,10);
        var d = parseInt(dStr,10);
        if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
            return new Date(y,m-1,d);
        } else {
            return new Date();
        }
	},
	createContent: function(){
		var input = document.createElement('input');
		input.setAttribute('type','text');
		input.setAttribute("style","width:"+this.width+"px;height:"+this.height+"px;");
		
		this.panel = input;
	}
};


























