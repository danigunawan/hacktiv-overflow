// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store.js'
import VueSweetAlert from 'vue-sweetalert'
import Spinner from 'vue-simple-spinner'

Vue.use(VueSweetAlert)
Vue.component('spinner', Spinner)
Vue.config.productionTip = false

let host = 'http://localhost:3000'
if (location.hostname !== 'localhost') {
  host = 'http://overflow-api.geekosta.com'
}

Vue.prototype.$http = axios.create({ baseURL: host })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
