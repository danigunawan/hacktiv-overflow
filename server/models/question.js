const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  user:  { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  text: String,
})

export.default = mongoose.model('Question', questionSchema)
