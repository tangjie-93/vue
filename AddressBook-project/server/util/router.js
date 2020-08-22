const express = require('express')
// 定义路由级中间件
const router = express.Router()
// 引入数据库连接池，防止数据库超过最大连接数
const query = require('./db')
const md5 = require('md5-node')
const uuid = require('node-uuid')
router.use("*",function (req, res, next) {
     res.header('Access-Control-Allow-Origin', '*')
     res.send("测试");
//   res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
//   res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
//   res.header('Access-Control-Allow-Credentials', true)
//   res.header('X-Powered-By', ' 3.2.1')
     // eslint-disable-next-line eqeqeq
     next();
   })
router.use('/login', function (req, res) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5080') // * 这个表示任意域名都可以访问，这样写不能携带cookie了。 || 'http://localhost:5080'

  res.header('Access-Control-Allow-Credentials', true) // 允许服务器端发送Cookie数据,
  // 若前端上axios.defaults.withCredentials = true设置为true了，
  // 则Access-Control-Allow-Credentials必须为true,否则会请求失败，报错
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')// 它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS') // 设置方法
  let user = req.body
  let userName = user.userName
  let passWord = user.passWord
  // eslint-disable-next-line one-var
  let bool = false, msg = ''
  let querysql = "SELECT * FROM user where username='" + userName + "'"
  // eslint-disable-next-line no-new
  new Promise(function () {
    query(querysql, null, function (err, rows) {
      if (err) {
        bool = false
        msg = '登录失败，连接数据库失败'
      } else {
        if (rows.length === 0) {
          bool = false
          msg = '登录失败，用户名错误'
        } else {
          let flag = false
          for (let i = rows.length; i--;) {
            if (md5(passWord) === rows[i].password) {
              flag = true
              bool = true
              msg = '登录成功'
            }
          }
          if (!flag) {
            bool = false
            msg = '登录失败，密码错误'
          }
        }
      }
      res.json({
        ok: bool,
        message: msg,
        error: err
      })
      // res.end()
    })
  })
})
/*
 * 增删改查服务路由
 * */
/* 新增 */
router.use('/addUser', function (req, res) {
  let userInfo = req.body
  let userName = userInfo.userName
  let age = parseInt(userInfo.age)
  let major = userInfo.major
  let school = userInfo.school
  let address = userInfo.address
  let telephone = userInfo.telephone
  let querysql = "SELECT * FROM userinfo where userName='" + userName + "'"
  // eslint-disable-next-line no-new
  new Promise(function () {
    query(querysql, null, function (err, rows) {
      if (err) {
        res.json({
          ok: false,
          message: '添加失败！连接数据库失败',
          error: err
        })
      } else {
        if (rows.length > 0) {
          res.json({
            ok: false,
            message: '添加失败,已存在该用户',
            error: err
          })
        } else {
          let addSql = 'INSERT INTO userinfo(userId,userName,age,major,school,telephone,address) VALUES(?,?,?,?,?,?,?)'
          let userId = uuid.v1()
          let sqlParams = [
            userId, userName, age, major, school, telephone, address
          ]
          query(addSql, sqlParams, function (err, result) {
            console.log(result)
            console.log(err)
            if (err) {
              res.json({
                ok: false,
                message: '数据库添加失败'
              })
            } else {
              res.json({
                ok: true,
                id: result.insertId,
                data: result,
                message: '添加成功！'
              })
            }
          })
        }
      }
    })
  })
})
/* 删除 */
router.use('/deleteUser', function (req, res) {
  let userId = req.body.userId
  let delSql = "DELETE FROM userinfo where userId='" + userId + "'"
  query(delSql, null, function (err) {
    if (err) {
      res.json({
        ok: false,
        message: '删除失败！',
        error: err
      })
    } else {
      res.json({
        ok: true,
        message: '删除成功！',
        error: err
      })
    }
  })
})
/* 编辑 */
router.use('/editUser', function (req, res) {
  let userInfo = req.body
  let editSql = "UPDATE userinfo SET userName=?,age=?,major=?,school=?,telephone=?,address=? WHERE userId ='" + userInfo.userId + "'"

  let editSqlParams = [
    userInfo.userName,
    userInfo.age,
    userInfo.major,
    userInfo.school,
    userInfo.telephone,
    userInfo.address
  ]
  query(editSql, editSqlParams, function (err) {
    if (err) {
      res.json({
        ok: false,
        message: '修改失败！',
        error: err
      })
    } else {
      res.json({
        ok: true,
        message: '修改成功！',
        error: err
      })
    }
  })
})
/* 查询 */
router.use('/getUsers', function (req, res) {
  // let pageNumber = req.body.pageNumber;
  // let pageSize = req.body.pageSize;
  // let start = (pageNumber-1)*pageSize;
  // let end = pageNumber*pageSize;
  let start = 0
  let end = 100
  let data = req.body
  let userName = data['userName']
  // let userName = 'admin'
  let sql = ''
  if (userName) {
    sql = "SELECT * FROM userinfo where userName like '%" + userName + "%' ORDER BY Id DESC LIMIT " + start + ',' + end
  } else {
    sql = 'SELECT * FROM userinfo ORDER BY Id DESC LIMIT ' + start + ',' + end
  }
  query(sql, null, function (err, rows) {
    if (err) {
      res.end({
        ok: false,
        message: '从数据库获取数据失败',
        dataList: null
      })
    } else {
      res.json({
        ok: true,
        message: '成功获取数据',
        dataList: rows
      })
    }
  })
})
/* 将路由模块输出 */
module.exports = router
