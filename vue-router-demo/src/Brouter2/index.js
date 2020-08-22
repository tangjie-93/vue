import VueRouter from './Bvue-router'
import Vue from 'vue'
import home from "../components/Home.vue"
Vue.use(VueRouter)
const routes=[
    {
        path:"/",
        name:'home',
        component:home
    },
    {
        path:"/about",
        name:'about',
        component:()=>import("../components/About.vue"),
        children:[{
            path:'/about/user',
            name:'user',
            component:{
                render(h) {
                    return h('div','info')
                },
            }
        }  
        ]
    }
]
export default new VueRouter({
    routes
})