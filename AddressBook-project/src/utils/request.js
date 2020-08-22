import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// create an axios instance

const service = axios.create({
  //baseURL: process.env.BASE_API, // api 的 base_url
  // withCredentials: true,
  timeout: 5000 // request timeout
})
// 请求拦截器
service.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

export default service
