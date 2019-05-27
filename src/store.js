import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(window.localStorage.getItem('userInfo') || '{}'),
    isLogin: !!window.localStorage.getItem('userInfo'),
    token: window.localStorage.getItem('token') || null,
    permission: window.localStorage.getItem('permission') || null,
    waringCount: 0
  },
  getters: {
    user (state) {
      return state.userInfo
    }
  },
  mutations: {
    setLoginResult (state, data) {
      state.token = data.token
      state.permission = data.permission
      delete data.token
      delete data.permission
      state.userInfo = data
      state.isLogin = true
      window.localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
      window.localStorage.setItem('token', state.token)
      window.localStorage.setItem('permission', state.permission)
    },
    updateInfo (state, data) {
      state.userInfo = data
      window.localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    },
    clearUserInfo (state) {
      state.userInfo = null
      state.token = null
      state.permission = null
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('permission')
      window.localStorage.removeItem('userInfo')
      window.location.reload()
    },
    resetWaringCount (state) {
      state.waringCount = 0
    },
    'SOCKET_ALARM': function (state,data) {
      console.log('SOCKET_ALARM')
      console.log(data)
      state.waringCount++
    },
    'SOCKET_UPLOAD': function (state, data) {
      console.log('SOCKET_UPLOAD')
      console.log(data)
      state.waringCount++
    }
  },
  actions: {
    saveLoginResult (context, data) {
      context.commit('setLoginResult', data)
    }
  }
})
