const express = require('express');
const { registerUser, authUser } = require('../controllers/userControllers')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

const router = express.Router();

router.post('/signup', upload.single('profile'), registerUser)

router.post('/login', authUser);


module.exports = router;