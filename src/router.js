import Vue from 'vue'
import Router from 'vue-router'
import login from './views/Login'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/'
    },
    {
      path: '/logout',
      name: 'logout'
    },
    {
      path: '/login',
      name: '报警信息-登录',
      component: login,
      meta: { hiddenCommonComponents: true }
    },
    {
      path: '/alarm',
      name: '报警信息-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "mai_yang" */ './views/alarm/Alarm.vue')
    },
    {
      path: '/patient/new',
      name: '新建病人信息-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "mai_yang" */ './views/patient/New.vue')
    },
    {
      path: '/patient/edit/:id',
      name: '编辑病人信息-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "mai_yang" */ './views/patient/Edit.vue')
    },
    {
      path: '/patient/info/:id',
      name: '病人信息详情-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "mai_yang" */ './views/patient/Info.vue')
    },
    {
      path: '/patient/list',
      name: '病人信息列表-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "mai_yang" */ './views/patient/List.vue')
    },
    {
      path: '/device/list',
      name: '设备信息列表-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "mai_yang" */ './views/device/List.vue')
    },
    {
      path: '/device/info/:id',
      name: '设备信息详情-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "mai_yang" */ './views/device/Info.vue')
    },
    {
      path: '/device/new',
      name: '新建设备信息-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "mai_yang" */ './views/device/New.vue')
    },
    {
      path: '/device/edit/:id',
      name: '编辑设备信息-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "mai_yang" */ './views/device/Edit.vue')
    },
    {
      path: '/doctor_nurse/list',
      name: '医护信息列表-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "mai_yang" */ './views/doctor_nurse/List.vue')
    },
    {
      path: '/doctor_nurse/info/:id',
      name: '医护信息详情-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "mai_yang" */ './views/doctor_nurse/Info.vue')
    },
    {
      path: '/doctor_nurse/new',
      name: '新建医护信息-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "mai_yang" */ './views/doctor_nurse/New.vue')
    },
    {
      path: '/doctor_nurse/edit/:id',
      name: '编辑医护信息-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "mai_yang" */ './views/doctor_nurse/Edit.vue')
    },
    {
      path: '/procedure/list',
      name: '病区与值班信息列表-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "mai_yang" */ './views/procedure/List.vue')
    },
    {
      path: '/procedure/info/:id',
      name: '病区与值班信息详情-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "mai_yang" */ './views/procedure/Info.vue')
    },
    {
      path: '/procedure/new',
      name: '新建病区与值班信息-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "mai_yang" */ './views/procedure/New.vue')
    },
    {
      path: '/procedure/edit/:id',
      name: '编辑病区与值班信息-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "mai_yang" */ './views/procedure/Edit.vue')
    },
    {
      path: '/system/about',
      name: '关于我们-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "mai_yang" */ './views/system/About.vue')
    },
    {
      path: '/system/edit',
      name: '编辑管理员信息-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "mai_yang" */ './views/system/Edit.vue')

    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "mai_yang" */ './views/Home.vue')
    }
  ]
})
