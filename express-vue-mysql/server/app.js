const express = require('express');
/*用于全局解析post请求*/
const bodyParser = require('body-parser');

const server = express();
server.use(bodyParser.json()); // support json encoded bodies
server.use(bodyParser.urlencoded({ extended: true }));

/*引入测试服务*/
const router = require('./util/router');
// 将服务路由挂载至服务器
server.use('/api',router);
/*对外输出端口号*/
server.listen(3000,()=>{
  console.log('Server is running at http://localhost:3000');
});
