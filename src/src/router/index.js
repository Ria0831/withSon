import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'login',
      component: ()=>import('@/pages/login.vue')
    },
    {
      path: '/try',
      name: 'try',
      component: ()=>import('@/pages/try.vue')
    },
  ]
})
