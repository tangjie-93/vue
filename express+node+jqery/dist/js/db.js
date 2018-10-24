const mysql = require("../../node_modules/mysql");
var connection = mysql.createConnection({ //配置参数，然后添加你的数据库里面的表
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'attendance'
})

connection.connect(); //连接
module.exports = {
	insert(userInfo) {
		//插入數據
		var addSql = 'INSERT INTO userInfo(userName,major,school,telephone,onlineApply,time,address) VALUES(?,?,?,?,?,?,?)';

		var addSqlParams = [userInfo.userName, userInfo.major, userInfo.school, userInfo.telephone, userInfo.onlineApply, userInfo.time, userInfo.address];
		connection.query(addSql, addSqlParams, function(err, res) {
			if(err) {
				console.log("[insert error]-", err.message);
				return;
			}
			console.log("\n\n----------插入數據-----------------------\n");
			console.log(res);
			console.log("\n----------插入數據ENDENDNEDNED-----------");

		})
	},
	query(){
		
	}
	
}