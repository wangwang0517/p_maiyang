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
      component: () => import('./views/alarm/Alarm.vue')
    },
    {
      path: '/patient/new',
      name: '新建病人信息-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "patient" */ './views/patient/New.vue')
    },
    {
      path: '/patient/edit/:id',
      name: '编辑病人信息-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "patient" */ './views/patient/Edit.vue')
    },
    {
      path: '/patient/info/:id',
      name: '病人信息详情-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "patient" */ './views/patient/Info.vue')
    },
    {
      path: '/patient/list',
      name: '病人信息列表-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "patient" */ './views/patient/List.vue')
    },
    {
      path: '/device/list',
      name: '设备信息列表-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "device" */ './views/device/List.vue')
    },
    {
      path: '/device/info',
      name: '设备信息详情-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "device" */ './views/device/Info.vue')
    },
    {
      path: '/device/new',
      name: '新建设备信息-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "device" */ './views/device/New.vue')
    },
    {
      path: '/device/edit',
      name: '编辑设备信息-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "device" */ './views/device/Edit.vue')
    },
    {
      path: '/doctor_nurse/list',
      name: '医护信息列表-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "doctor_nurse" */ './views/doctor_nurse/List.vue')
    },
    {
      path: '/doctor_nurse/info',
      name: '医护信息详情-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "doctor_nurse" */ './views/doctor_nurse/Info.vue')
    },
    {
      path: '/doctor_nurse/new',
      name: '新建医护信息-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "doctor_nurse" */ './views/doctor_nurse/New.vue')
    },
    {
      path: '/doctor_nurse/edit',
      name: '编辑医护信息-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "doctor_nurse" */ './views/doctor_nurse/Edit.vue')
    },
    {
      path: '/procedure/list',
      name: '病区与值班信息列表-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "procedure" */ './views/procedure/List.vue')
    },
    {
      path: '/procedure/info',
      name: '病区与值班信息详情-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "procedure" */ './views/procedure/Info.vue')
    },
    {
      path: '/procedure/new',
      name: '新建病区与值班信息-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "procedure" */ './views/procedure/New.vue')
    },
    {
      path: '/procedure/edit',
      name: '编辑病区与值班信息-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "procedure" */ './views/procedure/Edit.vue')
    },
    {
      path: '/system/about',
      name: '关于我们-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "system" */ './views/system/About.vue')
    },
    {
      path: '/system/edit',
      name: '编辑管理员信息-脉氧脉率管理后台',
      component: () => import(/* webpackChunkName: "system" */ './views/system/Edit.vue')

    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
    }
  ]
})
