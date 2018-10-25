//时间格式化函数
Date.prototype.Formate = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"H+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};


var idTmr;

function exportExcel(tableid) {
	if(getExplorer() == 'ie') {
		var curTbl = document.getElementById(tableid);
		var oXL = new ActiveXObject("Excel.Application");
		var oWB = oXL.Workbooks.Add();
		var xlsheet = oWB.Worksheets(1);
		var sel = document.body.createTextRange();
		sel.moveToElementText(curTbl);
		sel.select();
		sel.execCommand("Copy");
		xlsheet.Paste();
		oXL.Visible = true;

		try {
			var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
		} catch(e) {
			print("Nested catch caught " + e);
		} finally {
			oWB.SaveAs(fname);
			oWB.Close(savechanges = false);
			oXL.Quit();
			oXL = null;
			idTmr = window.setInterval("Cleanup();", 1);
		}

	} else {
		tableToExcel(tableid)
	}
}

function getExplorer() {
	var explorer = window.navigator.userAgent;
	//ie  
	if(explorer.indexOf("MSIE") >= 0) {
		return 'ie';
	}
	//firefox  
	else if(explorer.indexOf("Firefox") >= 0) {
		return 'Firefox';
	}
	//Chrome  
	else if(explorer.indexOf("Chrome") >= 0) {
		return 'Chrome';
	}
	//Opera  
	else if(explorer.indexOf("Opera") >= 0) {
		return 'Opera';
	}
	//Safari  
	else if(explorer.indexOf("Safari") >= 0) {
		return 'Safari';
	}
}

function Cleanup() {
	window.clearInterval(idTmr);
	CollectGarbage();
}
var tableToExcel = (function() {
	var uri = 'data:application/vnd.ms-excel;base64,',
		template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',
		base64 = function(s) {
			return window.btoa(unescape(encodeURIComponent(s)))
		},
		format = function(s, c) {
			return s.replace(/{(\w+)}/g,
				function(m, p) {
					return c[p];
				})
		}
	return function(table, name) {
		if(!table.nodeType) {
			table = document.getElementById("userInfos")
		}
		var ctx = {
			worksheet: name || 'Worksheet',
			table: table.innerHTML
		}

		document.getElementById("dlink").href = uri + base64(format(template, ctx));
		document.getElementById("dlink").download = '签到信息表.xls';
		document.getElementById("dlink").click();
	}
})()