import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

let host = 'http://localhost:3000'
if (location.hostname !== 'localhost') {
  host = 'http://overflow-api.geekosta.com'
}

const request = axios.create({ baseURL: host })

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false,
    questions: []
  },
  mutations: {
    loginState (state, payload) {
      state.isLogin = payload
    },
    questionState (state, payload) {
      state.questions = payload
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
    },
    fetchQuestions (context) {
      request.get('/questions').then(function (res) {
        context.commit('questionState', res.data.data)
      }).catch(err => console.log(err))
    }
  }
})
export default store
