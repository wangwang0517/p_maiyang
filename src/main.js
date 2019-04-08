import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/common.scss'

Vue.use(ElementUI)

Vue.config.productionTip = true

router.beforeEach((to, from, next) => {
  if (!store.state.isLogin) {
    next({ path: '/login' })
  } else {
    if (to.path === '/login') {
      next({ path: '/home' })
    } else {
      next()
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
