import request from '@/util/request'
export function loginByUsername(userName, passWord) {
  const data = {
    userName,
    passWord
  }
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

