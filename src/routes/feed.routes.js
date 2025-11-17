const express = require('express');
const { getFeedCtrl } = require('../controllers/feed.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(protect);
router.get('/', getFeedCtrl);

module.exports = router;