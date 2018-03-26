const mongoose = require('mongoose')
const Schema = mongoose.Schema

const upvoteAnswerSchema = new Schema({
  user:  { type: Schema.Types.ObjectId, ref: 'User' },
  answer:  { type: Schema.Types.ObjectId, ref: 'Question' },
})

module.exports= mongoose.model('UpvoteAnswer', upvoteAnswerSchema)
