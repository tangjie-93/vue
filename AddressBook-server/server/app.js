const express = require('express')
/* 用于全局解析post请求 */
const bodyParser = require('body-parser')
const cors = require('cors')
const server = express()
server.use(bodyParser.json()) // support json encoded bodies
server.use(bodyParser.urlencoded({ extended: true }))
server.use(cors())
server.use(express.static('dist')) // 设置静态文件目录

//server.all("*",function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.send("测试");
////   res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
////   res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
////   res.header('Access-Control-Allow-Credentials', true)
////   res.header('X-Powered-By', ' 3.2.1')
//   // eslint-disable-next-line eqeqeq
//   next()
// })
const router = require('./util/router')

// 将服务路由挂载至服务器
server.use('/api', router)
/* 对外输出端口号 */
server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000')
})
