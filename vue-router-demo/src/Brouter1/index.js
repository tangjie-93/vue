import VueRouter from './Bvue-router'
import Vue from 'vue'
Vue.use(VueRouter)
const routes=[
    {
        path:"/",
        name:'home',
        component:()=>import("../components/Home.vue")
    },
    {
        path:"/about",
        name:'about',
        component:()=>import("../components/About.vue")
    }
]
export default new VueRouter({
    routes
})