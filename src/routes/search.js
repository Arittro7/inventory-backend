const express = require('express');
const router = express.Router();
const { searchItems } = require('../controllers/search.controller');

router.get('/items', searchItems);

module.exports = router;
