const express = require('express');
const { checkAuth } = require('../middleware/authMiddleware');
const { sendMessage, getAllMessages } = require('../controllers/messageControllers')


const router = express.Router();

router.post('/', checkAuth, sendMessage);

router.get('/:chatId', checkAuth, getAllMessages)


module.exports = router;