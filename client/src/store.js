import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
    loginState (state, payload) {
      state.isLogin = payload
    }
  },
  actions: {
    checkLogin (context) {
      const token = localStorage.token
      if (token) {
        context.commit('loginState', true)
      } else {
        context.commit('loginState', false)
      }
    }
  }
})
export default store
