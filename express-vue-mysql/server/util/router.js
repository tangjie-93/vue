const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据库连接池，防止数据库超过最大连接数
const query = require("./db");
/*
 * 增删改查服务路由
 * */
/*新增*/
router.use('/add', function(req, res) {
	let userInfo = JSON.parse(req.body.data);
	let querysql = "SELECT * FROM userinfo where userName='" + userInfo.userName + "'";
	new Promise(function(resolve, reject) {
		query(querysql, null, function(err, rows, fields) {
			if(err) {
				res.json({
					ok: false,
					message: '添加失败！查询',
					error: err
				})
			} else {
				if(rows.length > 0) {
					res.json({
						ok: false,
						message: '添加失败,该用户已经注册了',
						error: err
					})
				} else {
					let addSql = 'INSERT INTO userinfo(userName,major,school,telephone,onlineApply,time,address) VALUES(?,?,?,?,?,?,?)';

					let sqlParams = [
						userInfo.userName, userInfo.major, userInfo.school, userInfo.telephone, userInfo.onlineApply, userInfo.time, userInfo.address
					];
					console.log(userInfo);
					query(addSql, sqlParams, function(err, result) {
						console.log(result);
						console.log(err);
						if(err) {
							res.json({
								ok: false,
								message: '添加失败！'
							})
						} else {
							res.json({
								ok: true,
								id: result.insertId,
								message: '添加成功！'
							})
						}
						res.end();
					})
				}
			}

		})
	})

});
/*删除*/
router.use('/delete', function(req, res) {
	let userInfo = JSON.parse(req.body.data);
	let delSql = 'DELETE FROM userinfo where id=' + userInfo.id;
	query(delSql, null, function(err, rows, fields) {
		if(err) {
			res.json({
				ok: false,
				message: '删除失败！',
				error: err
			})
		} else {
			res.json({
				ok: true,
				message: '删除成功！'
			})
		}
		res.end();
	})
});
/*编辑*/
router.use('/edit', function(req, res) {
	let userInfo = JSON.parse(req.body.data);
	console.log(userInfo);
	let editSql = 'UPDATE userinfo SET userName=?,major=?,school=?,telephone=?,onlineApply=?,time=?WHERE id =' + userInfo.id;

	let editSqlParams = [
		userInfo.userName,
		userInfo.major,
		userInfo.school,
		userInfo.telephone,
		userInfo.onlineApply,
		userInfo.time
	];
	query(editSql, editSqlParams, function(err, result) {
		if(err) {
			res.json({
				ok: false,
				message: '修改失败！'
			})
		} else {
			res.json({
				ok: true,
				message: '修改成功！'
			})
		}
		res.end();
	})
	/*let querysql = "SELECT * FROM userinfo where userName='" + userInfo.userName + "'"+id!=;
	new Promise(function(resolve, reject) {
		//先判断数据库里是否存在同名
		query(querysql, null, function(err, rows, fields) {
			if(err) {
				res.json({
					ok: false,
					message: '修改失败',
					error: err
				})
			} else {
				if(rows.length > 0) {
					res.json({
						ok: false,
						message: '修改失败,该用户已经注册了',
						error: err
					})
				} else {
					let editSql = 'UPDATE userinfo SET userName=?,major=?,school=?,telephone=?,onlineApply=?,time=?WHERE id =' + userInfo.id;

					let editSqlParams = [
						userInfo.userName,
						userInfo.major,
						userInfo.school,
						userInfo.telephone,
						userInfo.onlineApply,
						userInfo.time
					];
					query(editSql, editSqlParams, function(err, result) {
						if(err) {
							res.json({
								ok: false,
								message: '修改失败！'
							})
						} else {
							res.json({
								ok: true,
								message: '修改成功！'
							})
						}
						res.end();
					})
				}
			}

		})
	})*/

});
/*查询*/
router.use('/query', function(req, res) {
	/*  let pageNumber = req.body.pageNumber;
	  let pageSize = req.body.pageSize;
	  let start = (pageNumber-1)*pageSize;
	  let end = pageNumber*pageSize;*/
	let start = 0;
	let end = 100;
	let address =req.body.data;
	let sql = "SELECT * FROM userinfo where address='"+address+"' ORDER BY Id DESC LIMIT " + start + "," + end;
	let countSql = "SELECT COUNT(id) FROM userinfo";
	const promise = new Promise(function(resolve, reject) {
		query(countSql, null, function(err, rows, fields) {
			resolve(rows);
		})
	}).then((count) => {
		query(sql, null, function(err, rows, fields) {
			if(err) {
				res.json({
					ok: false,
					message: '查询失败！',
					info: null
				})
			} else {
				res.json({
					ok: true,
					message: '查询成功！',
					info: rows,
					total: count[0]["COUNT(id)"]
				})
			}
			res.end();
		});
	})

});

/*将路由模块输出*/
module.exports = router;