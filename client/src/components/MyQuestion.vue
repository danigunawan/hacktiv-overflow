<template>

  <div class="row">
    <div class="col-md-12">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
          <li class="breadcrumb-item active" aria-current="page"> My Question </li>
        </ol>
      </nav>
      <spinner v-if="loading" message="Loading Question.." ></spinner>
      <div class="list-group">
          <router-link :to="{ name: 'EditQuestion', params: {id: question._id} }" href="#" :key="index" v-for="(question, index) in questions" class="list-group-item list-group-item-action flex-column align-items-start" >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ question.title }}</h5>
          </div>
          <p class="mb-1" v-html="`${question.text.substr(0,70)} ...`"></p>
          <small class="text-muted">{{ question.user.email }}</small>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      questions: [],
      loading: false
    }
  },
  created () {
    this.fetchQuestions()
  },
  methods: {
    fetchQuestions () {
      const app = this
      app.loading = true
      this.$http.get('/questions/me', {headers: { token: localStorage.token }}).then(function (res) {
        app.questions = res.data.data
        app.loading = false
      }).catch(err => console.log(err))
    }
  }
}
</script>
