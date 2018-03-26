const Question = require('../models/question')
const UpvoteQuestion = require('../models/upvoteQuestion')

module.exports = {
  myQuestion (req, res) {
    Question.find({user: req.user._id}).populate('upvotes').populate('user').exec(function (err, data) {
      if(err) return res.status(500).json({ message: err })
      return res.status(200).json({
        message: "Success Read All Question",
        data
      })
    })
  },
  index (req, res) {
    Question.find({}).populate('upvotes').populate('user').exec(function (err, data) {
      if(err) return res.status(500).json({ message: err })
      return res.status(200).json({
        message: "Success Read All Question",
        data
      })
    })
  },
  findOne (req, res) {
    Question.findOne({_id: req.params.id}).populate('upvotes').populate('user').exec(function (err, data) {
      if(err) return res.status(500).json({ message: err })
      return res.status(200).json({
        message: "Success Read a Question",
        data
      })
    })
  },
  create (req, res) {
    const { title, text } = req.body
    const user = req.user._id
    const input = { title, text, user }
    Question.create(input, function (err, data) {
      if (err) return res.status(500).json({message: err})
      res.status(201).json({
        message: "Success Add new Question",
        data
      })
    })
  },
  upvote (req, res) {
    const user = req.user._id
    const id = req.params.id
    const question = id
    UpvoteQuestion.findOne({user, question}).exec(function (err, data) {
      if(err) return res.status(500).json({ message: err })
      if (data) {
        UpvoteQuestion.findOneAndRemove({_id: data._id}, function (err, data) {
          if(err) return res.status(500).json({ message: err })
          return res.status(200).json({
            message: "Success DownVote an Question",
            data
          })
        }) 
      } else {
        UpvoteQuestion.create({ user, question}, function (err, data) {
          if(err) return res.status(500).json({ message: err })
          return res.status(200).json({
            message: "Success UpVote an Question",
            data
          })
        }) 
      }
    })
  },
  update (req, res) {
    const { title, text } = req.body
    const user = req.user._id
    const id = req.params.id
    const input = { title, text}
    Question.findOne({_id: id}).exec(function (err, data) {
      if(err) return res.status(500).json({ message: err })

      if (data && data.user == user) {
        Question.findOneAndUpdate({_id: id}, {title, text}, { new: true }, function (err, data) {
          if(err) return res.status(500).json({ message: err })
          return res.status(200).json({
            message: "Success Update a Question",
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
    Question.findOne({_id: id}).exec(function (err, data) {
      if(err) return res.status(500).json({ message: err })
      console.log(user)
      if (data && data.user == user) {
        Question.findOneAndRemove({_id: id}, function (err, data) {
          if(err) return res.status(500).json({ message: err })
          return res.status(200).json({
            message: "Success Delete a Question",
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
