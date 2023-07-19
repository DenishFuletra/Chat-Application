const express = require('express');
const { registerUser, authUser, getAllUsers, resetPassword, sendOTP, googleAuth } = require('../controllers/userControllers')
const { checkAuth } = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

const router = express.Router();

router.post('/signup', upload.single('profile'), registerUser)

router.post('/login', authUser);

router.get('/getAllUsers', checkAuth, getAllUsers);

router.put('/resetPassword', checkAuth, resetPassword);

router.post('/sendOTP', sendOTP);

router.get('/googleAuth', checkAuth, googleAuth);


module.exports = router;