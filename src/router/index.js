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
      path: '/register',
      name: 'register',
      component: ()=>import('@/pages/register.vue')
    },
     {
      path: '/resetPassword',
      name: 'resetPassword',
      component: ()=>import('@/pages/resetPassword.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: ()=>import('@/pages/home.vue')
    },
    {
      path: '/try',
      name: 'try',
      component: ()=>import('@/pages/try.vue')
    },
  ]
})
