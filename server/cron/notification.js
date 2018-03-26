const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/overflow');
const Notification = require('../models/notification.js')
const Question = require('../models/question.js')
const Answer = require('../models/answer.js')
const User = require('../models/user.js')
const mailgun = require('./mail/index')

module.exports = {
  checkNotif (send) {
    console.log('check notif')
    Notification.find({isSend: false})
      .populate({ path: 'question', populate: { path: 'user' } })
      .populate({ path: 'answer', populate: { path: 'user' } })
      .exec((err, notifs) => {
      if(err) console.log(err)
      notifs.forEach(notif => {
        send(notif)
      })
    })
  },
  sendNotif (notif) {
    const data = {
      from: 'HacktivOverflow <me@samples.mailgun.org>',
      to: notif.question.user.email,
      subject: `${notif.answer.user.name} answer your Question`,
      html: `<h3> Your Question: ${notif.question.title} </h3> </hr> ${notif.answer.user.name}'s Answer:  ${notif.answer.text}`
    };
    mailgun.messages().send(data, function (error, body) {
      Notification.findOneAndUpdate({_id: notif._id}, {isSend: true}, {new: true}, function(err, data) {
          if(data) {
            console.log('Notification Send')
          }
      })
    })
  }
}
