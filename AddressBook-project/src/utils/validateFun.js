import {Message} from 'element-ui'
export function nameValidate (value) {
  if (!value) {
    Message({
      message: '姓名不能为空',
      type: 'error',
      duration: 1000
    })
    return false
  }
  var pattern = /^[\u4e00-\u9fa5]+$/
  if (!pattern.test(value)) {
    Message({
      message: '姓名只能为汉字',
      type: 'error',
      duration: 1000
    })
    return false
  }
  return true
};
export function ageValidate (value) {
  if (!value) {
    Message({
      message: '年龄不能为空',
      type: 'error',
      duration: 1000
    })
    return false
  }
  var pattern = /\d+/
  if (!pattern.test(value)) {
    Message({
      message: '年龄只能为整数',
      type: 'error',
      duration: 1000
    })
    return false
  } else {
    if (!(value > 0 && value < 100)) {
      Message({
        message: '您填写的年龄有误，请重新输入',
        type: 'error',
        duration: 1000
      })
      return false
    }
  }
  return true
}
export function majorValidate (value) {
  if (!value) {
    Message({
      message: '专业不能为空',
      type: 'error',
      duration: 1000
    })
    return false
  }
  var pattern = /^[\u4e00-\u9fa5]+$/
  if (!pattern.test(value)) {
    Message({
      message: '专业只能为汉字',
      type: 'error',
      duration: 1000
    })
    return false
  }
  return true
};
export function addressValidate (value) {
  if (!value) {
    Message({
      message: '地址不能为空',
      type: 'error',
      duration: 1000
    })
    return false
  }
  var pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+$/
  if (!pattern.test(value)) {
    Message({
      message: '地址中不能包括特殊字符',
      type: 'error',
      duration: 1000
    })
    return false
  }
  return true
}
export function schoolValidate (value) {
  if (!value) {
    Message({
      message: '学校不能为空',
      type: 'error',
      duration: 1000
    })
    return false
  }
  var pattern = /^[0-9\u4e00-\u9fa5]+$/
  if (!pattern.test(value)) {
    Message({
      message: '您填写的学校有误，请重新输入',
      type: 'error',
      duration: 1000
    })
    return false
  }
  return true
};
export function telephoneValidate (value) {
  if (!value) {
    Message({
      message: '手机号码不能为空',
      type: 'error',
      duration: 1000
    })
    return false
  }
  var pattern = /^1[34578]\d{9}$/
  if (!pattern.test(value)) {
    Message({
      message: '您填写的手机号码有误，请重新输入',
      type: 'error',
      duration: 1000
    })
    return false
  }
  return true
}
