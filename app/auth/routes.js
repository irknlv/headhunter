const express = require('express');
const router = express.Router();
const { sendVerificationEmail, verifyCode, signUp, logIn } = require('./controllers');
const { validateSignUp } = require('./middlewares');
const {upload} = require('./utils')
router.post('/api/auth/sendMail', sendVerificationEmail);
router.post('/api/auth/verifyCode', verifyCode)

router.post('/api/auth/signup', upload.single('companyLogo') ,validateSignUp, signUp)
router.post('/api/auth/login', logIn)

module.exports = router