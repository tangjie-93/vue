//import { is} from '_css-select@2.1.0@css-select'

/**
 * 功能:将后台返回的数据进行解析;
 * @param {Object} res 要解析的对象
 * */
export function resResolve(res) {
  const result = res.toObject()
  const commonResult = result.commonResult
  return commonResult ? isSuccess(commonResult, result) : isSuccess(result)
}
/**
 * 功能：判断请求是否成功
 * @param {Object} result 后台返回结果如{code:0,msg:"xx"}
 * @param {Object} data 后台返回的数据如{commonResult:{code:0,msg:"XX"}}
 */
function isSuccess(result, data) {
  const {
    msg,
    code
  } = result
  // 请求成功
  // if (msg === 'success' && code === 0) {
  if (code !== 0) {
    // 请求失败
    return Promise.reject(new Error(msg))
  }
  if (data) {
    if (data.rowsList) {
      data.rowsList = data.rowsList.map(item => resolveUInt64Value(item))
    }
    if (data.data) {
      data.data = resolveUInt64Value(data.data)
    }

    return data
  }
  return result
}
/**
 * 功能：解析包装类
 * @param {Object} data 解析的对象
 */
function resolveUInt64Value(data) {
  Object.keys(data).forEach(key => {
    if (typeof data[key] === 'object' && data[key] !== undefined) {
      const keys = Object.keys(data[key])
      const len = keys.length
      if (len === 1 && keys.includes('value')) {
        data[key] = data[key].value
      }
      if (len === 2 && keys.includes('seconds')) {
        data[key] = data[key].seconds
      }
    }
  })
  return data
}
