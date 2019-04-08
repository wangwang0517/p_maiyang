import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: window.localStorage.getItem('userInfo') || null,
    isLogin: window.localStorage.getItem('userInfo')  ? true:false
  },
  getters: {

  },
  mutations: {
    setUserInfo (state, data) {
      state.userInfo = data
      state.isLogin = true
      window.localStorage.setItem('userInfo', JSON.stringify(data))
    },
    clearUserInfo (state) {
      state.userInfo = null
      window.localStorage.removeItem('userInfo')
    }
  },
  actions: {}
})
