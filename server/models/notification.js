const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = new Schema({
  question:  { type: Schema.Types.ObjectId, ref: 'Question' },
  answer:  { type: Schema.Types.ObjectId, ref: 'Answer' },
  isSend:  { type: Boolean, default: false },
})

module.exports= mongoose.model('Notification', notificationSchema)
