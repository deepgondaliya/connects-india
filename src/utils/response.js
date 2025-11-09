const success = (res, data = null, message = 'Success') => {
  res.status(200).json({ success: true, data, message });
};

const error = (res, status = 500, message = 'Server Error') => {
  res.status(status).json({ success: false, message });
};

module.exports = { success, error };