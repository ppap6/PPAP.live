import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/components/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/new-posts',
      name: 'index',
      component: index
    },
    {
      path: '*',
      redirect: HelloWorld
    }
  ]
})
