// 判断是否是对象
export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}
/**
 * 功能：判断是否是某种类型的数据
 * @param {*} obj 需要判断的数据
 * @param {*} type 数据类型
 */
export function isCertainType (obj, type) {
  return Object.prototype.toString.call(obj) === `[object ${type}]`
}
/**
 * 功能:将时间格式化成需要的格式
 * @param {Date} date 时间数据
 * @param {String} fmt 目标时间格式
 */
export function timeFormat (date, fmt) {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  }
  return fmt
}
/**
 *功能:构造者折线图或柱状图需要的数据
 @param {Object|Array} value 用于构造折线图或柱状图的数据
 */
export function createBarOrLineData (value) {
  // 为了将饼状图数据构造成柱状图需要的数据
  const isObject = isCertainType(value, 'Object')
  const xAxisData = isObject ? Object.keys(value) : value.map(item => item.name)
  const seriesData = Object.values(value)
  return {
    xAxisData,
    seriesData
  }
}
/**
 * 功能：根据值来设置颜色
 * @param {Number} value
 */
export function setColorByVal (value) {
  if (typeof value !== 'number') return
  const degree = parseInt(value / 10)
  switch (degree) {
    case 7:
    case 8:
    case 9:
    case 10:
      return 'red'
    case 6:
    case 5:
      return 'yellow'

    default:
      return 'green'
  }
}
/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()
export function createPieData () {
  return {
    type: 'pie',
    data: {
      title: '用户访问来源',
      legend: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
      seriesData: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ]
    }
  }
}
export function createLineData () {
  return {
    type: 'line',
    data: {
      title: 'sql执行次数',
      xAxisData: {
        name: '日期',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxisData: {
        name: '数量'
      },
      seriesData: [
        {
          name: '执行数量',
          data: [23253, 44235, 26321, 13253, 24643, 1322, 1324]
        }
      ]
    }

  }
}
export function createBarData () {
  return {
    type: 'bar',
    data: {
      title: 'sql执行次数',
      xAxisData: {
        name: '日期',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxisData: {
        name: '执行次数'
      },
      seriesData: [
        {
          name: '执行数量',
          data: [13253, 34235, 26321, 13253, 24643, 1322, 1324]
        }
      ]
    }

  }
}
export function setColumnsAndRows (colNum) {
  switch (colNum) {
    case 12:
      return { perItemWidth: 3, itemCountPerRow: 4 }
    case 9:
      return { perItemWidth: 3, itemCountPerRow: 3 }
    case 6:
      return { perItemWidth: 3, itemCountPerRow: 2 }
    case 3:
      return { perItemWidth: 3, itemCountPerRow: 1 }
  }
}
export function createMetricData () {
  const dateData = []
  for (let i = 6; i <= 24; i += 2) {
    dateData.push(`${i}:00:00`)
  }
  const metricData = []
  for (let i = 0; i < dateData.length; i++) {
    const value = Math.round(Math.random() * 10);
    metricData.push({
      value, 
      data: [{ 'test': value }, { '测试': value + 2 }]
    })
  }
  const map = {};
  dateData.forEach((item, index) => {
    map[item] = metricData[index]
  })
  return map;
}
