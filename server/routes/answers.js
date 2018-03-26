const express = require('express');
const router = express.Router();
const { index, findQuestionAnswer,  update, create, destroy, upvote } = require('../controllers/AnswerController')
const {auth} = require('../middlewares/auth')

router.get('/', index);
router.get('/:id/question', findQuestionAnswer);
router.post('/', auth, create)
router.put('/:id', auth, update)
router.put('/:id/upvote', auth, upvote)
router.delete('/:id', auth, destroy)

module.exports = router;
