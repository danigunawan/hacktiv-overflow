const Answer = require('../models/answer')
const UpvoteAnswer = require('../models/upvoteAnswer')
const Notification = require('../models/notification')

module.exports = {
  index (req, res) {
    Answer.find({}).populate('upvotes').exec(function (err, data) {
      if(err) return res.status(500).json({ message: err })
      return res.status(200).json({
        message: "Success Read All Answer",
        data
      })
    })
  },
  findQuestionAnswer (req, res) {
    Answer.find({question: req.params.id}).populate('upvotes').populate('user').exec(function (err, data) {
      if(err) return res.status(500).json({ message: err })
      return res.status(200).json({
        message: "Success Read Answer of question",
        data
      })
    })
  },
  create (req, res) {
    const { text, question } = req.body
    const user = req.user._id
    const input = { question, text, user }
    Answer.create(input, function (err, data) {
      if (err) return res.status(500).json({message: err})
      Notification.create({question,answer: data._id}, function(err,data) {
        if (err) return res.status(500).json({message: err})
      })
      res.status(201).json({
        message: "Success Add new Answer",
        data
      })
    })
    
  },
  upvote (req, res) {
    const user = req.user._id
    const id = req.params.id
    const answer = id
    UpvoteAnswer.findOne({user, answer}).exec(function (err, data) {
      if(err) return res.status(500).json({ message: err })
      if (data) {
        UpvoteAnswer.findOneAndRemove({_id: data._id}, function (err, data) {
          if(err) return res.status(500).json({ message: err })
          return res.status(200).json({
            message: "Success DownVote an Answer",
            data
          })
        }) 
      } else {
        UpvoteAnswer.create({ user, answer}, function (err, data) {
          if(err) return res.status(500).json({ message: err })
          return res.status(200).json({
            message: "Success UpVote an Answer",
            data
          })
        }) 
      }
    })
  },
  update (req, res) {
    const { text } = req.body
    const user = req.user._id
    const id = req.params.id
    const input = {text}
    Answer.findOne({_id: id}).exec(function (err, data) {
      if(err) return res.status(500).json({ message: err })
      if (data && data.user == user) {
        Answer.findOneAndUpdate({_id: id}, {text}, { new: true }, function (err, data) {
          if(err) return res.status(500).json({ message: err })
          return res.status(200).json({
            message: "Success Update a Answer",
            data
          })
        }) 
      } else {
        return res.status(403).json({
          message: "Cannot Update, No Authorization",
        })
      }
    })
  },
  destroy (req, res) {
    const user = req.user._id
    const id = req.params.id
    Answer.findOne({_id: id}).exec(function (err, data) {
      if(err) return res.status(500).json({ message: err })
      console.log(user)
      if (data && data.user == user) {
        Answer.findOneAndRemove({_id: id}, function (err, data) {
          if(err) return res.status(500).json({ message: err })
          return res.status(200).json({
            message: "Success Delete a Answer",
            data
          })
        }) 
      } else {
        return res.status(403).json({
          message: "Cannot Delete, No Authorization",
        })
      }
    })
  }

}
