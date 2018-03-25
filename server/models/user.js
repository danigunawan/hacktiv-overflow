  const mongoose = require('mongoose')
  const Schema = mongoose.Schema

  const userSchema = new Schema({
    email:  String,
    name: String,
    password: String,
  })

export.default = mongoose.model('User', userSchema)
