import request from '../utils/request'
export function login (userName, passWord) {
  const data = {
    userName,
    passWord
  }
  return request({
    url: 'api/login',
    method: 'post',
    data
  })
}
