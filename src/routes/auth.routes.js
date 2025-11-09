const express = require('express');
const { sendOtpCtrl, verifyOtpCtrl } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/send-otp', sendOtpCtrl);
router.post('/verify-otp', verifyOtpCtrl);

module.exports = router;