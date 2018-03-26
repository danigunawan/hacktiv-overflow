<template>
  <div>
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
            <li class="breadcrumb-item"><router-link to="/question/me">My Question</router-link></li>
            <li class="breadcrumb-item active" aria-current="page">Edit Question</li>
          </ol>
        </nav>
        <div class="card">
          <div class="card-body">
            <h2>Edit Question</h2>
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Title</label>
                <input type="text" v-model="question.title" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Text</label>
                <vue-editor v-model="question.text"></vue-editor>
              </div>
              <button type="button" class="btn btn-success btn-block" @click="saveForm">Update</button>
              <button type="button" class="btn btn-danger btn-block" @click="deleteQuestion">Delete</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  name: 'hello',
  data () {
    return {
      question: {
        title: '',
        text: ''
      }
    }
  },
  created () {
    this.fetchQuestion()
  },
  methods: {
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
      this.$http.put(`/questions/${this.question._id}`, this.question, { headers: { token: localStorage.token } }).then(function (res) {
        app.$router.push('/question/me')
      }).catch(function (err) {
        console.log(err)
      })
    },
    deleteQuestion (id) {
      const app = this
      this.$http.delete(`/questions/${this.question._id}`, { headers: { token: localStorage.token } }).then(function (res) {
        app.$router.push('/question/me')
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
