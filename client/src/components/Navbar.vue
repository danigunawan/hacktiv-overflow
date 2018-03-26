<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item" v-if="!isLogin">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item" v-if="!isLogin">
          <router-link to="/register" class="nav-link"> Register</router-link>
        </li>
        <li class="nav-item" v-if="isLogin">
          <router-link to="/question/me" class="nav-link"> My Question</router-link>
        </li>
        <li class="nav-item" v-if="isLogin">
          <router-link to="/question" class="nav-link"> New Question</router-link>
        </li>
        <li class="nav-item" v-if="isLogin">
          <a class="nav-link" href="#" @click="logout" >Logout</a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input v-model="query" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="button" @click="onSearch">Search</button>
      </form>
    </div>
  </nav>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'hello',
  data () {
    return {
      query: ''
    }
  },
  computed: mapState(['isLogin']),
  methods: {
    onSearch () {
      this.$emit('on-search', this.query)
    },
    logout () {
      localStorage.removeItem('token')
      this.checkLogin()
    },
    ...mapActions(['checkLogin'])
  }
}
</script>
