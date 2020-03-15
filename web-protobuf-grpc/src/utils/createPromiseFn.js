import { resResolve } from './resultResolve'
/**
 * 功能:将函数包装成Promise函数;
 * @param {Function} fn 要执行的函数
 * @param {Object} request 请求参数
 * */
export function createPromiseFn(fn, request) {
  return new Promise((resolve, reject) => {
    fn(request, {}, (err, res) => {
      if (!err) {
        const result = resResolve(res)
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
}
