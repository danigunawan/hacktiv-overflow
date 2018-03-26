const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
  user:  { type: Schema.Types.ObjectId, ref: 'User' },
  question:  { type: Schema.Types.ObjectId, ref: 'Question' },
  text: String,
}, { toJSON: { virtuals: true } })
answerSchema.virtual('upvotes', {
  ref: 'UpvoteAnswer', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'answer', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false
});

module.exports= mongoose.model('Answer', answerSchema)
