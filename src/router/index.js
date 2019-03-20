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
      component: ()=>import('@/pages/home.vue'),
    },
    {
      path: '/tagManage',
      name: 'tagManage',
      component: ()=>import('@/pages/tagManage.vue'),
    },
    {
      path: '/a',
      name: 'a',
      component: ()=>import('@/pages/ele-tabs.vue'),
    },

    
]
})
