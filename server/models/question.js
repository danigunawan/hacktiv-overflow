const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  user:  { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  text: String,
}, { toJSON: { virtuals: true } })

questionSchema.virtual('upvotes', {
  ref: 'UpvoteQuestion', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'question', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false
});

module.exports = mongoose.model('Question', questionSchema)
