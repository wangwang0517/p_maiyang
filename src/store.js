import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: window.localStorage.getItem('userInfo') || null,
    isLogin: !!window.localStorage.getItem('userInfo'),
    token: window.localStorage.getItem('token') || null,
    permission: window.localStorage.getItem('permission') || null
  },
  getters: {
  },
  mutations: {
    setLoginResult (state, data) {
      state.token = data.token
      state.permission = data.permission.toUpperCase()
      window.localStorage.setItem('token', JSON.stringify(data.token))
      window.localStorage.setItem('permission', JSON.stringify(data.permission))
    },
    setUserInfo (state, data) {
      state.userInfo = data
      state.isLogin = true
      window.localStorage.setItem('userInfo', JSON.stringify(data))
    },
    clearUserInfo (state) {
      state.userInfo = null
      state.token = null
      state.permission = null
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('permission')
      window.localStorage.removeItem('userInfo')
    }
  },
  actions: {}
})
