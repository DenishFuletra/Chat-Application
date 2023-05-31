const express = require('express');
const { accessChat, fetchChat,createGroupChat } = require('../controllers/chatControllers')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const { checkAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/accessChat', checkAuth, accessChat);
router.get('/fetchChat', checkAuth, fetchChat);
router.post('/createGroupChat', checkAuth, createGroupChat);


module.exports = router;