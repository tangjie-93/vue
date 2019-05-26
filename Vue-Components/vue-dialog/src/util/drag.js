/*
 element:是被拖拽的dom
 parentELe:是拖拽元素活动的区域
*/
function drag (el, binding, vnode) {
  var element = el
  var parentEle = window
  var params = {
    left: 0,
    top: 0,
    currentX: 0,
    currentY: 0,
    flag: false
  }
  // 计算dom元素当前偏移量
  params.left = element.offsetLeft
  params.top = element.offsetTop

  element.onmousedown = function (event) {
    params.flag = true
    event = event || window.event
    // 按下鼠标时的dom当前坐标
    params.currentX =
      (event.clientX || event.pageX) +
      (document.documentElement.scrollTop || document.body.scrollTop)
    params.currentY =
      (event.clientY || event.pageY) +
      (document.documentElement.scrollLeft || document.body.scrollLeft)
    element.onmousemove = function (event) {
    // 判断当前dom是否是可以拖动的
      if (params.flag) {
        event = event || window.event
        // 移动时的dom当前坐标
        // eslint-disable-next-line one-var
        var nowX =
          (event.clientX || event.pageX) +
          (document.documentElement.scrollTop || document.body.scrollTop),
          nowY =
          (event.clientY || event.pageY) +
          (document.documentElement.scrollLeft || document.body.scrollLeft)
        // dom移动的距离
        // eslint-disable-next-line one-var
        var disX = nowX - params.currentX,
          disY = nowY - params.currentY
        // 确定dom移动后的位置
        var left = parseInt(params.left) + disX
        var top = parseInt(params.top) + disY
        /// /计算拖拽元素（element）距离拖拽容器左边的距离
        if (left < 0) {
          left = 0
        }
        var isWindow = parentEle === window
        var offSetLeft = 0
        if (isWindow) {
          offSetLeft = window.innerWidth - element.offsetWidth
          if (left > offSetLeft) {
            left = offSetLeft
          }
        } else {
          offSetLeft = parentEle.offsetWidth - element.offsetWidth
          if (left > offSetLeft) {
            left = offSetLeft
          }
        }
        // 计算拖拽元素（element）距离拖拽容器的高度
        if (top < 0) {
          top = 0
        }
        var offSetTop = 0
        if (isWindow) {
          offSetTop = window.innerHeight - element.offsetHeight
          if (top > offSetTop) {
            top = offSetTop
          }
        } else {
          offSetTop = parentEle.offsetHeight - element.offsetHeight
          if (top > offSetTop) {
            top = offSetTop
          }
        }
        element.style.left = left + 'px'
        element.style.top = top + 'px'
      }
    }
    element.onmouseup = function () {
      params.flag = false
      params.left = element.offsetLeft
      params.top = element.offsetTop
      element.onmousemove = null
      element.onmouseup = null
    }
  }
}
export default drag
