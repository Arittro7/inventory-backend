const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { addComment, getComments } = require('../controllers/comment.controller');

router.post('/', auth, addComment);
router.get('/:inventoryId', getComments);

module.exports = router;
