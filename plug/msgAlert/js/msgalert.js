/**
 * msgconfirm 弹出框组件
 * lbc
 */
com.taijue.lwh.msgalert = function(title,msg,fn,scope){
	var icon = 'info';
	if(!!fn){
		$.messager.alert(title,msg,icon,function(b){
			fn.call(scope,b);
		});
	}else{
		$.messager.alert(title,msg,icon);
	}
	
}





