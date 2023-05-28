const express = require('express');
const { registerUser, authUser, getAllUsers } = require('../controllers/userControllers')
const { checkAuth } = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

const router = express.Router();

router.post('/signup', upload.single('profile'), registerUser)

router.post('/login', authUser);

router.get('/getAllUsers', checkAuth, getAllUsers);


module.exports = router;