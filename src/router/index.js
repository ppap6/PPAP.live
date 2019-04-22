import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import Index from '@/components/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/new-posts',
      name: 'Index',
      component: Index
    },
    {
      path: '*',
      component: Home
    }
  ]
})
