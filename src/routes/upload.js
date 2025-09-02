const express = require('express');
const router = express.Router();
const multer = require('multer');
const { auth } = require('../middlewares/auth');
const { uploadImage } = require('../controllers/upload.controller');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/image', auth, upload.single('file'), uploadImage);

module.exports = router;
