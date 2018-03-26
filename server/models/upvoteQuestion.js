const mongoose = require('mongoose')
const Schema = mongoose.Schema

const upvoteQuestionSchema = new Schema({
  user:  { type: Schema.Types.ObjectId, ref: 'User' },
  question:  { type: Schema.Types.ObjectId, ref: 'Question' },
})

module.exports= mongoose.model('UpvoteQuestion', upvoteQuestionSchema)
