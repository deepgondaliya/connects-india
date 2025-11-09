const express = require('express');
const { sendMessageCtrl, getChatHistoryCtrl } = require('../controllers/chat.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(protect);

router.post('/send', sendMessageCtrl);
router.get('/history/:userId', getChatHistoryCtrl);

module.exports = router;