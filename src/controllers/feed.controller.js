const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/response');
const { getFeed } = require('../services/feed.service');
const User = require('../models/User.model');

const getFeedCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('userDetailId');
  if (!user.userDetailId) {
    return res.status(400).json({ success: false, message: 'Complete your profile first' });
  }

  const { cursor } = req.query;
  const limit = 20;

  const { profiles, nextCursor } = await getFeed(
    req.user._id,
    user.userDetailId.city,
    user.userDetailId.gender,
    cursor,
    limit
  );

  if (profiles.length === 0) {
    return res.status(204).json(); // No content
  }

  success(res, { profiles, nextCursor }, 'Feed loaded');
});

module.exports = { getFeedCtrl };