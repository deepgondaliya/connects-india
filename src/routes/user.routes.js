const express = require('express');
const { getProfile, createProfile } = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

const router = express.Router();

router.use(protect);
router.get('/profile', getProfile);
router.post('/profile', upload.single('profileImage'), createProfile);

module.exports = router;