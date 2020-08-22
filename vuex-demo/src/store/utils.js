export function forEachValue (obj, callBack) {
    Object.keys(obj).forEach(key => {
        callBack(obj[key], key);
    })
}
//闭包，偏函数
export function partial (fn, arg) {
    return () => fn(arg)
}