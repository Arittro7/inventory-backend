const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { addTagsToItem, suggestTags } = require('../controllers/tag.controller');

router.post('/item/:itemId', auth, addTagsToItem);
router.get('/suggest', suggestTags);

module.exports = router;
