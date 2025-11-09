const express = require('express');
const { sendOtpCtrl, verifyOtpCtrl } = require('../controllers/auth.controller');
const { logout } = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/send-otp', sendOtpCtrl);
router.post('/verify-otp', verifyOtpCtrl);
router.post('/logout', protect, logout);

module.exports = router;