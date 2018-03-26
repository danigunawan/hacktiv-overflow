<template>
  <div class="row">
    <div class="col-md-12">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
          <li class="breadcrumb-item active" aria-current="page">Search Question </li>
        </ol>
      </nav>
      <div class="list-group" v-if="searchResult.length">
          <router-link @click.native="closeSearch" :to="{ name: 'Question', params: {id: question._id} }" href="#" :key="index" v-for="(question, index) in searchResult" class="list-group-item list-group-item-action flex-column align-items-start" >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ question.title }}</h5>
          </div>
          <p class="mb-1" v-html="`${question.text.substr(0,70)} ...`"></p>
          <small class="text-muted">{{ question.user.email }}</small>
        </router-link>
      </div>
      <div class="alert alert-warning" v-else><b>Not Found</b> No Questions with title <b>{{ query }}</b></div>
      <button class="btn btn-warning" @click="closeSearch">Close Search</button>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'SearchQuestion',
  data () {
    return {
      searchResult: []
    }
  },
  props: ['query'],
  computed: mapState(['questions']),
  created () {
    this.searchQuestions()
  },
  watch: {
    query () {
      this.searchQuestions()
    }
  },
  methods: {
    closeSearch () {
      const app = this
      app.$emit('close-search')
    },
    copyQuestion () {
      const app = this
      this.questions.forEach(q => {
        app.searchResult.push(q)
      })
    },
    searchQuestions () {
      console.log('seach')
      const app = this
      app.searchResult = []
      this.questions.forEach(q => {
        const check = q.title.toLowerCase().search(app.query.toLowerCase())
        if (check >= 0) {
          app.searchResult.push(q)
        }
      })
    }
  }
}
</script>
<style>
.btn {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
