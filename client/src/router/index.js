import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import NewQuestion from '@/components/NewQuestion'
import EditQuestion from '@/components/EditQuestion'
import Question from '@/components/Question'
import MyQuestion from '@/components/MyQuestion'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/question/me',
      name: 'MyQuestion',
      component: MyQuestion,
      beforeEnter: (to, from, next) => {
        const token = localStorage.token
        if (token === undefined) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/question/:id/edit',
      name: 'EditQuestion',
      component: EditQuestion,
      beforeEnter: (to, from, next) => {
        const token = localStorage.token
        if (token === undefined) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/question',
      name: 'NewQuestion',
      component: NewQuestion,
      beforeEnter: (to, from, next) => {
        const token = localStorage.token
        if (token === undefined) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/question/:id',
      name: 'Question',
      component: Question
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        const token = localStorage.token
        if (token === undefined) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      beforeEnter: (to, from, next) => {
        const token = localStorage.token
        if (token === undefined) {
          next()
        } else {
          next('/')
        }
      }
    }
  ]
})
