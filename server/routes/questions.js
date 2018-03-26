const express = require('express');
const router = express.Router();
const { index, myQuestion, findOne, update, create, destroy, upvote } = require('../controllers/QuestionController')
const {auth} = require('../middlewares/auth')

router.get('/me',auth, myQuestion);
router.get('/', index);
router.get('/:id', findOne);

router.post('/', auth, create)
router.put('/:id', auth, update)
router.put('/:id/upvote', auth, upvote)
router.delete('/:id', auth, destroy)

module.exports = router;
