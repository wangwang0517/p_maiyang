import Vue from 'vue'
import Router from 'vue-router'
import login from './views/Login.vue'
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
      component: login,
      meta: { hiddenCommonComponents: true }
    },
    {
      path: '/alarm',
      name: '报警信息-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "about" */ './views/alarm/alarm.vue')
    },
    {
      path: '/patient/new',
      name: '新建病人信息-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "about" */ './views/patient/new.vue')
    },
    {
      path: '/patient/list',
      name: '病人信息列表-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "about" */ './views/patient/list.vue')
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
