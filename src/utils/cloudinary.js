const cloudinary = require('../config/cloudinary');

const getPublicId = (url) => {
  if (!url) return null;
  const parts = url.split('/upload/');
  if (parts.length < 2) return null;
  const path = parts[1].split('/');
  return path.slice(0, -1).join('/');
};

/**
 * Delete image from Cloudinary
 */
const deleteFromCloudinary = async (url) => {
  const publicId = getPublicId(url);
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error('Cloudinary delete failed:', err);
  }
};

module.exports = { deleteFromCloudinary };