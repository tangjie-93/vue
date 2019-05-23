import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'content',
      component: () => import('@/components/TheContent')
      /*  {
        theheader: () => import('@/components/TheHeader'),
        thecontent: () => import('@/components/TheContent'),
        thefooter: () => import('@/components/thefooter')
      } */

    }

  ]
})
