var express = require('express'); //调用模板
var app = express(); //不污染本来，用变量来表示
var bodyParser = require('body-parser'); //调用模板
var fs = require('fs');
var readline = require('readline');
var nameFormat = require('./dist/js/nameFormat.js');
/*var db = require('./dist/js/db.js');*/
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
	existAndReadFile(userInfo, "", address, "add", res)
})
//删除数据
app.post('/deleteUserInfo', urlencodedParser, function(req, res) { //post处理方法
	var data = JSON.parse(req.body.data);
	var address = data.address;
	var index = data.index;
	existAndReadFile("", index, address, "delete", res)
})
//修改数据
app.post('/updateUserInfo', urlencodedParser, function(req, res) { //post处理方法
	var data = JSON.parse(req.body.data);
	var address = data.address;
	var index = data.index;
	existAndReadFile(data.userInfo, index, address, "update", res)
})
//查询数据
app.post('/queryUserInfo', urlencodedParser, function(req, res) {
	var address = req.body.data;
	existAndReadFile("", "", address, "query", res)
})

function existAndReadFile(userInfo, index, address, type, res) {
	var userInfos = [];
	fs.exists(__dirname + '/dist/data/' + address + '.json', function(exists) {
		//文件存在的情况下
		if(exists) {
			fs.readFile(__dirname + '/dist/data/' + address + '.json', {
				flag: 'r+',
				encoding: 'utf8'
			}, function(err, data) {
				if(err) {
					console.log('读取数据出现错误!')
				} else {
					if(data) { //存在数据的情况下
						data = JSON.parse(data);
						for(var i = 0; i < data.length; i++) {
							switch(type) {
								case "add":
									if(userInfo.userName === data[i].userName) {
										return res.send("存在相同的用户名");//返回的数据，这里根据情况写

									} else if(userInfo.telephone === data[i].telephone) {
										return res.send("存在相同的电话号码"); //返回的数据，这里根据情况写

									} else {
										userInfos.push(data[i]);
										//db.insert(userInfo); //数据库方法，加入了两个参数，是提交的数据
									}
									break;
								case "delete":
									//根据index来删除数据
									if(i !== index) {
										userInfos.push(data[i]);
									}
									break;
								case "query":
									userInfos.push(data[i]);
									break;
								case "update":
									//更新数据
									if(i !== index) {
										//不能出现同名数据
										if(data[i].userName === userInfo.userName) {
											return res.send("存在相同的用户名")
										} else {
											userInfos.push(data[i]);
										}
									} else {
										//如果是要更新的那条数据时，直接将从前端传过来的数据，替换数据库里的数据
										userInfos.push(userInfo);
									}
									break;
							}
						}
						//在循环结束之后
						//如果是查询的话，将数据直接返回到前端，否者将数据写入到本地
						switch(type) {
							case "query":
								//直接将数据返回给前端
								return res.send(userInfos);
								break;
							case "delete":
							case "update":
								//更新和删除操作，在前面循环过程中就已经对userInfo进行了处理，所以此处传null
								writeFile(userInfos, null, address, res);								
								break;
							case "add":
								writeFile(userInfos, userInfo, address, res);
								break;
						}
						//不存在数据的情况下，直接将数据写入到本地
					} else {
						writeFile(userInfos, userInfo, address, res)
					}
				}
			})
		} else { //文件不存在的情况下
			switch(type) {
				case "add":
				//将数据写入到本地
					writeFile(userInfos, userInfo, address, res);
					break;
				case "delete":
				case "update":
				case "query":
				//文件不存在的情况下，删除和查询及更新操作都无效
					return res.send(false);
					break;
			}
		}
	});
}

function writeFile(userInfos, userInfo, address, res) {
	if(userInfo) {
		userInfos.push(userInfo);
	}
	fs.writeFile(__dirname + '/dist/data/' + address + '.json', JSON.stringify(userInfos), function(err) {
		if(err) {
			console.log('写入文件出现错误!')
			return res.send(false);
		}
		console.log('已输出至data/*.json中');
		return res.send(true);
	});
}