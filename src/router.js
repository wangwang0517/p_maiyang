import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/logout',
      name: 'logout'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
      meta: { hiddenCommonComponents: true }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/system-admin/About.vue')
    },
    {
      path: '/editSystemAdmin',
      name: '编辑管理员信息-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "about" */ './views/system-admin/EditSystemAdmin.vue')

    }
  ]
})
