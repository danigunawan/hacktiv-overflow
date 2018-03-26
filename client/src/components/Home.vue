<template>
  <div class="row">
    <div class="col-md-12">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
          <li class="breadcrumb-item active" aria-current="page">All  Question </li>
        </ol>
      </nav>
      <div class="list-group">
          <router-link :to="{ name: 'Question', params: {id: question._id} }" href="#" :key="index" v-for="(question, index) in questions" class="list-group-item list-group-item-action flex-column align-items-start" >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ question.title }}</h5>
            <small class="text-muted">3 days ago</small>
          </div>
          <p class="mb-1" v-html="question.text"></p>
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
      questions: []
    }
  },
  created () {
    this.fetchQuestions()
  },
  methods: {
    fetchQuestions () {
      const app = this
      this.$http.get('/questions').then(function (res) {
        app.questions = res.data.data
      }).catch(err => console.log(err))
    }
  }
}
</script>
