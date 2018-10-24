import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Ok from '@/components/ok'
import Readfile from '@/components/readfile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/ok',
      name: 'ok',
      component: Ok
    },
    {
      path: '/readfile',
      name: 'readfile',
      component: Readfile
    }
  ]
})
