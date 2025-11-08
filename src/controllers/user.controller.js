const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User.model');
const UserDetail = require('../models/UserDetail.model');
const { profileSchema } = require('../validators/user.validator');
const { success } = require('../utils/response');

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('userDetailId');
  success(res, { profile: user.userDetailId || null });
});

const createProfile = asyncHandler(async (req, res) => {
  const { error } = profileSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });

  // Cloudinary upload result
  const profileImage = req.file?.path || null;

  const detail = await UserDetail.create({
    ...req.body,
    profileImage,
  });

  await User.findByIdAndUpdate(req.user._id, { userDetailId: detail._id });

  success(res, {
    profile: {
      ...detail.toObject(),
      profileImage // ensure secure_url is returned
    }
  }, 'Profile completed');
});

module.exports = { getProfile, createProfile };