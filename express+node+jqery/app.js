var express = require('express'); //调用模板
var app = express(); //不污染本来，用变量来表示
var bodyParser = require('body-parser'); //调用模板
var fs = require('fs');
var readline = require('readline');
var nameFormat = require('./dist/js/nameFormat.js');
var db = require('./dist/js/db.js');
var userNames = [];
var telephones = [];
//文件是否存在,不存在才添加
var flag = false; //用于判断
//創建編碼解析
var urlencodedParser = bodyParser.urlencoded({
	extended: false
})
app.use(express.static('dist')); //设置静态文件目录

/*app.get('/index.html', function(req, res) {
	res.sendFile(__dirname + "/" + index.html); //提供静态文件
})
*/
var server = app.listen(8888, function() { //监听
	var host = server.address().address
	var port = server.address().port
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
//添加数据
app.post('/addUserInfo', urlencodedParser, function(req, res) { //post处理方法
	var userInfo = JSON.parse(req.body.data);
	var address = nameFormat(userInfo.address);
	existAndReadFile(userInfo, "", address, "add",res)
})
//删除数据
app.post('/deleteUserInfo', urlencodedParser, function(req, res) { //post处理方法
	var data = JSON.parse(req.body.data);
	var address = data.address;
	var index = data.index;
	existAndReadFile("", index, address, "delete",res)
})
//删除数据
app.post('/updateUserInfo', urlencodedParser, function(req, res) { //post处理方法
	var data = JSON.parse(req.body.data);
	var address = data.address;
	var index = data.index;
	existAndReadFile("", index, address, "update",res)	
})
//查询数据
app.post('/queryUserInfo', urlencodedParser, function(req, res) {
	var address = req.body.data;
	existAndReadFile("","", address, "query",res)	
})

function existAndReadFile(userInfo, index, address, type,res) {
	var userInfos=[];
	fs.exists(__dirname + '/dist/data/' + address + '.json', function(exists) {
		if(exists) {
			fs.readFile(__dirname + '/dist/data/' + address + '.json', {
				flag: 'r+',
				encoding: 'utf8'
			}, function(err, data) {
				if(err) {
					console.log('读取数据出现错误!')
				} else {
					if(data) { //存在数据
						data = JSON.parse(data);
						for(var i = 0; i < data.length; i++) {							
							if(type === "add") {
								if(userInfo.userName === data[i].userName) {
									return res.send("存在相同的用户名")

								} else if(userInfo.telephone === data[i].telephone) {
									return res.send("存在相同的电话号码"); //返回的数据，这里根据情况写

								} else {
									userInfos.push(data[i]);
									db.insert(userInfo); //数据库方法，加入了两个参数，是提交的数据
								}
							} else if(type === "delete") {
								if(i !== index) {
									userInfos.push(data[i]);
								}
							} else if(type === "query") {
								console.log(data[i]);
								userInfos.push();
							} else {
								//更新数据
								if(i !== index) {
									console.log(i,index);
									if(data[i].userName===userInfo.userName){
										return res.send("存在相同的用户名")
									}
									
								} else {
									userInfos.splice(index, 1, userInfo);
								}
							}

						}
						if(type==="query"){
							console.log(userInfos);
						  return res.send(userInfos);
						}
						else{
							writeFile(userInfos, userInfo, address,res);							
						}
						
					} else {
						writeFile(userInfos, userInfo, address,res)						
					}
				}
			})
		} else {
			switch(type){
				case "add":
					writeFile(userInfos, userInfo, address,res);
					return res.send(true);
					break;
				case "delete":
				case "update":
					writeFile(userInfos, null, address,res);
					return res.send(true);
					break;
				case "query":
					return res.send(false);
					break;					
			}			
		}
	});
}

function writeFile(userInfos, userInfo, address,res) {
	if(userInfo) {
		userInfos.push(userInfo);
	}
	fs.writeFile(__dirname + '/dist/data/' + address + '.json', JSON.stringify(userInfos), function(err) {
		if(err) {
			console.log('出现错误!')
		}
		console.log('已输出至data/*.txt中');
		return res.send(true);
	});
}