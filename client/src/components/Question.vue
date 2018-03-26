<template>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
          <li class="breadcrumb-item active" aria-current="page">Question</li>
        </ol>
      </nav>
      <h3>Question</h3>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{ question.title }}</h5>
          <p class="card-text" v-html="question.text"></p>
          <button class="btn btn-primary float-right" @click="upvoteQuestion(question._id)" >
            {{ question.upvotes.length }} Upvote
          </button>
        </div>
      </div>
      <h3>Answer</h3>
      <div class="list-group">
          <div  :key="index" v-for="(answer, index) in answers" class="list-group-item list-group-item-action flex-column align-items-start" >
          <div class="d-flex w-100 justify-content-between">
            <small class="text-muted">3 days ago</small>
          </div>
          <p class="mb-1" v-html="answer.text"></p>
          <small class="text-muted">{{ answer.user.email }}</small>
          <a  href="#form-answer" class="btn btn-success float-right" @click="editAnswer(index)" >Edit</a>
          <button class="btn btn-danger float-right" @click="deleteAnswer(answer._id)" >Delete</button>
          <button class="btn btn-primary float-right" @click="upvoteAnswer(answer._id)" >
            {{ answer.upvotes.length }} Upvote
          </button>
        </div>
      </div>
      <div class="card" id="form-answer" v-if="isLogin">
        <div class="card-body">
          <h3 v-if="!isEdit">Submit Answer</h3>
          <h3 v-if="isEdit">Edit Answer</h3>
          <form>
            <div class="form-group">
              <label for="exampleInputPassword1">Text</label>
              <vue-editor v-model="answer.text"></vue-editor> </div>
            <button v-if="!isEdit" type="button" class="btn btn-primary" @click="saveForm">Submit</button>
            <div v-if="isEdit" >
              <button type="button" class="btn btn-primary" @click="updateAnswer">Update</button>
              <button type="button" class="btn btn-warning" @click="cancelEditAnswer">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { mapState } from 'vuex'
export default {
  name: 'hello',
  data () {
    return {
      answer: {
        text: '',
        question: this.$route.params.id
      },
      question: {},
      answers: [],
      isEdit: false
    }
  },
  computed: mapState(['isLogin']),
  created () {
    this.fetchQuestion()
    this.fetchAnswers()
  },
  methods: {
    editAnswer (id) {
      this.isEdit = true
      this.answer = this.answers[id]
    },
    cancelEditAnswer (id) {
      this.isEdit = false
      this.answer = {
        text: '',
        question: this.$route.params.id
      }
    },
    updateAnswer () {
      const app = this
      this.$http.put(`/answers/${this.answer._id}`, this.answer, { headers: { token: localStorage.token } }).then(function (res) {
        app.fetchAnswers()
        app.cancelEditAnswer()
      }).catch(function (err) {
        console.log(err)
        if (err) {
          if (err.response.status === 403) {
            app.$swal({
              text: `can not delete other people's answers`,
              titel: 'Fail To Delete!',
              icon: 'danger'
            })
            app.cancelEditAnswer()
          }
        }
      })
    },
    fetchAnswers () {
      const app = this
      const id = this.$route.params.id
      this.$http.get(`/answers/${id}/question`).then(function (res) {
        app.answers = res.data.data
      }).catch(function (err) {
        console.log(err)
      })
    },
    fetchQuestion () {
      const app = this
      const id = this.$route.params.id
      this.$http.get(`/questions/${id}`).then(function (res) {
        app.question = res.data.data
      }).catch(function (err) {
        console.log(err)
      })
    },
    saveForm () {
      const app = this
      this.$http.post('/answers', this.answer, { headers: { token: localStorage.token } }).then(function (res) {
        app.fetchAnswers()
      }).catch(function (err) {
        console.log(err)
      })
    },
    deleteAnswer (id) {
      const app = this
      this.$http.delete(`/answers/${id}`, { headers: { token: localStorage.token } }).then(function (res) {
        app.fetchAnswers()
      }).catch(function (err) {
        console.log(err)
        if (err) {
          if (err.response.status === 403) {
            app.$swal({
              text: `can not delete other people's answers`,
              titel: 'Fail To Delete!',
              icon: 'danger'
            })
          }
        }
      })
    },
    upvoteQuestion (id) {
      const app = this
      this.$http.put(`/questions/${id}/upvote`, {}, { headers: { token: localStorage.token } }).then(function (res) {
        app.fetchQuestion()
      }).catch(function (err) {
        console.log(err)
      })
    },
    upvoteAnswer (id) {
      const app = this
      this.$http.put(`/answers/${id}/upvote`, {}, { headers: { token: localStorage.token } }).then(function (res) {
        app.fetchAnswers()
      }).catch(function (err) {
        console.log(err)
      })
    }
  },
  components: {
    VueEditor
  }
}
</script>
<style >
.card, .list-group {
 margin-bottom: 30px
}

.btn {
  margin-right: 5px
}
  
</style>
