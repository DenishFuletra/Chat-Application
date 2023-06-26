const express = require('express');
const { checkAuth } = require('../middleware/authMiddleware');
const { sendMessage } = require('../controllers/messageControllers')


const router = express.Router();

router.post('/', checkAuth, sendMessage);


module.exports = router;