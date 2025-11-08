const asyncHandler = require('../utils/asyncHandler');
const { sendOtp, verifyOtp } = require('../services/auth.service');
const { sendOtpSchema, verifyOtpSchema } = require('../validators/auth.validator');
const { success } = require('../utils/response');

const sendOtpCtrl = asyncHandler(async (req, res) => {
  const { error } = sendOtpSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });

  await sendOtp(req.body.phoneNumber);
  success(res, null, 'OTP sent successfully');
});

const verifyOtpCtrl = asyncHandler(async (req, res) => {
  const { error } = verifyOtpSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });

  const { token, isNewUser, isProfileComplete } = await verifyOtp(req.body.phoneNumber, req.body.otp);

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  success(res, { isNewUser, isProfileComplete }, 'Login successful');
});

module.exports = { sendOtpCtrl, verifyOtpCtrl };