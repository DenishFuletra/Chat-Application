const express = require('express');
const { createGroup } = require('../controllers/chatControllers')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const { checkAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/createGroup', checkAuth, createGroup);


module.exports = router;