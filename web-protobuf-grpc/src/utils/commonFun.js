/**
 * @param {Function} fn 要执行的函数
 * @param {Date} time 间隔时间
 * @param {Boolean} immediate 是否立即执行函数
 */
export function debounce(fn, immediate = true, time = 60) {
  let timer = null
  // eslint-disable-next-line func-names
  return function(...arg) {
    timer && clearTimeout(timer)
    let result
    if (immediate) {
      !timer && (result = fn.apply(this, arg))
      timer = setTimeout(() => {
        timer = null
      }, time)
    } else {
      timer = setTimeout(() => {
        timer = null
        result = fn.apply(this, arg)
      }, time)
    }
    return result
  }
}
/**
 * 功能：计算表格高度，自适应屏幕分辨率
 * @param {VNode|Number} 参数为VNode或者是padding、margin、border值
 * @returns {Number} 返回表格高度
 */
// eslint-disable-next-line consistent-return
export function calculateTableHeight(...arg) {
  const container = arg[0]

  // 判断是显示还是隐藏状态
  if (container) {
    let height = container.offsetHeight
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i < arg.length; i++) {
      // eslint-disable-next-line prefer-rest-params
      if (arg[i].offsetHeight && arg[i].offsetHeight > 0) {
        height -= arg[i].offsetHeight
      } else {
        // eslint-disable-next-line valid-typeof
        typeof arg[i] === Number && (height -= arg[i])
      }
    }
    return height
  }
}

// 生成验证码
export function createValidateCode() {
  const codeLength = 4
  // eslint-disable-next-line max-len
  const codes = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'A',
    'B',
    'C',
    'E',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'M',
    'N',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'W',
    'X',
    'Y',
    'Z',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0'
  ]
  let codeValue = ''
  let singleCode = ''
  for (let i = codeLength; i--;) {
    singleCode = codes[Math.floor(Math.random() * codes.length)]
    codeValue += singleCode
  }
  return codeValue
}
/**
 * 功能:計算pageIndex;
 * @param {Array} tabelData 表格數據
 * @param {Number} pageIndex pagination當前索引
 */
export function calcPageIndex(tableData, pageIndex) {
  // eslint-disable-next-line no-nested-ternary
  if (!tableData || tableData.length) {
    return pageIndex
  }
  return (pageIndex - 1 > 0) ? pageIndex - 1 : pageIndex
}
/**
 * 功能:验证IP地址是否合法
 * @param {string} ip IP地址
 */
export function IpValidate(ip) {
  const segments = ip.split('.')
  if (segments.length === 4) {
    const flag = segments.every((segment) => {
      if (segment) {
        segment = Number(segment)
        return segment % 1 === 0 && segment >= 0 && segment <= 255
      }
      return false
    })
    return flag
  }
  return false
}

export function macValidate(mac) {
  const seg = mac.split(':')
  const reg = /^[0-9a-fA-F][0-9a-fA-F]$/
  if (seg.length === 6) {
    const flag = seg.every((seg) => {
      if (seg) {
        return reg.test(seg)
      }
      return false
    })
    return flag
  }
  return false
}
// 时间格式化函数
export function dateFormat(fmt, date) {
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)))
    }
  }
  return fmt
}
// 判断是否是数字
export function isNumber(value) {
  return typeof value === 'number' && !isNaN(value)
}
