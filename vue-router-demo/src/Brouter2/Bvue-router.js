import Link from './router-link'
import View from './router-view'
  
let Vue;
class BVueRouter {
  constructor(options) {    //options接收用户传进来的配置及属性
    this.$options = options
 
    this.current = window.location.hash.slice(1) || '/'
    Vue.util.defineReactive(this, 'matched', [])
    //match方法可以递归遍历路由表，获得匹配关系数据matched
    this.match()
 
    //这里使用bind(this)的原因是因为是window调用的，用bind(this)就是重新指向当前类KVueRouter
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))
 
  }
 
  onHashChange() {
    console.log('window.location.hash:===', window.location.hash);
 
    this.current = window.location.hash.slice(1)
    //当路由变化的时候，把matched数组清空，重新匹配
    this.matched = []
    this.match()
  }
  match(routes) {
    routes = routes || this.$options.routes
 
    //递归遍历
    for (const route of routes) {
      if (route.path === '/' && this.current === '/') {
        this.matched.push(route)
        return
      }
      //this.current是/about/info时的判断
      if (route.path !== '/' && this.current.indexOf(route.path) != -1) {
        this.matched.push(route)
        //路由/info
        if (route.children) {
          this.match(route.children)
        }
        return
      }
    }
  }
 
}
BVueRouter.install = function (_vue) {
  //保存构造函数，在KVueRouter中使用
  Vue = _vue
 
  //挂载$router   
  //怎么获取根实例下的router选项
  Vue.mixin({
    beforeCreate() {
      // console.log(this);
      //确保根实例的时候才执行，只有根实例的时候才会存在router,所以用下面的判断
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
 
    }
  })
  }) */
  Vue.component('router-link', Link)
  Vue.component('router-view', View)
 
}
 
export default BVueRouter
