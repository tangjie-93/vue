//引入Vue构造函数
import routerView from './router-view.vue';
import routerLink from './router-link.vue';
let Vue
class VueRouter{
    constructor(options) {
        //保存选项备用
        this.$options=options
        this.routeMap={};
        options.routes.forEach(route=>{
            this.routeMap[route.path]=route;
        })
        //当前路由时响应式的
        Vue.util.defineReactive(this,'current','/')
        //监听hash
        window.addEventListener('hashchange',this.onhashChange.bind(this))
    }
    onhashChange(){
        //获取当期url
        this.current=window.location.hash.slice(1);
    }
}

VueRouter.install=function(_Vue){
    Vue=_Vue;
    //1、挂载VueRouter实例
    //全局混入
    Vue.mixin({
        beforeCreate() {
            //上下文已经是组件实例，只有根组件有这个router属性
            if(this.$options.router){
                //获取外面的组件实例
                Vue.prototype.$router=this.$options.router
            }
            
        },
      
    })
    Vue.component("router-link",routerLink)
    Vue.component("router-view",routerView)
}

export default VueRouter