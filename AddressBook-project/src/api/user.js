import request from '../utils/request'

export function getUsers (userName) {
  let data = {userName}
  // data = encodeURIComponent(data)
  return request({
    url: 'api/getUsers',
    method: 'post',
    data
  })
}
export function addUser (data) {
  return request({
    url: 'api/addUser',
    method: 'post',
    data
  })
}
export function editUser (data) {
  return request({
    url: 'api/editUser',
    method: 'post',
    data
  })
}
export function deleteUser (userId) {
  debugger
  const data = {
    userId
  }
  return request({
    url: 'api/deleteUser',
    method: 'post',
    data
  })
}
