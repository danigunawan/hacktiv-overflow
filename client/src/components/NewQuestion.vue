<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-body">
          <h2>Submit New Question</h2>
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Title</label>
              <input type="text" v-model="question.title" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Text</label>
              <vue-editor v-model="question.text"></vue-editor>
            </div>
            <button type="button" class="btn btn-primary" @click="saveForm">Submit</button>
          </form>
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
  methods: {
    saveForm () {
      const app = this
      this.$http.post('/questions', this.question, { headers: { token: localStorage.token } }).then(function (res) {
        app.$router.push('/')
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
