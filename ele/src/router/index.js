import Vue from 'vue'
import Router from 'vue-router'
//引入Goods组件
import Goods from '@/components/Goods/Goods'
import Comments from '@/components/Comments/Comments'
import Seller from '@/components/Seller/Seller'
//这里的@表示src目录

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect : '/goods'
    },
    {
      path: '/comments',
      component: Comments
    },
    {
      path: '/seller',
      component: Seller
    },
    {
      path: '/goods',
      component: Goods
    }
  ]
})
